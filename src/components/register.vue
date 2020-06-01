<template>
  <div class="view register">
    <div class="content">
      <el-card shadow="hover" :body-style="{ padding: '30px' }">
        <h3 class="form-title">注册</h3>
        <el-form class="form" ref="form" :model="form" :rules="formRules">
          <el-form-item prop="user_id">
            <el-input placeholder="登录名" maxlength="40" v-model="form.user_id"></el-input>
          </el-form-item>
          <el-form-item prop="name">
            <el-input placeholder="姓名" maxlength="40" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="mobile">
            <el-input placeholder="手机号" maxlength="11" v-model="form.mobile"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input placeholder="电子邮箱" maxlength="256" v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item prop="company">
            <el-input placeholder="公司" maxlength="256" v-model="form.company"></el-input>
          </el-form-item>
          <el-form-item prop="position">
            <el-input placeholder="职位" maxlength="256" v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="登录密码" type="password" maxlength="20" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item prop="repeat_password">
            <el-input
              placeholder="重复密码"
              type="password"
              maxlength="20"
              v-model="form.repeat_password"
            ></el-input>
          </el-form-item>
          <el-form-item prop="check_code">
            <el-input placeholder="验证码" class="code-inp" maxlength="5" v-model="form.check_code"></el-input>
            <span class="code-img">
              <el-tooltip effect="dark" content="点击刷新验证码" placement="right">
                <img :src="codeInfo.check_image" @click="getVerifyCode" alt="验证码" />
              </el-tooltip>
            </span>
          </el-form-item>
          <el-form-item class="btns">
            <el-button class="submit" type="primary" @click="submitForm">注册</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { checkemail, checkid, checkCode, register } from "@/service/home";
import mixin from "@/assets/js/verifyCodeMixin";
export default {
  mixins: [mixin],
  data() {
    const validId = async (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写登录名"));
      } else {
        let params = { userid: value };
        let result = await checkid({ params });
        return callback();
      }
    };
    const validPhone = (rule, value, callback) => {
      const phoneValid = /^1[3456789]\d{9}$/;
      if (!value) {
        return callback(new Error("请填写手机号"));
      } else if (!phoneValid.test(value)) {
        return callback(new Error("请输入正确的手机号码"));
      } else {
        return callback();
      }
    };
    const validEmail = async (rule, value, callback) => {
      const emailValid = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!value) {
        return callback(new Error("请填写电子邮箱"));
      } else if (!emailValid.test(value)) {
        return callback(new Error("请输入正确的邮箱"));
      } else {
        let params = { email: value };
        let result = await checkemail({ params });
        return callback();
      }
    };
    const validNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写新密码"));
      } else if (value.length < 6) {
        return callback(new Error("密码长度不能少于6个字符"));
      } else {
        if (this.form.repeat_password && value !== this.form.repeat_password) {
          return callback(new Error("两次密码不一致，请重新输入"));
        } else {
          return callback();
        }
      }
    };
    const validConfirmNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请再次填写新密码"));
      } else if (value.length < 6) {
        return callback(new Error("密码长度不能少于6个字符"));
      } else {
        if (this.form.password && value !== this.form.password) {
          return callback(new Error("两次密码不一致，请重新输入"));
        } else {
          return callback();
        }
      }
    };
    return {
      form: {
        user_id: "",
        name: "",
        mobile: "",
        email: "",
        company: "",
        position: "",
        password: "",
        repeat_password: "",
        check_code: ""
      },
      formRules: {
        user_id: [{ required: true, validator: validId, trigger: "blur" }],
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        mobile: [{ required: true, validator: validPhone, trigger: "blur" }],
        email: [{ required: true, validator: validEmail, trigger: "blur" }],
        company: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        position: [{ required: true, message: "请填写职位", trigger: "blur" }],
        password: [{ required: true, validator: validNewPwd, trigger: "blur" }],
        repeat_password: [
          { required: true, validator: validConfirmNewPwd, trigger: "blur" }
        ],
        check_code: [{ required: true, message: "请填写验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const data = this.form;
          data.check_id = this.codeInfo.check_id;
          delete data.repeat_password;
          let result = await register({ data });
          this.$message.success('账号注册成功')
          this.back();
        }
      });
    },
    back() {
      this.$router.push("/login");
    },
    getCode() {}
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/login.scss";
</style>
