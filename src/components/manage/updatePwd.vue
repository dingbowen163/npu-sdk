<template>
  <div class="content-view update-pwd">
    <header>
      <h2 class="header-title">
        <i class="icon-font el-icon-lock"></i>
        <span>修改密码</span>
      </h2>
    </header>
    <div class="card">
      <el-form class="form" label-width="100px" ref="form" :model="form" :rules="formRules">
        <el-form-item label="登录名">
          <span>{{user_id}}</span>
        </el-form-item>
        <el-form-item label="设置密码" prop="password">
          <el-input type="password" maxlength="20" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="repeat_password">
          <el-input type="password" maxlength="20" v-model="form.repeat_password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" class="code-item" prop="check_code">
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
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm">修 改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { editPwd } from "@/service/home";
import mixin from "@/assets/js/verifyCodeMixin";
import { mapState } from "vuex";
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
  computed: {
    ...mapState("user", ["user_id"])
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const data = this.form;
          delete data.repeat_password;
          data.user_id = this.user_id;
          data.check_id = this.codeInfo.check_id;
          let result = await editPwd({ data });
          if (result.msg === "ok") {
            this.$message.success("密码修改成功");
          }
          this.form = {
            password: "",
            repeat_password: "",
            check_code: ""
          };
          this.getVerifyCode();
        }
      });
    }
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
