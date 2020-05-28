<template>
  <div class="content-view persional-info">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-tools"></i>
        <span>个人资料</span>
      </h2>
    </header>
    <div class="card">
      <el-form ref="form" class="form" label-width="100px" :model="form" :rules="formRules">
        <el-form-item label="登录名">
          <el-input v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input maxlength="11" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="公司">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="code-item">
          <el-input class="code-inp" v-model="form.code"></el-input>
          <img class="code-btn" @click="getCode">
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm">修 改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: ""
      },
      formRules: {
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      }
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
.form {
  margin-left: 100px;
  width: 450px;
}
.submit {
  margin-bottom: 0;
  /deep/ .el-button {
    float: right;
  }
}
/deep/ .el-form-item {
  height: 36px;
  .el-input {
    width: 350px;
    height: 36px;
  }
  .el-input__inner{
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
