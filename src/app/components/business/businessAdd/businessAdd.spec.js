import BusinessAddModule from './businessAdd'
import BusinessAddController from './businessAdd.controller';
import BusinessAddComponent from './businessAdd.component';
import BusinessAddTemplate from './businessAdd.html';

describe('BusinessAdd', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BusinessAddModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BusinessAddController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(BusinessAddTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BusinessAddComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BusinessAddTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BusinessAddController);
      });
  });
});
