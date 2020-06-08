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
      <div class="main-box">
        <div class="message-item">
          <div class="question">
            <div class="left-img">
              <i class="el-icon-chat-dot-round"></i>
            </div>
            <div class="fr right-con">
              <div class="message-title">
                <div class="fl username">
                  {{user_name}}
                  <span class="text">发表提问：</span>
                </div>
                <div class="fr">
                  <span class="publish-date">{{inquiry_date}}</span>
                </div>
              </div>
              <pre class="question-content">{{content}}</pre>

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
              >回复{{detailList.length ? `(${detailList.length})` : ''}}</el-link>
            </div>
          </div>
          <div class="reply-box" v-if="detailList.length || showReply">
            <el-collapse-transition>
              <div class="reply-inp-box" v-if="showReply">
                <el-input
                  class="reply-textarea"
                  type="textarea"
                  placeholder="请输入回复内容"
                  v-model="replyContent"
                  maxlength="500"
                  show-word-limit
                ></el-input>
                <el-link
                  type="primary"
                  class="submit-btn"
                  icon="el-icon-s-promotion"
                  :underline="false"
                  @click="commitReply"
                >提交</el-link>
              </div>
            </el-collapse-transition>
            <ul class="reply-list">
              <li class="reply-con" v-for="(item,index) in detailList" :key="index">
                <div class="message-title">
                  <div class="fl username">
                    {{item.user_name}}
                    <span class="text">回复：</span>
                  </div>
                  <div class="fr">
                    <span class="publish-date repay-date">{{item.inquiry_resp_date}}</span>
                  </div>
                </div>
                <pre class="question-content">{{item.content}}</pre>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageDetail, addReply } from "@/service/messages";
import { mapState } from "vuex";
export default {
  data() {
    return {
      replyContent: "",
      showReply: false,
      inquiry_id: this.$route.params.inquiry_id,
      content: decodeURIComponent(this.$route.params.content),
      inquiry_date: this.$route.params.inquiry_date,
      user_name: this.$route.params.user_name,
      detailList: []
    };
  },
  computed: {
    ...mapState("user", ["user_id", "name"])
  },
  methods: {
    openReplyInp() {
      this.showReply = true;
    },
    hideReplyInp() {
      this.showReply = false;
    },
    async commitReply() {
      let data = {
        inquiry_id: Number(this.inquiry_id),
        user_id: this.user_id,
        user_name: this.name,
        content: this.replyContent
      };
      let result = await addReply({ data });
      this.$message.success('评论提交成功');
      this.replyContent = '';
      this.getDetail();
    },
    async getDetail() {
      let params = {
        inquiry_id: this.inquiry_id
      };
      let result = await getMessageDetail({ params });
      this.detailList = result;
    }
  },
  components: {},
  mounted() {
    this.getDetail();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/message.scss";
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
