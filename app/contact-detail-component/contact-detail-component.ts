import {Component, Input, Inject} from '@angular/core';
import {Contact} from '../models/contact';
import {upgradeAdapter} from '../upgrade-adapter';

const ZippyComponent = upgradeAdapter.upgradeNg1Component('zippyComponent');

@Component({
  selector: 'contact-detail-component',
  templateUrl: 'app/contact-detail-component/contact-detail-component.html',
  directives: [ZippyComponent]
})
export class ContactDetailComponent {
  @Input() contact: Contact;
  zippyCaption: string;

  constructor () {
    this.toggleCaption(false);
  }

  toggleCaption (closed: boolean) {
    this.zippyCaption = closed ? 'Show address' : 'Hide address';
  }
}
