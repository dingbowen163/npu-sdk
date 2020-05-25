<template>
  <div class="view order">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-order"></i>
        <span>订单管理</span>
      </h2>
    </header>
    <div class="card">
      <table-com :metas="tableMetas" @settingsClick="handleSetting"></table-com>
    </div>
  </div>
</template>

<script>
import tableCom from "../../common/table";
export default {
  data() {
    return {
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
            date: "2016-05-02",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: "过期",
            tagType: "danger",
            operate: "延期"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: "申请",
            tagType: "warning"
          },
          {
            date: "2016-05-02",
            name: "王小虎",
            docs: '<a href="">下载</a>',
            statusStr: "正常",
            tagType: "success",
            operate: "延期"
          }
        ]
      }
    };
  },
  methods: {
    handleSetting({command, row}){
      // console.log({command, row})
      if(command === 'delayDate'){
        
      }
    },
  },
  components: {
    tableCom
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
