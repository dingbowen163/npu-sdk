<template>
  <div class="view login">
    <div class="content">
      <el-card shadow="hover" :body-style="{ padding: '30px' }" v-if="!showResetPwd">
        <h3 class="form-title">登录</h3>
        <el-form class="form" ref="form" :model="form">
          <el-form-item>
            <el-input prefix-icon="el-icon-user" placeholder="登录名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input prefix-icon="el-icon-lock" placeholder="密码" type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="验证码" class="code-inp" v-model="form.code"></el-input>
            <span class="code-img">
              <img src alt />
            </span>
          </el-form-item>
          <el-form-item class="btns">
            <el-button class="submit" type="primary" @click="submitForm">登录</el-button>
            <el-button type="text" @click="forgetPwd">忘记密码？</el-button>
          </el-form-item>
        </el-form>
      </el-card>
      <el-card shadow="hover" :body-style="{ padding: '30px' }" v-else>
        <h3 class="form-title">重置密码</h3>
        <el-form class="form" ref="resetForm" :model="resetForm">
          <el-form-item>
            <el-input placeholder="设置密码" type="password" v-model="resetForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="重复密码" type="password" v-model="resetForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="手机号" maxlength="11" v-model="resetForm.name"></el-input>
          </el-form-item>
          <el-form-item class="code-item">
            <el-input placeholder="短信验证码" class="code-inp" v-model="resetForm.code"></el-input>
            <el-button class="code-btn" @click="getCode">获取短信验证码</el-button>
          </el-form-item>
          <el-form-item class="btns">
            <el-button class="submit" type="primary" @click="submitPwd">提交</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      resetForm: {},
      showResetPwd: false
    };
  },
  methods: {
    submitForm() {
      this.$router.push("/index");
    },
    forgetPwd() {
      this.showResetPwd = true;
    },
    submitPwd() {},
    getCode() {}
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/login.scss";
</style>
