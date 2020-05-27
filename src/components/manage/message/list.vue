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
        @settingsClick="handleSetting"
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
            type: "link"
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
          }
        ],
        tableData: [
          {
            date: "2016-05-01",
            name: "王小",
            docs: "主题内容摘要",
            id: 1
          },
          {
            date: "2016-05-02",
            name: "王",
            docs: "123",
            id: 2
          },
          {
            date: "2016-05-03",
            name: "王小虎",
            docs: "3231",
            id: 3
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
      let { command, row } = data;
      if (command === "gotoLink") {
        this.$router.push(`/messageDetail/${row.id}`)
      }
    },
    handlePageChange(page) {
      this.filterInfo.pageNum = page;
    }
  },
  components: { tableCom },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
