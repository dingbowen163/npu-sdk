<template>
  <section class="content-bottom">
    <p>
      <!-- 此位置用于备案号占位 -->
      例：©2020 Baidu (京)-经营性-2017-0020京公网安备11000002000001号京ICP证030173号
    </p>
  </section>
</template>

<script>
export default {
  name: "left"
};
</script>

<style lang="scss" scoped>
.content-bottom {
  width: calc(100% - 520px);
  position: absolute;
  bottom: 0;
  right: 0;
  text-align: center;
  p {
    color: #bbb;
    font-size: 12px;
    line-height: 24px;
  }
}
</style>
