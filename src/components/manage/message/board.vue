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
          <el-link type="info" class="submit-btn" :underline="false">取消</el-link>
        </div>
        <div class="message-item" v-for="item in 4" :key="item">
          <div class="question">
            <div class="left-img">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="fr right-con">
              <div class="message-title">
                <div class="fl username">
                  用户{{item}}
                  <span class="text">发表提问：</span>
                </div>
                <div class="fr">
                  <span class="publish-date">2020-5-10 23:34:21</span>
                </div>
              </div>
              <div class="question-content">记得放个假哦而无需 v 分？</div>

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
export default {
  data() {
    return {
      replyContent: "",
      showReply: false
    };
  },
  methods: {
    openReplyInp() {
      this.showReply = true;
    },
    hideReplyInp() {
      this.showReply = false;
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../assets/styles/message.scss";
</style>