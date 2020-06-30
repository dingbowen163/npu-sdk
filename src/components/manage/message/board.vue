<template>
  <div class="content-view message-board">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-comment"></i>
        <span>留言板</span>
      </h2>
    </header>
    <div class="card">
      <div class="main-box">
        <div class="reply-inp-box fast-question">
          <el-input
            class="reply-textarea fast-textarea"
            type="textarea"
            placeholder="快速提问..."
            v-model="questionContent"
            maxlength="500"
            show-word-limit
          ></el-input>

          <el-link
            type="primary"
            class="submit-btn"
            icon="el-icon-s-promotion"
            :underline="false"
            @click="addQuestion"
          >提交</el-link>
          <el-link type="info" class="submit-btn" :underline="false" @click="clearContent">取消</el-link>
        </div>
        <div class="message-item" v-for="(item,index) in list" :key="index">
          <div class="question">
            <div class="left-img">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="fr right-con">
              <div class="message-title">
                <div class="fl username">
                  {{item.user_name}}
                  <span class="text">发表提问：</span>
                </div>
                <div class="fr">
                  <span class="publish-date">{{item.inquiry_date}}</span>
                </div>
              </div>
              <pre class="question-content">{{item.content}}</pre>

              <el-link
                class="reply-btn hang-btn"
                :underline="false"
                @click="hideReplyInp(item, index)"
                v-if="item.showReply"
              >
                收起
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
              <el-link
                type="primary"
                class="reply-btn"
                icon="el-icon-edit"
                :underline="false"
                @click="openReplyInp(item,index)"
              >回复{{item.list.length ? `(${item.list.length})` : ''}}</el-link>
            </div>
          </div>
          <div class="reply-box" v-if="item.list.length || item.showReply">
            <el-collapse-transition>
              <div class="reply-inp-box" v-if="item.showReply">
                <el-input
                  class="reply-textarea"
                  type="textarea"
                  placeholder="请输入回复内容"
                  v-model="item.replyContent"
                  @input="changeReply($event)"
                  maxlength="500"
                  show-word-limit
                ></el-input>
                <el-link
                  type="primary"
                  class="submit-btn"
                  icon="el-icon-s-promotion"
                  :underline="false"
                  @click="confirmReply(item)"
                >提交</el-link>
              </div>
            </el-collapse-transition>
            <ul class="reply-list" v-if="item.list.length">
              <li class="reply-con" v-for="(reply, i) in item.list" :key="i">
                <div class="message-title">
                  <div class="fl username" :class="{'kefu': reply.user_role === 1}">
                    <span>{{reply.user_name}}</span>
                    <i class="el-icon-service" v-if="reply.user_role === 1"></i>
                    <span class="text">回复：</span>
                  </div>
                  <div class="fr">
                    <span class="publish-date repay-date">{{reply.inquiry_resp_date}}</span>
                  </div>
                </div>
                <pre class="question-content">{{reply.content}}</pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, addQuestion, addReply } from "@/service/messages";
import { mapState } from "vuex";
export default {
  data() {
    return {
      questionContent: "",
      list: []
    };
  },
  computed: {
    ...mapState("user", ["user_id", "name"])
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
    async addQuestion() {
      let data = {
        user_id: this.user_id,
        user_name: this.name,
        content: this.questionContent
      };
      let result = await addQuestion({ data });
      this.$message.success("提问发表成功！");
      this.clearContent();
      this.getList();
    },
    clearContent() {
      this.questionContent = "";
    },
    openReplyInp(item, index) {
      item.showReply = true;
      item.replyContent = "";
      this.$set(this.list, index, item);
    },
    hideReplyInp(item, index) {
      item.showReply = false;
      this.$set(this.list, index, item);
    },
    changeReply(e) {
      this.$forceUpdate();
    },
    async confirmReply(item) {
      let data = {
        inquiry_id: item.inquiry_id,
        user_id: this.user_id,
        user_name: this.name,
        content: item.replyContent
      };
      let result = await addReply({ data });
      this.$message.success("评论提交成功");
      this.getList();
    },
    async getList() {
      let params = {
        userid: this.user_id,
        pageIndex: 1
      };
      let result = await getList({ params });
      this.list = this._.cloneDeep(result.list);
      this.list.forEach(item => {
        item.replyContent = "";
        item.showReply = false;
      });
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/message.scss";
</style>