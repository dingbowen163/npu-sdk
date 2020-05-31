import { getVerifyCode } from "@/service/home";

export default {
  data() {
    return {
      codeInfo: {}
    };
  },
  mounted() {
    this.getVerifyCode();
  },
  methods: {
    async getVerifyCode() {
      this.codeInfo = {};
      let result = await getVerifyCode();
      this.codeInfo = result.data;
      this.form.check_code = ''
    }
  }
};
