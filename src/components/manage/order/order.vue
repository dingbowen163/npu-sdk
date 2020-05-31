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
        @settingsClick="handleSetting"
        @currentChange="handlePageChange"
        v-if="roleId === 'user'"
      ></table-com>
      <table-com
        :metas="csTableMetas"
        @settingsClick="handleSetting"
        @currentChange="handlePageChange"
        v-if="roleId === 'cs'"
      ></table-com>
    </div>
  </div>
</template>

<script>
import { getUserList } from "@/service/order";
import tableCom from "@/common/table";
import { mapState } from "vuex";
export default {
  data() {
    return {
      roleId: "user",
      filterInfo: {
        pageNum: 1
      },
      tableMetas: {
        headerData: [
          {
            label: "订单号",
            value: "name",
            type: "TEXT"
          },
          {
            label: "订单日期",
            value: "date",
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
            label: "授权文件",
            value: "docs",
            type: "raw_html"
          },
          {
            label: "过期时间",
            value: "date",
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
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status1"></i><span>过期</span>`,
            operate: "延期",
            visible: false
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status2"></i><span>申请</span>`
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status3"></i><span>正常</span>`,
            operate: "延期",
            visible: false
          }
        ],
        pageInfo: {
          total: 20,
          pageNum: 1,
          pageSize: 10
        }
      },
      csTableMetas: {
        headerData: [
          {
            label: "订单号",
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
            statusStr: `<i class="statusDot status1"></i><span>过期</span>`,
            newDate: "2016-08-02",
            showBtns: true
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status2"></i><span>申请</span>`
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: `<i class="statusDot status3"></i><span>正常</span>`,
            newDate: "2020-08-02",
            showBtns: true
          }
        ],
        pageInfo: {
          total: 20,
          pageNum: 1,
          pageSize: 10
        }
      }
    };
  },
  computed: {
    ...mapState("user", ["user_id", "role"])
  },
  methods: {
    handleSetting(data) {
      let { command, row, date } = data;
      if (command === "delayDate") {
        this.handleDelayDate({ row, date });
      }
    },
    // 确定延期
    handleDelayDate({ row, date }) {
      if (!date) {
        this.$message.error("请选择日期");
        return;
      }
      this.$message.success("过期时间已延期");
      row.visible = false;
    },
    handlePageChange(page) {
      this.filterInfo.pageNum = page;
    },
    async getList() {
      let data = {
        userid: this.user_id,
        pageIndex: this.filterInfo.pageNum
      };
      let result = await getUserList({ data });
    }
  },
  components: {
    tableCom
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
</style>
