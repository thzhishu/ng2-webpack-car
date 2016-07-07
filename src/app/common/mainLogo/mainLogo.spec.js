import MainLogoModule from './mainLogo'
import MainLogoController from './mainLogo.controller';
import MainLogoComponent from './mainLogo.component';
import MainLogoTemplate from './mainLogo.html';

describe('MainLogo', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MainLogoModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new MainLogoController();
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
      expect(MainLogoTemplate).to.match(/{{\s?vm\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = MainLogoComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(MainLogoTemplate);
      });

      it('uses `controllerAs` syntax', () => {
        expect(component).to.have.property('controllerAs');
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(MainLogoController);
      });
  });
});
