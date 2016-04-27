import {upgradeAdapter} from './upgrade-adapter';
import {ContactsListItemComponent} from './contacts-list-item-component/contacts-list-item-component';
import {ContactDetailComponent} from './contact-detail-component/contact-detail-component';

declare let angular:any;

angular.module('contacts-list-item-component', [])
       .directive('contactsListItemComponent', upgradeAdapter.downgradeNg2Component(ContactsListItemComponent));

angular.module('contact-detail-component')
       .directive('contactDetailComponent', upgradeAdapter.downgradeNg2Component(ContactDetailComponent));
