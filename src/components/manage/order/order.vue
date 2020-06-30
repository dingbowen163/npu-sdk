<template>
  <div class="content-view order">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-order"></i>
        <span>订单管理</span>
      </h2>
    </header>
    <div class="card" v-loading="loading">
      <div v-if="!loading">
        <table-com
          :metas="tableMetas"
          @settingsClick="handleSetting"
          @currentChange="handlePageChange"
          v-if="role === 0"
        ></table-com>
        <div v-if="role === 1">
          <section class="head-con">
            <el-input
              class="search-inp"
              maxlength="40"
              size="small"
              placeholder="请输入姓名"
              v-model="filterInfo.name"
              @clear="searchList"
              clearable
            >
              <el-button slot="append" @click="searchList">
                <i class="el-icon-search"></i>搜索
              </el-button>
            </el-input>
            <el-button
              class="add-btn"
              type="primary"
              size="small"
              icon="el-icon-plus"
              @click="addOrder"
            >新增订单</el-button>
          </section>
          <table-com
            :metas="csTableMetas"
            @settingsClick="handleSetting"
            @currentChange="handlePageChange"
            v-if="role === 1"
          ></table-com>
        </div>
      </div>
    </div>

    <el-dialog
      title="用户资料"
      :visible.sync="userDialogVisible"
      @close="userDialogVisible = false"
      width="600px"
    >
      <ul class="userInfo">
        <li>
          <span class="label">登录名：</span>
          {{ userInfo.user_id }}
        </li>
        <li>
          <span class="label">姓名：</span>
          {{ userInfo.name }}
        </li>
        <li>
          <span class="label">手机号：</span>
          {{ userInfo.mobile }}
        </li>
        <li>
          <span class="label">公司：</span>
          {{ userInfo.company }}
        </li>
        <li>
          <span class="label">职位：</span>
          {{ userInfo.position }}
        </li>
        <li>
          <span class="label">电子邮箱：</span>
          {{ userInfo.email }}
        </li>
      </ul>
    </el-dialog>

    <el-dialog title="新增订单" :visible.sync="addDialogVisible" @close="closeAddDialog" width="500px">
      <el-form
        ref="form"
        class="form"
        label-width="100px"
        :model="form"
        :rules="formRules"
        size="small"
      >
        <el-form-item label="用户姓名">
          <span>{{addFormName}}</span>
        </el-form-item>
        <el-form-item label="用户登录名" prop="user_id" required>
          <el-input style="width:220px" v-model="form.user_id" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="订购数量" prop="orders_num" required>
          <el-input style="width:220px" v-model="form.orders_num" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="到期时间" prop="expired_date" required>
          <el-date-picker
            v-model="form.expired_date"
            placeholder="请选择到期时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeAddDialog">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserList,
  setUserExpired,
  getCSList,
  adminGetUserInfo,
  addOrder
} from "@/service/order";
import { getSelfInfo } from "@/service/home";
import tableCom from "@/common/table";
import { mapState } from "vuex";
export default {
  data() {
    const validId = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写用户登录名"));
      } else {
        let params = { adminuserid: this.user_id, userid: value };
        let result = await adminGetUserInfo({ params });
        this.addFormName = result.name;
        return callback();
      }
    };
    return {
      filterInfo: {
        name: "",
        pageindex: 1
      },
      stateArr: ["正常", "申请中", "过期"],
      loading: true,
      tableMetas: {
        headerData: [
          {
            label: "订单号",
            value: "order_id",
            type: "TEXT"
          },
          {
            label: "订单日期",
            value: "order_date",
            type: "TEXT"
          },
          {
            label: "授权码",
            value: "key_code",
            type: "TEXT"
          },
          {
            label: "使用 / 总数",
            value: "percent",
            type: "TEXT"
          },
          {
            label: "授权文件",
            value: "docs",
            type: "raw_html"
          },
          {
            label: "状态",
            value: "statusStr",
            type: "raw_html"
          },
          {
            label: "过期时间",
            value: "expired_date",
            type: "TEXT"
          },
          {
            label: "操作",
            value: "menu",
            type: "menu",
            fixed: "right"
          }
        ],
        tableData: [],
        pageInfo: {}
      },
      csTableMetas: {
        headerData: [
          {
            label: "订单号",
            value: "order_id",
            type: "TEXT"
          },
          {
            label: "登录名",
            value: "user_id",
            type: "clickable",
            command: "viewUserInfo"
          },
          {
            label: "姓名",
            value: "name",
            type: "TEXT"
          },
          {
            label: "订单日期",
            value: "order_date",
            type: "TEXT"
          },
          {
            label: "授权码",
            value: "key_code",
            type: "TEXT"
          },
          {
            label: "使用 / 总数",
            value: "percent",
            type: "TEXT"
          },
          {
            label: "状态",
            value: "statusStr",
            type: "raw_html"
          },
          {
            label: "原过期时间",
            value: "expired_date",
            type: "TEXT"
          },
          {
            label: "新过期时间",
            value: "expired_date_req",
            type: "TEXT"
          },
          {
            label: "操作",
            value: "menu",
            type: "menu",
            fixed: "right",
            width: 130
          }
        ],
        tableData: [],
        pageInfo: {}
      },
      userDialogVisible: false,
      userInfo: {},
      addDialogVisible: false,
      addFormName: "",
      form: {
        user_id: "",
        orders_num: "",
        expired_date: ""
      },
      formRules: {
        user_id: [{ required: true, validator: validId, trigger: "blur" }],
        orders_num: [
          { required: true, message: "请填写订购数量", trigger: "blur" }
        ],
        expired_date: [
          { required: true, message: "请选择到期时间", trigger: "change" }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["user_id", "role"])
  },
  watch: {
    user_id: {
      handler: function(val) {
        if (val) {
          this.getList();
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    addOrder() {
      this.addDialogVisible = true;
      this.$nextTick(() => {
        this.addFormName = "";
        this.form = {
          user_id: "",
          orders_num: "",
          expired_date: ""
        };
        this.$refs.form.resetFields();
      });
    },
    confirmAdd() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const data = this._.cloneDeep(this.form);
          data.orders_num = Number(this.form.orders_num)
          data.expired_date = `${this.form.expired_date} 00:00:00`
          data.adminuserid = this.user_id;
          let result = await addOrder({ data });
          this.$message.success("订单新增成功");
          this.getList();
          this.closeAddDialog();
        }
      });
    },
    closeAddDialog() {
      this.addDialogVisible = false;
    },
    handleSetting(data) {
      let { command, row, date, btn } = data;
      if (command === "delayDate") {
        this.handleDelayDate({ row, date, btn });
      } else if (command === "approve") {
        this.$confirm("是否通过申请?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let { order_id, expired_date, expired_date_req } = row;
          let data = Object.assign(
            { order_id, expired_date, expired_date_req },
            { action: "approve" }
          );
          this.updateStatus(data);
        });
      } else if (command === "reject") {
        this.$confirm("是否拒绝申请?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          let { order_id, expired_date, expired_date_req } = row;
          let data = Object.assign(
            { order_id, expired_date, expired_date_req },
            { action: "reject" }
          );
          this.updateStatus(data);
        });
      } else if (command === "viewUserInfo") {
        this.openUserDialog(row);
      }
    },
    async updateStatus(data) {
      data.expired_date_req = `${data.expired_date_req} 00:00:00`;
      let result = await setUserExpired({ data });
      this.$message.success("订单操作成功");
      this.getList();
    },
    // 确定延期
    async handleDelayDate({ row, date, btn }) {
      let { order_id, expired_date } = row;
      if (!date) {
        this.$message.error("请选择日期");
        return;
      }
      let data = {
        order_id,
        expired_date,
        expired_date_req: `${date} 00:00:00`,
        action: "apply"
      };
      let result = await setUserExpired({ data });
      this.$message.success(`过期时间已${btn.title}`);
      this.getList();
    },
    async openUserDialog(row) {
      this.userInfo = {};
      this.userDialogVisible = true;
      let params = {
        adminuserid: this.user_id,
        userid: row.user_id
      };
      this.userInfo = await adminGetUserInfo({ params });
    },
    searchList() {
      this.filterInfo.pageindex = 1;
      this.getList();
    },
    handlePageChange(page) {
      this.filterInfo.pageindex = page;
      this.getList();
    },
    getList() {
      this.loading = true;
      this.role === 0 ? this.getUserList() : this.getCSList();
    },
    async getUserList() {
      let params = {
        userid: this.user_id,
        pageIndex: this.filterInfo.pageindex
      };
      this.tableMetas.tableData = [];
      let result = await getUserList({ params });
      let { pageindex, pagesize, total, list } = result;
      this.loading = false;
      this.tableMetas.pageInfo = { total, pageindex, pagesize };

      list.forEach(item => {
        let { dev_used, dev_total, state, url_keydat } = item; // state:订单状态，0:正常，1:申请中 2-过期
        item.percent = `${dev_used} / ${dev_total}`;
        item.docs = `<a href="${url_keydat}">下载</a>`;
        item.statusStr = `<span class="statusTag status${state}">${this.stateArr[state]}</span>`;
        item.menu = [];
        if (state !== 1) {
          item.menu = [
            {
              type: "changeDate",
              command: "delayDate",
              title: "延期",
              btnTitle: "延期过期时间",
              placeholder: "请选择过期时间"
            }
          ];
        }
        this.tableMetas.tableData = list;
      });
    },
    async getCSList() {
      let params = {
        adminuserid: this.user_id,
        pageIndex: this.filterInfo.pageindex,
        name: this.filterInfo.name
      };
      this.csTableMetas.tableData = [];
      let result = await getCSList({ params });
      let { pageindex, pagesize, total, list } = result;
      this.loading = false;
      this.csTableMetas.pageInfo = { total, pageindex, pagesize };

      const approveItem = {
          command: "approve",
          title: "通过",
          buttonType: "success"
        },
        rejectItem = {
          command: "reject",
          title: "拒绝",
          buttonType: "danger"
        };
      list.forEach(item => {
        let { dev_used, dev_total, state, url_keydat } = item; // state:订单状态，0:正常，1:申请中 2-过期
        item.percent = `${dev_used} / ${dev_total}`;
        item.docs = `<a href="${url_keydat}">下载</a>`;
        item.statusStr = `<span class="statusTag status${state}">${this.stateArr[state]}</span>`;
        item.menu = [
          {
            type: "changeDate",
            command: "delayDate",
            title: "修改",
            btnTitle: "修改新过期时间",
            placeholder: "请选择新过期时间"
          }
        ];
        if (state === 1) {
          item.menu.push(approveItem, rejectItem);
        }
        this.csTableMetas.tableData = list;
      });
    }
  },
  components: {
    tableCom
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
.userInfo {
  li {
    line-height: 30px;
    color: #666;
  }
  .label {
    width: 100px;
    text-align: right;
    display: inline-block;
    margin-right: 8px;
    color: #333;
  }
}
.head-con {
  margin-bottom: 10px;
  overflow: hidden;
  .search-inp {
    width: 250px;
    float: left;
    .el-icon-search {
      margin-right: 5px;
    }
  }
  .add-btn {
    float: right;
  }
}
</style>
