<template>
  <div class="content-view update-pwd">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-lock"></i>
        <span>修改密码</span>
      </h2>
    </header>
    <div class="card">
      <el-form class="form" ref="resetForm" :model="resetForm">
        <el-form-item label="设置密码">
          <el-input placeholder="设置密码" type="password" v-model="resetForm.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="重复密码" type="password" v-model="resetForm.password"></el-input>
        </el-form-item>
        <el-form-item class="code-item">
          <el-input placeholder="验证码" class="code-inp" v-model="resetForm.code"></el-input>
          <el-button class="code-btn" @click="getCode">获取短信验证码</el-button>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitPwd">修 改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resetForm: {}
    };
  },
  methods: {
    submitForm() {},
    getCode() {}
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
.code-item {
  .code-inp {
    width: 60%;
    float: left;
  }
  .code-btn {
    width: 40%;
  }
}
.submit {
  margin-bottom: 0;
  /deep/ .el-button {
    float: right;
  }
}
/deep/ .el-form-item {
  width: 350px;
  height: 40px;
}
</style>
