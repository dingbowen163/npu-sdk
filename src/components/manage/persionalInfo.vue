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
          {{form.user_id}}
          <!-- <el-input v-model="form.user_id" disabled></el-input> -->
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input maxlength="11" v-model="form.mobile"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="form.company"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="form.position"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="code-item" prop="check_code">
          <el-input placeholder="验证码" class="code-inp" maxlength="5" v-model="form.check_code"></el-input>
          <span class="code-img">
            <el-tooltip effect="dark" content="点击刷新验证码" placement="right">
              <img :src="codeInfo.check_image" @click="getVerifyCode" alt="验证码" />
            </el-tooltip>
          </span>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm">修 改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { getSelfInfo } from "@/service/home";
import mixin from "@/assets/js/verifyCodeMixin";
export default {
  mixins: [mixin],
  data() {
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
    return {
      form: {
        user_id: "",
        name: "",
        mobile: "",
        email: "",
        company: "",
        position: "",
        check_code: ""
      },
      formRules: {
        name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        mobile: [{ required: true, validator: validPhone, trigger: "blur" }],
        email: [{ required: true, validator: validEmail, trigger: "blur" }],
        company: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        position: [{ required: true, message: "请填写职位", trigger: "blur" }],
        check_code: [
          { required: true, message: "请填写验证码", trigger: "blur" }
        ]
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
.card{
  min-width: 600px;
}
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
    .code-img {
      width: 135px;
      height: 40px;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      float: right;
      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }
    }
  }
}
</style>
