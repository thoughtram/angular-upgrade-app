angular
  .module('contact-detail-component', ['ngRoute', 'contacts-service', 'zippy-component'])
  .config(function ($routeProvider) {
    $routeProvider.when('/contact/:id', {
      template: '<contact-detail-component><contact-detail-component>'
    });
  });
