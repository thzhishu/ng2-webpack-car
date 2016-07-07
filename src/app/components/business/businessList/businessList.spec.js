import BusinessListModule from './businessList'
import BusinessListController from './businessList.controller';
import BusinessListComponent from './businessList.component';
import BusinessListTemplate from './businessList.html';

describe('BusinessList', () => {
  let $rootScope, makeController;

  beforeEach(window.module(BusinessListModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new BusinessListController();
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
      expect(BusinessListTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = BusinessListComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(BusinessListTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(BusinessListController);
      });
  });
});
