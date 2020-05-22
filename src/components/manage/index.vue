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
@import "../../assets/styles/index.scss";
</style>
