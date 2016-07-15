import {
  Component
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'main-logo',
  template: require('./mainLogo.html'),
  styles: [require('./mainLogo.scss')]
})

export class MainLogoComponent {
  constructor() {

  }
}
