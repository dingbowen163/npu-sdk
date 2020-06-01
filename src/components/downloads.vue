<template>
  <div class="view downloads">
    <el-card class="box-card" v-for="item in 7" :key="item">
      <div slot="header" class="clearfix">
        <h3 class="header-title">通用人脸识别</h3>
        <ul class="header-info">
          <li class="info-item">版本号：v1.0.0</li>
          <li class="info-item">发布日期：2020.06.06</li>
        </ul>
      </div>
      <div class="info-body">
        <p class="describe">
          采用了商用版最新的推理引擎 TenniS ，ResNet50 的推理速度，从 SeetaFace2 在 I7 的 8FPS 提升到了
          20FPS 。同时人脸识别训练集也大幅度提高，SeetaFace6 人脸识别数据量增加到了上亿张图片
        </p>

        <ul class="info">
          <li class="info-item">
            <span class="title">网络结构</span>
            <span class="text">ResNet-50</span>
          </li>
          <li class="info-item">
            <span class="title">速度（17-6700）</span>
            <span class="text">
              57
              <i>ms</i>
            </span>
          </li>
          <li class="info-item">
            <span class="title">速度（RK3399）</span>
            <span class="text">
              300
              <i>ms</i>
            </span>
          </li>
          <li class="info-item">
            <span class="title">特征长度</span>
            <span class="text">1024</span>
          </li>
        </ul>
      </div>
      <div class="bottom clearfix">
        <el-button class="download-btn" type="primary" icon="el-icon-download">下 载</el-button>
      </div>
    </el-card>
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
.downloads {
  font-family: PingFangSC-Regular;
  padding: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
}
.clearfix {
  overflow: hidden;
}
/deep/ .el-card__header {
  padding: 22px 20px;
}
.download-btn {
  float: right;
}
.header-title {
  float: left;
  color: #525975;
  font-size: 16px;
  font-weight: bold;
}
.header-info {
  float: right;
  li {
    display: inline;
    font-size: 14px;
    color: #939ab8;
    margin-right: 5px;
  }
}
/deep/ .el-card__body{
  padding: 0;
}
.info-body{
  padding: 20px;
  background-image: url('../assets/img/downloadBg.png');
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: 171px 180px;
}
.describe {
  font-size: 14px;
  color: #525975;
  line-height: 20px;
  margin-bottom: 15px;
}
.info {
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-column-gap: 5px;
  .info-item {
    span {
      display: block;
    }
    .title {
      font-size: 14px;
      color: #939ab8;
      text-align: left;
      line-height: 20px;
    }
    .text {
      font-family: DINAlternate-Bold;
      font-size: 18px;
      color: #525975;
      text-align: left;
      line-height: 32px;
      margin-top: 5px;
      i {
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
.bottom{
  padding: 5px 20px;
  border-top: 1px solid #EBEEF5;
}
</style>
