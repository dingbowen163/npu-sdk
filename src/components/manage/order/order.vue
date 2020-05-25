<template>
  <div class="view order">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-order"></i>
        <span>订单管理</span>
      </h2>
    </header>
    <div class="card">
      <table-com :metas="tableMetas" @settingsClick="handleSetting" v-if="roleId === 'user'"></table-com>
      <table-com :metas="csTableMetas" @settingsClick="handleSetting" v-if="roleId === 'cs'"></table-com>
    </div>
  </div>
</template>

<script>
import tableCom from "../../../common/table";
export default {
  data() {
    return {
      roleId: 'cs',
      filterInfo: {
        pageInfo: {
          pageNum: 1
        }
      },
      tableMetas: {
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
            label: "授权文件",
            value: "docs",
            type: "raw_html"
          },
          {
            label: "原过期时间",
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
            type: "el_tag"
          }
        ],
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: '<a href="">下载</a>',
            statusStr: "过期",
            tagType: "danger",
            operate: "延期",
            visible: false
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
            statusStr: "申请",
            tagType: "warning"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: "正常",
            tagType: "success",
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
            type: "el_tag"
          }
        ],
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: '<a href="">下载</a>',
            statusStr: "过期",
            tagType: "danger",
            operate: "延期",
            visible: false
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
            statusStr: "申请",
            tagType: "warning"
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: "正常",
            tagType: "success",
            operate: "延期",
            visible: false
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
    }
  },
  components: {
    tableCom
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
