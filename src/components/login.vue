<template>
  <div class="view login">
    <div class="content">
      <Left></Left>
      <div class="content-right">
        <el-card shadow="hover" :body-style="{ padding: '30px' }" v-if="!showResetPwd">
          <h3 class="form-title">
            <span class="hello">Hello！</span>
            欢迎登录
          </h3>
          <el-form class="form" ref="form" :model="form" :rules="formRules">
            <el-form-item prop="user_id">
              <el-input prefix-icon="el-icon-user" placeholder="登录名" v-model="form.user_id"></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="密码"
                type="password"
                v-model="form.password"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                placeholder="请输入图形中的验证码"
                class="code-inp"
                maxlength="5"
                v-model="form.check_code"
              ></el-input>
              <span class="code-img">
              <el-tooltip effect="dark" content="点击刷新验证码" placement="right">
                <img :src="codeInfo.check_image" @click="getVerifyCode" alt="验证码" />
              </el-tooltip>
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
              <el-input placeholder="注册邮箱" v-model="resetForm.name"></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button class="submit" type="primary" @click="submitPwd">发送密码重置邮件</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from "@/service/home";
import mixin from "@/assets/js/verifyCodeMixin";
import { mapActions, mapState } from "vuex";
import Left from "@/common/left"
export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        user_id: "",
        password: "",
        check_code: ""
      },
      formRules: {
        user_id: [{ required: true, message: "请填写登录名", trigger: "blur" }],
        password: [{ required: true, message: "请填写密码", trigger: "blur" }],
        check_code: [
          { required: true, message: "请填写验证码", trigger: "blur" }
        ]
      },
      resetForm: {},
      showResetPwd: false
    };
  },
  methods: {
    ...mapActions("user", ["getUserData"]),
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const data = this.form;
          data.check_id = this.codeInfo.check_id;
          let result = await login({ data });
          if (result.msg === "ok") {
            localStorage.setItem("user_id", result.data.user_id);
            this.$message.success("登录成功");
            this.$router.push("/index");
            this.getUserData();
          } else {
            this.getVerifyCode();
          }
        }
      });
    },
    forgetPwd() {
      this.showResetPwd = true;
    },
    submitPwd() {},
    getCode() {}
  },
  components: {
    Left
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/login.scss";
</style>
