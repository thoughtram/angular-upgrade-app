# Angular Upgrade App

Welcome to the Angular Upgrade App. This is a quick tutorial that teaches you how to upgrade your existing Angular 1 app to Angular 2 step by step.

The app is written in **ES5** using Angular 1.5.5 and we are upgrading to Angular 2 (rc1) with the Angular 2 code written in TypeScript.

# Getting Started

1. Fork and clone this repo

1. Run `npm i`

1. Run `npm start` (Runs the TypeScript compiler, watches for changes, starts the server, and launches the browser)

# Exercises (TOC)

**[Exercise 1: Bootstrap the app via the UpgradeAdapter](#e1)**

**[Exercise 2: Create an ng2 component for the list items and use it within the ng-repeat](#e2)**

**[Exercise 3: Partly upgrade the ContactDetailComponent to ng2](#e3)**

**[Exercise 4: Upgrade the ng1 `zippy-component` and use it from within our new ng2 `ContactDetailComponent`
](#e4)**

**[Exercise 5: upgrade provider to use ng1 services in ng2](#e5)**

**[Exercise 6: refactor ContactsService to ng2 service and register with ng1](#e6)**

<a name="e1"/>
## Exercise 1: Bootstrap the app via the UpgradeAdapter

The goal of this first exercise is to simply throw in Angular 2 and bootstrap the existing Angular 1 app via the `UpdateAdapter` provided by Angular 2.

### Tasks

1. Adjust the `<head>` section of the `index.html` to include Angular 2 and SystemJS. Let's not get distracted by this. Simply replace your entire list of `<script>` tags with this one:

  ```html
  <script src="node_modules/es6-shim/es6-shim.min.js"></script>
  <script src="node_modules/systemjs/dist/system-polyfills.js"></script>
  <script src="node_modules/zone.js/dist/zone.js"></script>
  <script src="node_modules/reflect-metadata/Reflect.js"></script>
  <script src="node_modules/systemjs/dist/system.src.js"></script>

  <script src="node_modules/angular/angular.js"></script>
  <script src="node_modules/angular-route/angular-route.js"></script>

  <script src="app/contacts-service/contacts-service.es5.js"></script>
  <script src="app/clone-service/clone-service.es5.js"></script>
  <script src="app/zippy-component/zippy-component.es5.js"></script>
  <script src="app/contact-header-component/contact-header-component.es5.js"></script>
  <script src="app/contacts-list-component/contacts-list-component.es5.js"></script>
  <script src="app/contact-detail-component/contact-detail-component.es5.js"></script>
  <script src="app/contact-editor-component/contact-editor-component.es5.js"></script>
  <script src="app/contacts-app.es5.js"></script>
  <script>
    System.config({packages: {app: {format: 'register',defaultExtension: 'js'}}});
    System.config({
      map: {
        'rxjs': 'node_modules/rxjs',
        '@angular': 'node_modules/@angular',
        'app': 'app'
      },
      packages: {
        'app': {
          main: 'main.js',
          defaultExtension: 'js'
        },
        '@angular/core': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/compiler': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/common': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/platform-browser': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/platform-browser-dynamic': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        '@angular/upgrade': {
          main: 'index.js',
          defaultExtension: 'js'
        },
        'rxjs': {
          defaultExtension: 'js'
        }
      }
    });

    System.import('app/main').then(null, console.error.bind(console));
  </script>  
  ```

2. Remove the `ng-app` attribute. Manual bootstrapping is mandatory for the upgrade
3. Create `app/upgrade-adapter.ts` and import the `UpgradeAdapter` from `@angular/upgrade`;
4. Export an **instance** of the `UpgradeAdapter` from `upgrade-adapter.ts` (`export const upgradeAdapter = new UpgradeAdapter();`)
5. Create `app/main.ts`, import the **instance** of the `UpgradeAdapter` and use it to manually bootstrap the app (`upgradeAdapter.bootstrap(document.body, ['contacts-app']);`).

<a name="e2"/>
## Exercise 2: Create an ng2 component for the list items and use it within the ng-repeat

In this exercise we want to partly replace the `contacts-list-component` with a new component written in TypeScript using Angular 2.

The goal is not to replace it entirely (just yet) but instead only replace what is repeated within `ng-repeat`. So by the end of this exercise we'll have a good old Angular 1 `ng-repeat` stamping out new Angular 2 components!

### Tasks

1. Create a `Contact` model for a more idiomatic TypeScript usage. Create a new file `app/models/contact.ts` with the following contents.

  ```ts
  interface Address {
    street: string;
    city: string;
    zip: string;
    country: string;
  }

  export interface Contact {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthday: string;
    website: string;
    image: string;
    address: Address;
  }
  ```
2. Create a `ContactsListItemComponent`

  * Create a new file `app/contacts-list-item-component/contacts-list-item-component.ts` with the following contents

    ```ts
    import {Component, Input} from '@angular/core';
    import {Contact} from '../models/contact';

    @Component({
      selector: 'contacts-list-item-component',
      templateUrl: 'app/contacts-list-item-component/contacts-list-item-component.html'
    })
    export class ContactsListItemComponent {
      @Input() contact: Contact;
    }
    ```

  * Create a new file `app/contacts-list-item-component/contacts-list-item-component.html` with the following contents

    ```html
    <a href="#/contact/{{contact.id}}">
      <img [src]="contact.image" alt="" class="circle">
      <span class="title">{{contact.name}}</span>
    </a>
    ```

3. Create a new file `app/downgrades.ts`. We'll use it to expose Angular 2 components as Angular 1 directives.

  * Import the `UpgradeAdapter` **instance**
  * Import the `ContactsListItemComponent` which we have just created
  * Create a new Angular 1 module and register the downgraded component as directive

    ```js
    angular.module('contacts-list-item-component', [])
            .directive('contactsListItemComponent', upgradeAdapter.downgradeNg2Component(ContactsListItemComponent));
    ```

4. In `main.ts` add `import './downgrades';`
5. Add the `contacts-list-item-component` as a module dependency in the `contacts-list-component`
6. Change the template of the `contacts-list-component` to repeat over our new ng2 component

  ```html
  <ul class="collection">
    <li class="collection-item avatar" ng-repeat="contact in $ctrl.contacts">
      <contacts-list-item-component [contact]="contact"></contacts-list-item-component>
    </li>
  </ul>
  ```

<a name="e3"/>
## Exercise 3: Partly upgrade the ContactDetailComponent to ng2

In this exercise we want to start upgrading the `ContactDetailComponent` to Angular 2. This component has dependencies against services and also uses yet another Angular 1 component in its template, the `zippy-component`.

So, let's break this down in more manageable steps to not get lost. Let's ignore the `zippy-component` for now. Let's also ignore the services for now and instead keep a thin layer of Angular 1 around our new Angular 2 component that deals with the services and pass the `Contact` instance through an `@Input`-property as we used before. We will come back to these issues later.


### Tasks

1. Create a `ContactDetailComponent`

  * Create file `app/contact-detail-component/contact-detail-component.ts` with the following contents

    ```ts
    import {Component, Input} from '@angular/core';
    import {Contact} from '../models/contact';

    @Component({
      selector: 'contact-detail-component',
      templateUrl: 'app/contact-detail-component/contact-detail-component.html'
    })
    export class ContactDetailComponent {
      @Input() contact: Contact;
    }
    ```

  * Change the `contact-detail-component.html` to match the expected Angular 2 syntax.

    ```html
    <div class="row">
      <div class="col s12 m7">
        <div class="card">
          <div class="card-image">
            <img src="{{contact?.image}}">
            <span class="card-title">{{contact?.name}}</span>
          </div>
          <div class="card-content grey-text text-darken-4">
            <div class="row">
              <span class="col s6"><i class="material-icons prefix">email</i> Email:</span>
              <span class="col s6">{{contact?.email || '-'}}</span>
            </div>
            <div class="row">
              <span class="col s6"><i class="material-icons prefix">phone</i> Phone:</span>
              <span class="col s6">{{contact?.phone || '-'}}</span>
            </div>
            <div class="row">
              <span class="col s6"><i class="material-icons prefix">cake</i> Birthday:</span>
              <span class="col s6">{{contact?.birthday || '-'}}</span>
            </div>
            <div class="row">
              <span class="col s6"><i class="material-icons prefix">public</i> Website:</span>
              <span class="col s6">{{contact?.website || '-'}}</span>
            </div>
            <zippy-component title="{{zippyCaption}}" toggle="toggleCaption(closed)">
              <fieldset>
                <legend><i class="material-icons prefix">location_city</i> Address</legend>
                <div class="row">
                  <span class="col s6">Street:</span>
                  <span class="col s6">{{contact?.address?.street || '-'}}</span>
                </div>
                <div class="row">
                  <span class="col s6">Zipcode:</span>
                  <span class="col s6">{{contact?.address?.zip || '-'}}</span>
                </div>
                <div class="row">
                  <span class="col s6">City:</span>
                  <span class="col s6">{{contact?.address?.city || '-'}}</span>
                </div>
                <div class="row">
                  <span class="col s6">Country:</span>
                  <span class="col s6">{{contact?.address?.country || '-'}}</span>
                </div>
              </fieldset>
            </zippy-component>
          </div>
          <div class="card-action">
            <a class="btn" href="#/">Go Back</a>
            <a class="btn" href="#/contact/{{contact?.id}}/edit">Edit</a>
          </div>
        </div>
      </div>
    </div>
    ```
2. Downgrade the component in `downgrades.ts` but make sure to add it to the existing Angular 1 module instead of creating a new one. Don't forget that you have to import the component at the top of the file.

  ```ts
  angular.module('contact-detail-component')
         .directive('contactDetailComponent', upgradeAdapter.downgradeNg2Component(ContactDetailComponent));
  ```

3. Change the `contact-detail-component.es5.js` file to remove the actual component but keep the routing and write an inline controller to retrieve the data and pass it through the property binding to our new Angular 2 component.

  ```js
  angular
    .module('contact-detail-component', ['ngRoute', 'contacts-service', 'zippy-component'])
    .config(function ($routeProvider) {
      $routeProvider.when('/contact/:id', {
        controller: function (contactsService, $routeParams) {
          this.contact = contactsService.getContact($routeParams.id);
        },
        controllerAs: '$ctrl',
        template: '<contact-detail-component [contact]="$ctrl.contact"><contact-detail-component>'
      });
    });
  ```

<a name="e4"/>
## Exercise 4: Upgrade the ng1 `zippy-component` and use it from within our new ng2 `ContactDetailComponent`

With the last exercise we left our `ContactDetailComponent` partly broken because the template uses a `zippy-component` which is written in Angular 1 but doesn't work out of the box within our Angular 2 template any longer.

Let's fix that by upgrading the ng1 component so that it can be used in Angular 2.

### Tasks

1. Use the `UpgradeAdapter` **instance** to upgrade the zippy and use it in our new `ContactDetailComponent`

  ```ts
  import {Component, Input} from '@angular/core';
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
  ```

2. Change the syntax in the template that uses the zippy to the Angular 2 syntax.

  ```html
  <zippy-component title="{{zippyCaption}}" (toggle)="toggleCaption($event.closed)">
  ```

<a name="e5"/>
## Exercise 5: upgrade provider to use ng1 services in ng2

When we ported over the `contact-detail-component` to Angular 2 we cheated a little to work around the fact that this component actually wants some services injected. Let's address these issues and upgrade the Angular 1 provider so that we can inject the Angular 1 services in our Angular 2 component.

### Tasks

1. Upgrade the provider for `$routeParams` and `contactsService` through the already injected `UpgradeAdapter` instance.

  ```ts
  upgradeAdapter.upgradeNg1Provider('$routeParams');
  upgradeAdapter.upgradeNg1Provider('contactsService');
  ```

2. Inject the services and retrieve the contact through it.

  ```ts
  constructor (@Inject('$routeParams') $routeParams: any,
                @Inject('contactsService') contactsService: any) {
    this.contact = contactsService.getContact($routeParams.id);
    this.toggleCaption(false);
  }
  ```

  <a name="e6"/>
  ## Exercise 6: refactor ContactsService to ng2 service and register with ng1

  At this point we want to rewrite the `ContactsService` as an Angular 2 service. But since we are still using the service from different Angular 1 components we need to make sure that it continues to be available in both worlds. In other words, this time we want to use an Angular 2 service from within Angular 1.

  ### Tasks

  1. Delete the old `contacts-service.es5.js` file and create a file `app/contacts-service/contacts-service.ts` with the following content.

    ```ts
    import {Injectable} from '@angular/core';

    @Injectable()
    export class ContactsService {
      private CONTACT_DATA = [
          {
              id: 0,
              name: 'Christoph Burgdorf',
              email: 'christoph@thoughtram.io',
              phone: '+49 000 1111',
              birthday: '1984-01-02',
              website: 'thoughtram.io',
              image: '/assets/images/0.jpg',
              address: {
                street: 'thoughtram road 1',
                zip: '65222',
                city: 'Hanover',
                country: 'Germany'
              }
          },
          {
              id: 1,
              name: 'Pascal Precht',
              email: 'pascal@thoughtram.io',
              phone: '+49 000 222',
              birthday: '1991-03-31',
              website: 'thoughtram.io',
              image: '/assets/images/1.jpg',
              address: {
                street: 'thoughtram road 1',
                zip: '65222',
                city: 'Hanover',
                country: 'Germany'
              }
          },
          {
              id: 2,
              name: 'Nicole Hansen',
              email: 'who@car.es',
              phone: '+49 000 333',
              birthday: '1981-03-31',
              website: '',
              image: '/assets/images/3.jpg',
              address: {
                street: 'Who Cares Street 42',
                zip: '65222',
                city: 'Sun Funcisco',
                country: 'United States'
              }
          },
          {
              id: 3,
              name: 'Zoe Moore',
              email: 'zoe@moore.com',
              phone: '+49 000 000',
              birthday: '1990-02-18',
              website: '',
              image: '/assets/images/4.jpg',
              address: {
                street: '3745 denny street',
                zip: '86337',
                city: 'Ballinasloe',
                country: 'United States'
              }
          },
          {
              id: 4,
              name: 'Diane Hale',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/5.jpg',
              address: {
                street: '1459 tara street',
                zip: '18371',
                city: 'Bray',
                country: 'United States'
              }
          },
          {
              id: 5,
              name: 'Diana Ellis',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/6.jpg',
              address: {
                street: '6503 tara street',
                zip: '43378',
                city: 'Dungarvan',
                country: 'United States'
              }
          },
          {
              id: 6,
              name: 'Barry Ford',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/7.jpg',
              address: {
                street: '6554 park lane',
                zip: '43378',
                city: 'Rush',
                country: 'United States'
              }
          },
          {
              id: 7,
              name: 'Ella Grant',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/8.jpg',
              address: {
                street: '2749 church road',
                zip: '87125',
                city: 'Clonakilty',
                country: 'United States'
              }
          },
          {
              id: 8,
              name: 'Brent Mason',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/9.jpg',
              address: {
                street: '8436 tara street',
                zip: '59949',
                city: 'Dundalk',
                country: 'United States'
              }
          },
          {
              id: 9,
              name: 'Sam Thomas',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/10.jpg',
              address: {
                street: '2523 park road',
                zip: '59949',
                city: 'Drogheda',
                country: 'United States'
              }
          },
          {
              id: 10,
              name: 'Vicky Roberts',
              email: '',
              phone: '',
              birthday: '',
              website: '',
              image: '/assets/images/11.jpg',
              address: {
                street: '9791 grafton street',
                zip: '30165',
                city: 'Galway',
                country: 'London'
              }
          }
      ];

      getContacts () {
        return this.CONTACT_DATA;
      }

      getContact (id: string) {
        return this.CONTACT_DATA.find(contact => contact.id.toString() === id);
      }
    }
    ```

  2. Import the new `ContactsService` in the `ContactDetailComponent` and change the constructor accordingly.

    ```ts
    constructor (@Inject('$routeParams') $routeParams: any,
                 contactsService: ContactsService) {
      this.contact = contactsService.getContact($routeParams.id);
      this.toggleCaption(false);
    }
    ```

  3. Remove the call to `upgradeNg1Provider` in the `ContactDetailComponent`

  4. In `downgrades.ts` use `downgradeNg2Provider` to make the service available for Angular 1

    ```ts
    angular.module('contacts-service', [])
           .service('contactsService', upgradeAdapter.downgradeNg2Provider(ContactsService));
    ```

  5. In `main.ts` import the `ContactService` and register it as a provider for Angular 2.

    ```ts
    upgradeAdapter.addProvider(ContactsService);
    ```
