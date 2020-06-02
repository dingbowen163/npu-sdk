<template>
  <div class="content-view meaasge-list">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-comment"></i>
        <span>留言板</span>
      </h2>
    </header>
    <div class="card" v-loading="loading">
      <table-com
        v-if="!loading"
        :metas="tableMetas"
        @settingsClick="handleSetting"
        @currentChange="handlePageChange"
      ></table-com>
    </div>
  </div>
</template>

<script>
import { getList } from "@/service/messages";
import tableCom from "@/common/table";
import { mapState } from "vuex";
export default {
  data() {
    return {
      loading: false,
      filterInfo: {
        pageIndex: 1
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
        pageInfo: {}
      }
    };
  },
  computed: {
    ...mapState("user", ["user_id"])
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
      let { command, row } = data;
      if (command === "gotoLink") {
        this.$router.push(`/messageDetail/${row.id}`);
      }
    },
    handlePageChange(page) {
      this.filterInfo.pageNum = page;
    },
    async getList() {
      let params = {
        userid: this.user_id,
        pageIndex: this.filterInfo.pageIndex
      };
      this.loading = true;
      let result = await getList({ params });
      let { pageindex, pagesize, total, list } = result;
      this.tableMetas.pageInfo = { total, pageindex, pagesize };
      this.tableMetas.tableData = list;
      this.loading = false;
    }
  },
  components: { tableCom },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
