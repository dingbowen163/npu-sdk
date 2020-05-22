<template>
  <div class="view index-view">
    <el-menu :default-active="activeIndex" class="left-menu" @select="handleSelectMenu">
      <el-menu-item index="/order">
        <i class="el-icon-s-order"></i>
        <span slot="title">订单管理</span>
      </el-menu-item>
      <el-menu-item index="/messages">
        <i class="el-icon-s-comment"></i>
        <span slot="title">留言板</span>
      </el-menu-item>
      <el-menu-item index="/persionalInfo">
        <i class="el-icon-s-tools"></i>
        <span slot="title">个人资料</span>
      </el-menu-item>
      <el-menu-item index="/updatePwd">
        <i class="el-icon-lock"></i>
        <span slot="title">修改密码</span>
      </el-menu-item>
    </el-menu>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  watch: {
    $route: {
      handler: function(val, oldVal) {
        this.activeIndex = val.path;
      },
      deep: true
    }
  },
  methods: {
    handleSelectMenu(key, keyPath) {
      // console.log(key, keyPath);
      this.$router.push(key);
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.index-view {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.left-menu {
  width: 200px;
  height: 100%;
  float: left;
}
.container {
  margin-left: 200px;
  position: relative;
  padding: 20px;
  .view {
    width: 100%;
    /deep/ .card {
      background: #fff;
      box-shadow: 0 10px 23px -3px rgba(0, 0, 0, 0.05);
      border-radius: 2px;
      padding: 20px;
    }
  }
}
</style>
