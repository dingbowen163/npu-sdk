<template>
  <div class="home">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item class="logo-menu" index>
         <!-- <img src="@/assets/img/logo.png" alt class="logo" /> -->
      </el-menu-item>
      <el-menu-item index="/documents">文档</el-menu-item>
      <el-menu-item index="/downloads">下载</el-menu-item>
      <el-menu-item index="/register" class="fr" v-if="!name">注册</el-menu-item>
      <el-menu-item index="/login" class="fr" v-if="!name">登录</el-menu-item>
      <el-dropdown class="logout fr" trigger="click" @command="handleCommand" v-if="name">
        <span class="el-dropdown-link" @click="backSystem">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
          <span class="username">欢迎你，{{name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu>
    <div class="main-view">
      <router-view />
    </div>
  </div>
</template>

<script>
import { logout } from "@/service/home";
import { mapActions, mapState } from "vuex";
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
  computed: {
    ...mapState("user", ["user_id", "name"])
  },
  methods: {
    handleSelect(key, keyPath) {
      this.$router.push(key);
    },
    handleCommand(command) {
      if (command === "logout") {
        this.logout();
      }
    },
    async logout() {
      let params = {
        userid: this.user_id
      };
      let result = await logout({ params });
      this.$message.success("退出成功");
      localStorage.clear();
      this.$router.push("/login");
      this.getUserData();
    },
    ...mapActions("user", ["getUserData"]),
    backSystem() {
      if (this.$route.name === "downloads") {
        this.$router.push("/index");
      }
    }
  },
  components: {},
  mounted() {
    this.getUserData();
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  position: relative;
  overflow: hidden;
}
.el-menu--horizontal {
  width: 100%;
  padding: 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
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
  height: 100%;
  padding-top: 61px;
  overflow-y: scroll;
}
/deep/ .el-menu-item .el-icon-user-solid {
  color: #fff;
  margin: 0;
}

.logout {
  .el-dropdown-link {
    height: 35px;
    display: inline-block;
    margin-top: 15px;
    cursor: pointer;
  }
  .el-avatar {
    float: left;
    width: 32px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
  }
  .username {
    margin-left: 10px;
    margin-right: 5px;
    float: left;
    line-height: 35px;
    &:hover {
      color: #409eff;
    }
  }
  .el-icon--right {
    float: left;
    line-height: 35px;
    margin-right: 15px;
  }
}
</style>
