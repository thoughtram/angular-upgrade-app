angular
  .module('contacts-service', [])
  .service('contactsService', function ContactsService () {

    var CONTACT_DATA = [
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

    this.getContacts = function () {
      return CONTACT_DATA;
    };

    this.getContact = function (id) {
      return this.getContacts()
                 .find(function (contact) {
                   return contact.id == id;
                 })
    }
  });
