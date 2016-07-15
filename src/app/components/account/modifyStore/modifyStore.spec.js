import ModifyStoreModule from './modifyStore'
import ModifyStoreController from './modifyStore.controller';
import ModifyStoreComponent from './modifyStore.component';
import ModifyStoreTemplate from './modifyStore.html';

describe('ModifyStore', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ModifyStoreModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ModifyStoreController();
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
      expect(ModifyStoreTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ModifyStoreComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ModifyStoreTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ModifyStoreController);
      });
  });
});
