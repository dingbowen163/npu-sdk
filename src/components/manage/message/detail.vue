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
