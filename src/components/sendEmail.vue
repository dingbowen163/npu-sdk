<template>
  <div class="view sendEmail">
    <div class="content">
      <Left></Left>
      <div class="content-right">
        <el-card shadow="hover" :body-style="{ padding: '30px' }">
          <h3 class="form-title">重置密码</h3>
          <el-form class="form" ref="resetForm" :model="resetForm" :rules="resetFormRules">
            <el-form-item prop="email">
              <el-input placeholder="请填写注册邮箱" v-model="resetForm.email"></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button class="submit" type="primary" @click="submitForm">发送密码重置邮件</el-button>
              <el-button @click="back">返回</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import { login, sendemail } from "@/service/home";
import enterMixin from "@/assets/js/enterMixin";
import Left from "@/common/left";
export default {
  mixins: [enterMixin],
  data() {
    const validEmail = async (rule, value, callback) => {
      const emailValid = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!value) {
        return callback(new Error("请填写电子邮箱"));
      } else if (!emailValid.test(value)) {
        return callback(new Error("请输入正确的邮箱"));
      } else {
        return callback();
      }
    };
    return {
      resetForm: { email: "" },
      resetFormRules: {
        email: [{ required: true, validator: validEmail, trigger: "blur" }]
      }
    };
  },
  methods: {
    back() {
      this.$router.push("/login");
    },
    submitForm() {
      this.$refs.resetForm.validate(async valid => {
        if (valid) {
          const params = this.resetForm;
          let result = await sendemail({ params });
          this.$message.success("密码重置邮件已发送，请注意查收！");
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
