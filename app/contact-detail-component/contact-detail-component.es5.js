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
