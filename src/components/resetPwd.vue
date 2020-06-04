<template>
  <div class="view resetPwd">
    <div class="content">
      <Left></Left>
      <div class="content-right">
        <el-card shadow="hover">
          <h3 class="form-title">重置密码</h3>
          <el-form class="form" ref="form" :model="form" :rules="formRules">
            <el-form-item prop="password">
              <el-input placeholder="请输入新密码" type="password" maxlength="20" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="repeat_password">
              <el-input
                placeholder="请再次输入新密码"
                type="password"
                maxlength="20"
                v-model="form.repeat_password"
              ></el-input>
            </el-form-item>
            <el-form-item prop="check_code">
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
              <el-button class="submit" type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { resetpassword } from "@/service/home";
import mixin from "@/assets/js/verifyCodeMixin";
import Left from "@/common/left";
export default {
  mixins: [mixin],
  data() {
    const validNewPwd = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请填写新密码"));
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
      } else {
        if (this.form.password && value !== this.form.password) {
          return callback(new Error("两次密码不一致，请重新输入"));
        } else {
          return callback();
        }
      }
    };
    return {
      id: this.$route.query.id,
      form: {
        password: "",
        repeat_password: "",
        check_code: ""
      },
      formRules: {
        password: [{ required: true, validator: validNewPwd, trigger: "blur" }],
        repeat_password: [
          { required: true, validator: validConfirmNewPwd, trigger: "blur" }
        ],
        check_code: [
          { required: true, message: "请填写验证码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const params = this.form;
          params.id = this.id;
          params.check_id = this.codeInfo.check_id;
          delete params.repeat_password;
          let result = await resetpassword({ params });
          this.$message.success("密码已重置，请重新登录");
          this.$router.push("/login");
        }
      });
    }
  },
  components: { Left },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/login.scss";
</style>
