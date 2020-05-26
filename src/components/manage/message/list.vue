<template>
  <div class="content-view meaasge-list">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-comment"></i>
        <span>留言板</span>
      </h2>
    </header>
    <div class="card">
       <table-com
        :metas="tableMetas"
        @currentChange="handlePageChange"
      ></table-com>
    </div>
  </div>
</template>

<script>
import tableCom from "../../../common/table";
export default {
  data() {
    return {
        filterInfo: {
        pageNum: 1
      },
      tableMetas: {
        headerData: [
          {
            label: "用户登录名",
            value: "name",
            type: "TEXT"
          },
          {
            label: "主题内容摘要",
            value: "docs",
            type: "raw_html"
          },
          {
            label: "回复人",
            value: "date",
            type: "TEXT"
          },
          {
            label: "最后回复时间",
            value: "date",
            type: "TEXT"
          },
        ],
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: '<a href="">下载</a>',
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: '<a href="">下载</a>',
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: '<a href="">下载</a>'
          }
        ],
        pageInfo: {
          total: 20,
          pageNum: 1,
          pageSize: 10
        }
      },
    };
  },
  methods: {
    handlePageChange(page) {
      this.filterInfo.pageNum = page;
    }
  },
  components: {tableCom},
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
