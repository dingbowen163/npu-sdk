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
            value: "user_id",
            type: "TEXT"
          },
          {
            label: "主题内容摘要",
            value: "content",
            type: "link"
          },
          {
            label: "回复人",
            value: "reply_name",
            type: "TEXT"
          },
          {
            label: "最后回复时间",
            value: "reply_date",
            type: "TEXT"
          }
        ],
        tableData: [],
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
        this.$router.push(`/messageDetail/${row.inquiry_id}`);
      }
    },
    handlePageChange(page) {
      this.filterInfo.pageIndex = page;
      this.getList();
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
      list.forEach(item => {
        let replyList = item.list;
        let replyCon = replyList[replyList.length - 1];
        item.reply_name = replyCon ? replyCon.user_name : null;
        item.reply_date = replyCon ? replyCon.inquiry_resp_date : null;
      })

      this.loading = false;
    }
  },
  components: { tableCom },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>
