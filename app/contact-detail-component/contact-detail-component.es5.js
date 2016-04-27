angular
  .module('contact-detail-component', ['ngRoute', 'contacts-service', 'zippy-component'])
  .config(function ($routeProvider) {
    $routeProvider.when('/contact/:id', {
      template: '<contact-detail-component><contact-detail-component>'
    });
  })
  .component('contactDetailComponent', {
    templateUrl: 'app/contact-detail-component/contact-detail-component.html',
    controller: function (contactsService, $routeParams) {

      this.$onInit = function () {
        this.contact = contactsService.getContact($routeParams.id);
        this.toggleCaption(false);
      };

      this.toggleCaption = function (closed) {
        this.zippyCaption = closed ? 'Show address' : 'Hide address';
      };

    }
});
