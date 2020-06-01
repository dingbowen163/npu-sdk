<template>
  <div class="content-view order">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-order"></i>
        <span>订单管理</span>
      </h2>
    </header>
    <div class="card">
      <table-com
        :metas="tableMetas"
        :loading="loading"
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
</template>

<script>
import { getUserList, setUserExpired } from "@/service/order";
import tableCom from "@/common/table";
import { mapState } from "vuex";
export default {
  data() {
    return {
      filterInfo: {
        pageindex: 1
      },
      stateArr: ["正常", "申请中", "过期"],
      loading: false,
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
            label: "使用/总数",
            value: "percent",
            type: "TEXT"
          },
          {
            label: "授权文件",
            value: "docs",
            type: "raw_html"
          },
          {
            label: "过期时间",
            value: "expired_date",
            type: "TEXT"
          },
          {
            label: "操作",
            value: "operate",
            type: "operate_btn"
          },
          {
            label: "状态",
            value: "statusStr",
            type: "raw_html"
          }
        ],
        tableData: [],
        pageInfo: {}
      },
      csTableMetas: {
        headerData: [
          {
            label: "订单号",
            value: "name",
            type: "TEXT"
          },
          {
            label: "姓名",
            value: "name",
            type: "TEXT"
          },
          {
            label: "订单日期",
            value: "name",
            type: "TEXT"
          },
          {
            label: "授权码",
            value: "name",
            type: "TEXT"
          },
          {
            label: "使用/总数",
            value: "name",
            type: "TEXT"
          },
          {
            label: "原过期时间",
            value: "date",
            type: "TEXT"
          },
          {
            label: "新过期时间",
            value: "newDate",
            type: "new_date",
            width: "185"
          },
          {
            label: "状态",
            value: "statusStr",
            type: "raw_html"
          },
          {
            label: "操作",
            value: "operate",
            type: "raw_html_operate"
          }
        ],
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status2"></i><span>过期</span>`,
            newDate: "2016-08-02",
            showBtns: true
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status1"></i><span>申请</span>`
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status0"></i><span>正常</span>`,
            newDate: "2020-08-02",
            showBtns: true
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
      let { command, row, date } = data;
      if (command === "delayDate") {
        this.handleDelayDate({ row, date });
      }
    },
    // 确定延期
    async handleDelayDate({ row, date }) {
      console.log(row, data);
      let { order_id, expired_date } = row;
      if (!date) {
        this.$message.error("请选择日期");
        return;
      }
      let data = {
        order_id,
        expired_date,
        expired_date_req: date,
        action: "apply"
      };
      let result = await setUserExpired({data});
      this.$message.success("过期时间已延期");
      row.visible = false;
    },
    handlePageChange(page) {
      this.filterInfo.pageindex = page;
    },
    async getList() {
      let params = {
        userid: this.user_id,
        pageIndex: this.filterInfo.pageindex
      };
      this.loading = true;
      let result = await getUserList({ params });
      this.loading = false;
      let { pageindex, pagesize, total, list } = result;
      this.tableMetas.pageInfo = { total, pageindex, pagesize };
      this.tableMetas.tableData = list;
      list.forEach(item => {
        let { dev_used, dev_total, state, url_keydat } = item; // state:订单状态，0:正常，1:申请中
        item.percent = `${dev_used} / ${dev_total}`;
        item.docs = `<a href="${url_keydat}">下载</a>`;
        item.statusStr = `<i class="statusDot status${state}"></i><span>${this.stateArr[state]}</span>`;
        if (state !== 1) {
          item.visible = false;
          item.operate = "延期";
        }
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
