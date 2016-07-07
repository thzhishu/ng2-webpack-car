class ForgetPwdController {
  constructor($timeout) {
    "ngInject";
    this.$timeout = $timeout;
    this.oauth = {};
  }

  onCheckPhone() {
    this.oauth.vaild = 1;
    this.$timeout(() => {
      this.oauth.next = 1;
    },400);
  }
  onEditPwd() {
    this.oauth.submited = 1;
    this.$timeout(() => {
      this.loading = 1;
    },500);
    this.$timeout(() => {
      this.clear();
    },5000);
  }

  clear(){
    this.loading = 0;
    this.oauth.vaild = 0;
    this.oauth.next = 0;
    this.oauth.submited = 0;
  }
}

export default ForgetPwdController;
