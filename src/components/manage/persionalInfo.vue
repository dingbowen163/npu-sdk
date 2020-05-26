<template>
  <div class="content-view persional-info">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-s-tools"></i>
        <span>个人资料</span>
      </h2>
    </header>
    <div class="card">
      <el-form ref="form" class="form" :model="form" :rules="formRules">
        <el-form-item>
          <el-input placeholder="登录名" v-model="form.name" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input placeholder="Email" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="公司" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="登录密码" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="重复密码" type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="职位" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="手机号" maxlength="11" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="code-item">
          <el-input placeholder="短信验证码" class="code-inp" v-model="form.code"></el-input>
          <el-button class="code-btn" @click="getCode">获取短信验证码</el-button>
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
