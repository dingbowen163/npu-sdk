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
        <table-com
          :metas="csTableMetas"
          @settingsClick="handleSetting"
          @currentChange="handlePageChange"
          v-if="role === 1"
        ></table-com>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, setUserExpired, getCSList } from "@/service/order";
import tableCom from "@/common/table";
import { mapState } from "vuex";
export default {
  data() {
    return {
      filterInfo: {
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
            value: "xpired_date_req",
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
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status2"></i><span>过期</span>`,
            newDate: "2016-08-02",
            menu: [
              {
                type: "changeDate",
                command: "updateDate",
                title: "修改",
                visible: false
              },
              {
                command: "approve",
                title: "通过",
                buttonType: "success"
              },
              {
                command: "reject",
                title: "拒绝",
                buttonType: "danger"
              }
            ]
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status1"></i><span>申请</span>`,
            menu: [
              {
                type: "changeDate",
                command: "updateDate",
                title: "修改",
                visible: false
              }
            ]
          }
        ],
        pageInfo: {
          total: 20,
          pageindex: 1,
          pagesize: 10
        }
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
    handleSetting(data) {
      let { command, row, date, btn } = data;
      console.log(command);
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
      }
    },
    async updateStatus(data) {
      let result = await setUserExpired({ data });
      this.$message.success("订单操作成功");
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
      this.$message.success("过期时间已延期");
      btn.visible = false;
    },
    handlePageChange(page) {
      this.filterInfo.pageindex = page;
    },

    getList() {
      let params = {
        userid: this.user_id,
        pageIndex: this.filterInfo.pageindex
      };
      this.loading = true;
      this.role === 0 ? this.getUserList(params) : this.getCSList(params);
    },

    async getUserList(params) {
      let result = await getUserList({ params });
      let { pageindex, pagesize, total, list } = result;
      this.tableMetas.pageInfo = { total, pageindex, pagesize };

      list.forEach(item => {
        let { dev_used, dev_total, state, url_keydat } = item; // state:订单状态，0:正常，1:申请中 2-过期
        item.percent = `${dev_used} / ${dev_total}`;
        item.docs = `<a href="${url_keydat}">下载</a>`;
        item.statusStr = `<i class="statusDot status${state}"></i><span>${this.stateArr[state]}</span>`;
        item.menu = [];
        if (state !== 1) {
          item.menu = [
            {
              type: "changeDate",
              command: "delayDate",
              title: "延期",
              visible: false
            }
          ];
        }
        this.tableMetas.tableData = list;
        this.loading = false;
      });
    },
    async getCSList(params) {
      let result = await getCSList({ params });
      let { pageindex, pagesize, total, list } = result;
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
        item.statusStr = `<i class="statusDot status${state}"></i><span>${this.stateArr[state]}</span>`;
        item.menu = [
          {
            type: "changeDate",
            command: "delayDate",
            title: "延期",
            visible: false
          }
        ];
        if (state !== 0) {
          item.menu.push(approveItem, rejectItem);
        }
        this.csTableMetas.tableData = list;
        this.loading = false;
      });
    }
  },
  components: {
    tableCom
  },
  mounted() {
    // this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>
