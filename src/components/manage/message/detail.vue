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
        <div></div>
        <div>
          <div class="message-title">
            <span class="username">用户名</span>
            <el-button class="reply-btn" type="primary" icon="el-icon-edit">回复</el-button>
          </div>
          <div class="question-content">记得放个假哦而无需 v 分？</div>
        </div>
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="replyContent"
          maxlength="30"
          show-word-limit
        ></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
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
