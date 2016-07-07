import PageFooterModule from './pageFooter'
import PageFooterController from './pageFooter.controller';
import PageFooterComponent from './pageFooter.component';
import PageFooterTemplate from './pageFooter.html';

describe('PageFooter', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PageFooterModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PageFooterController();
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
      expect(PageFooterTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PageFooterComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PageFooterTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PageFooterController);
      });
  });
});
