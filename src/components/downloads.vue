<template>
  <div class="view downloads">
    <el-card class="box-card" v-for="(item,index) in list" :key="index">
      <div slot="header" class="clearfix">
        <h3 class="header-title">{{item.name}}</h3>
        <ul class="header-info">
          <li class="info-item">版本号：v{{item.ver}}</li>
          <li class="info-item">发布日期：{{item.release_date}}</li>
        </ul>
      </div>
      <div class="info-body">
        <div class="describe" v-html="item.Description"></div>

        <!-- <ul class="info">
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
        </ul>-->
      </div>
      <div class="bottom clearfix">
        <el-button
          class="download-btn"
          type="primary"
          icon="el-icon-download"
          @click="download(item.url_download)"
        >下 载</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getList } from "@/service/download";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      list: []
    };
  },
  computed: {
    ...mapState("user", ["user_id"])
  },
  methods: {
    download(url) {
      window.open(url, "_blank");
    },
    async getList() {
      let params = {
        userid: localStorage.getItem("user_id")
      };
      let result = await getList({ params });
      this.list = result;
    }
  },
  components: {},
  mounted() {
    this.getList();
  }
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
  /deep/ & > i {
    font-weight: 700;
  }
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
/deep/ .el-card__body {
  padding: 0;
}
.info-body {
  padding: 20px;
  background-image: url("../assets/img/downloadBg.png");
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
    min-width: 120px;
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
.bottom {
  padding: 5px 20px;
  border-top: 1px solid #ebeef5;
}
</style>
