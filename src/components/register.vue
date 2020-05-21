<template>
  <div class="view register">
    <div class="content">
      <img class="bg" src="../assets/logo.png" alt />
      <div class="form-content">
        <div>
          <h3 class="form-title">注册</h3>
          <el-form class="form" ref="form" :model="form" :rules="formRules">
            <el-form-item>
              <el-input placeholder="登录名" v-model="form.name"></el-input>
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
              <el-input placeholder="手机号" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="短信验证码" class="code-inp" v-model="form.code"></el-input>
              <span class="code-img">
                <img src alt />
              </span>
            </el-form-item>
            <el-form-item class="btns">
              <el-button class="submit" type="primary" @click="submitForm">注册</el-button>
              <el-button @click="forgetPwd">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
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
        email: [{ required: true, message: "请输入活动名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {},
    forgetPwd() {}
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/login.scss";
</style>
