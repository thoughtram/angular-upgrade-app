import {upgradeAdapter} from './upgrade-adapter';
import './downgrades';
import {ContactsService} from './contacts-service/contacts-service'

upgradeAdapter.bootstrap(document.body, ['contacts-app']);
upgradeAdapter.addProvider(ContactsService);

