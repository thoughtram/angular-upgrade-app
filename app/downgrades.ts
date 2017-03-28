import {upgradeAdapter} from './upgrade-adapter';
import {ContactsListItemComponent} from './contacts-list-item-component/contacts-list-item-component';
import {ContactDetailComponent} from './contact-detail-component/contact-detail-component';
import {ContactsService} from './contacts-service/contacts-service'

declare let angular: any;
upgradeAdapter.addProvider(ContactsListItemComponent);

angular.module('contacts-list-item-component', [])
        .directive('contactsListItemComponent', upgradeAdapter.downgradeNg2Component(ContactsListItemComponent));
angular.module('contact-detail-component')
       .directive('contactDetailComponent', upgradeAdapter.downgradeNg2Component(ContactDetailComponent));
angular.module('contacts-service', [])
       .service('contactsService', upgradeAdapter.downgradeNg2Provider(ContactsService));