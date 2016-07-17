class BusinessAddController {
  constructor($stateParams,$state) {
    "ngInject";
    this.$params = $stateParams;
    this.$state = $state;
  }
  onSubmit(){
    this.$state.go('business-add', {step: 2});
  }
}

export default BusinessAddController;
