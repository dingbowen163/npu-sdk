<template>
  <section class="content-left">
    <img class="logo-icon logo-icon-1" src="@/assets/img/matrix-top.svg" />
    <img class="logo-icon logo-icon-2" src="@/assets/img/matrix-bottom.svg" />
    <div class="bottom">
      <img src="@/assets/img/ball.png" alt class="ball" />
      <p class="title">欢迎使用</p>
      <p class="title">瑞芯微NPU人脸识别技术支撑网站</p>
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
    top: 70px;
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
    bottom: 120px;
    left: 60px;
    .ball {
      width: 96px;
    }
    .title {
      font-family: PingFangSC-Semibold;
      font-size: 28px;
      color: #fff;
      letter-spacing: 0;
      line-height: 34px;
      text-shadow: 0 10px 20px rgba(0, 55, 113, 0.1);
    }
  }
}
</style>
