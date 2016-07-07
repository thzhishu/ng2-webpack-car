import InitStoreModule from './initStore'
import InitStoreController from './initStore.controller';
import InitStoreComponent from './initStore.component';
import InitStoreTemplate from './initStore.html';

describe('InitStore', () => {
  let $rootScope, makeController;

  beforeEach(window.module(InitStoreModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new InitStoreController();
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
      expect(InitStoreTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = InitStoreComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(InitStoreTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(InitStoreController);
      });
  });
});
