<template>
  <div class="home">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <img src="../assets/logo.png" alt class="logo" />
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
      activeIndex: "/login"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
      this.$router.push(key)
    }
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.home{
  height: 100%;
}
.el-menu--horizontal {
  padding: 0 20px;
}
.logo {
  width: 150px;
  height: 60px;
}
.fr {
  float: right;
}
.fl {
  float: left;
}
.main-view{
  min-height: calc(100% - 61px);
  position: relative;
}
</style>
