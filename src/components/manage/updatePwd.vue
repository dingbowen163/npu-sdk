<template>
  <div class="content-view update-pwd">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-lock"></i>
        <span>修改密码</span>
      </h2>
    </header>
    <div class="card">
      <el-form class="form" label-width="100px" ref="resetForm" :model="resetForm">
        <el-form-item label="设置密码">
          <el-input type="password" v-model="resetForm.name"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input type="password" v-model="resetForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="code-item">
          <el-input class="code-inp" v-model="resetForm.code"></el-input>
          <img class="code-btn" @click="getCode" />
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
.submit {
  margin-bottom: 0;
  /deep/ .el-button {
    float: right;
  }
}
.form {
  margin-left: 100px;
  width: 450px;
}
/deep/ .el-form-item {
  height: 36px;
  .el-input {
    width: 350px;
    height: 36px;
  }
  .el-input__inner {
    height: 36px;
  }
  .el-form-item__content {
    height: 36px;
  }
  &.code-item {
    .code-inp {
      width: 200px;
      float: left;
    }
    .code-btn {
      margin-left: 20px;
      width: 130px;
      height: 36px;
      border-radius: 4px;
      border: none;
      position: relative;
      top: 1px;
    }
  }
}
</style>
