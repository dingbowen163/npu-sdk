<template>
  <section class="content-left">
    <img class="logo-icon logo-icon-1" src="@/assets/img/matrix-top.svg" />
    <img class="logo-icon logo-icon-2" src="@/assets/img/matrix-bottom.svg" />
    <div class="bottom">
      <img src="@/assets/img/ball.png" alt class="ball" />
      <p class="title">欢迎使用</p>
      <p class="title">瑞芯微NPU人脸识别技术支撑网站</p>
    </div>
    <div class="connect">
      <img class="code" src="@/assets/img/WX.png" />
      <div class="info">
        <p>请扫描左侧微信二维码</p>
        <p>商务联系：肖经理（18610212102）</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "left"
};
</script>

<style lang="scss" scoped>
.content-left {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 520px;
  background-image: linear-gradient(180deg, #373c5e, #2d314e);
  .logo-icon {
    position: absolute;
  }
  .logo-icon-1 {
    width: 60px;
    height: 60px;
    top: 8px;
    left: 10px;
  }
  .logo-icon-2 {
    width: 78px;
    height: 42px;
    bottom: 6px;
    left: 472px;
  }
  .bottom {
    position: absolute;
    bottom: 155px;
    left: 60px;
    color: #fff;
    .ball {
      width: 96px;
    }
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 28px;

      letter-spacing: 0;
      line-height: 34px;
      text-shadow: 0 10px 20px rgba(0, 55, 113, 0.1);
    }
  }
  .connect {
    position: absolute;
    bottom: 45px;
    left: 60px;
    overflow: hidden;
    color: #fff;
    .code {
      width: 80px;
      float: left;
    }
    .info {
      padding-top: 15px;
      margin-left: 10px;
      float: left;
      font-size: 12px;
      line-height: 24px;
    }
  }
}
</style>
