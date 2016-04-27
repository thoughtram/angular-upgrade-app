import {Component, Input, Inject} from '@angular/core';
import {Contact} from '../models/contact';

@Component({
  selector: 'contact-detail-component',
  templateUrl: 'app/contact-detail-component/contact-detail-component.html'
})
export class ContactDetailComponent {
  @Input() contact: Contact;
}
