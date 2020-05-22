<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item>
        <!-- <img src="../assets/img/logo.png" alt class="logo" /> -->
      </el-menu-item>
      <el-menu-item index="2">文档</el-menu-item>
      <el-menu-item index="3">下载</el-menu-item>
      <el-menu-item index="/register" class="fr">注册</el-menu-item>
      <el-menu-item index="/login" class="fr">登录</el-menu-item>
    </el-menu>
    <div class="main-view">
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
        // console.log(val);
        this.activeIndex = val.path;
      },
      deep: true
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
      this.$router.push(key);
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}
.el-menu--horizontal {
  padding: 0 20px;
}
.logo {
  width: 132px;
  height: 30px;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.main-view {
  min-height: calc(100% - 61px);
  position: relative;
}
</style>
