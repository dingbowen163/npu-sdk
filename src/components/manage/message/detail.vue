<template>
  <div class="content-view message-detail">
    <header>
      <h2 class="bread-nav">
        <i class="go-back el-icon-back" @click="$router.push('/messageList')"></i>
        <span class="info">
          留言板 /
          <span class="current">详情</span>
        </span>
      </h2>
    </header>
    <div class="card">
      <div class="message-item">
        <div class="question">
          <div class="left-img">
            <i class="el-icon-chat-dot-round"></i>
          </div>
          <div class="fr right-con">
            <div class="message-title">
              <div class="fl username">
                用户1
                <span class="text">发表提问：</span>
              </div>
              <div class="fr">
                <span class="publish-date">2020-5-10 23:34:21</span>
              </div>
            </div>
            <div class="question-content">记得放个假哦而无需 v 分？</div>
            <el-button
              class="reply-btn hang-btn"
              type="text"
              icon="el-icon-arrow-down"
              @click="hideReplyInp"
              v-if="showReply"
            >收起</el-button>
            <el-button class="reply-btn" type="text" icon="el-icon-edit" @click="openReplyInp">回复(1)</el-button>
          </div>
        </div>
        <div class="reply-box">
          <el-collapse-transition>
            <el-input
              v-if="showReply"
              class="reply-textarea"
              type="textarea"
              placeholder="请输入回复内容"
              v-model="replyContent"
              maxlength="30"
              show-word-limit
            ></el-input>
          </el-collapse-transition>
          <ul class="reply-list">
            <li class="reply-con">
              <div class="message-title">
                <div class="fl username">
                  客服1
                  <span class="text">回复：</span>
                </div>
                <div class="fr">
                  <span class="publish-date repay-date">2020-5-10 23:34:21</span>
                </div>
              </div>
              <div class="question-content">记得放个假哦而无需 v 分？</div>
            </li>
            <li class="reply-con">
              <div class="message-title">
                <div class="fl username">
                  客服1
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
.bread-nav {
  .go-back {
    display: block;
    float: left;
    width: 28px;
    height: 28px;
    font-size: 16px;
    line-height: 28px;
    background: #edeef5;
    border-radius: 14px;
    color: #9da2b3;
    text-align: center;
    cursor: pointer;
    &:hover {
      background: #e6e7ee;
    }
  }
  .info {
    display: block;
    line-height: 24px;
    color: #939ab8;
    font-size: 16px;
    font-weight: 700;
    padding-left: 36px;
    padding-top: 2px;
  }
  .current {
    color: #525975;
  }
}
</style>
