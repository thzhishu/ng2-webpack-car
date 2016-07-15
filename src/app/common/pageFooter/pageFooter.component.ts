import {
  Component,Input
} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'page-footer',
  template: require('./pageFooter.html'),
  styles: [require('./pageFooter.scss')]
})

export class PageFooterComponent {
  @Input() cls: string;
  constructor() {

  }
}
