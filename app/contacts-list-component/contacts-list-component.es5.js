angular
  .module('contacts-list-component', ['ngRoute', 'contacts-service', 'contacts-list-item-component'])
  .config(function ($routeProvider) {
    $routeProvider.when('/', {
      template: '<contacts-list-component></contacts-list-component>'
    });
  })
  .component('contactsListComponent', {
    templateUrl: 'app/contacts-list-component/contacts-list-component.html',
    controller: function (contactsService) {
      this.contacts = contactsService.getContacts();
    },
});
