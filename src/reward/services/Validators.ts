import {Control} from '@angular/common';

export class Validators {
  static required(c: Control) {
    return c.value == "" ? { "required": true } : null;
  }
  static ratio(c: Control) {
    return /^((\d|[123456789]\d)(\.\d+)?|100)$/.test(c.value);
  }
  static email(c: Control) {
    return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(c.value);
  }
  static mobile(c: Control) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(c.value);
  }
  static shiwan(c: Control) {
    return /^([1-9][0-9]{0,4}|100000)$/.test(c.value);
  }
}
