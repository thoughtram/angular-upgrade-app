import {upgradeAdapter} from './upgrade-adapter';
import {ContactsService} from './contacts-service/contacts-service';
import './downgrades';

upgradeAdapter.addProvider(ContactsService);
upgradeAdapter.bootstrap(document.body, ['contacts-app']);
