<template>
  <div class="view login">
    <div class="content">
      <img class="bg" src="../assets/logo.png" alt />
      <div class="form-content">
        <div>
          <h3 class="form-title">登录</h3>
          <el-form class="form" ref="form" :model="form">
            <el-form-item>
              <el-input placeholder="登录名" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="验证码" class="code-inp" v-model="form.code"></el-input>
              <span class="code-img">
                <img src="" alt="">
              </span>
            </el-form-item>
             <el-form-item class="btns">
               <el-button class="submit" type="primary" @click="submitForm">登 录</el-button>
               <el-button type="text" @click="forgetPwd">忘记密码</el-button>
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
      form: {}
    };
  },
  methods: {
    submitForm(){},
    forgetPwd(){}
  },
  components: {},
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/login.scss";
</style>
