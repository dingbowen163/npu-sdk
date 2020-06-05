export default {
  mounted() {
    this.enterKeyup();
  },
  destroyed() {
    this.enterKeyupDestroyed();
  },
  methods: {
    enterKey(event) {
      if (event.keyCode == 13) {
        this.submitForm();
      }
    },
    enterKeyupDestroyed() {
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    }
  }
};
