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
                  用户{{item.user_name}}
                  <span class="text">发表提问：</span>
                </div>
                <div class="fr">
                  <span class="publish-date">{{item.inquiry_date}}</span>
                </div>
              </div>
              <div class="question-content">{{item.content}}</div>

              <el-link
                class="reply-btn hang-btn"
                :underline="false"
                @click="hideReplyInp"
                v-if="showReply"
              >
                收起
                <i class="el-icon-arrow-down el-icon--right"></i>
              </el-link>
              <el-link
                type="primary"
                class="reply-btn"
                icon="el-icon-edit"
                :underline="false"
                @click="openReplyInp"
              >回复(2)</el-link>
            </div>
          </div>
          <div class="reply-box">
            <el-collapse-transition>
              <div class="reply-inp-box" v-if="showReply">
                <el-input
                  class="reply-textarea"
                  type="textarea"
                  placeholder="请输入回复内容"
                  v-model="replyContent"
                  maxlength="30"
                  show-word-limit
                ></el-input>
                <el-link
                  type="primary"
                  class="submit-btn"
                  icon="el-icon-s-promotion"
                  :underline="false"
                >提交</el-link>
              </div>
            </el-collapse-transition>
            <ul class="reply-list">
              <li class="reply-con" v-for="item in 2" :key="item">
                <div class="message-title">
                  <div class="fl username">
                    客服{{item}}
                    <span class="text">回复：</span>
                  </div>
                  <div class="fr">
                    <span class="publish-date repay-date">2020-5-10 23:34:21</span>
                  </div>
                </div>
                <div class="question-content">记得放个假哦而无需 v 分？</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, addQuestion } from "@/service/messages";
import { mapState } from "vuex";
export default {
  data() {
    return {
      questionContent: "",
      loading: false,
      list: [],
      replyContent: "",
      showReply: false
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
    },
    clearContent() {
      this.questionContent = "";
    },
    openReplyInp() {
      this.showReply = true;
    },
    hideReplyInp() {
      this.showReply = false;
    },
    async getList() {
      let params = {
        userid: this.user_id,
        pageIndex: 1
      };
      this.loading = true;
      let result = await getList({ params });
      this.loading = false;
      this.list = result.list;
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/message.scss";
</style>