angular
  .module('contact-editor-component', ['ngRoute', 'contacts-service', 'clone-service'])
  .config(function ($routeProvider) {
    $routeProvider.when('/contact/:id/edit', {
      template: '<contact-editor-component><contact-editor-component>'
    });
  })
  .component('contactEditorComponent', {
    templateUrl: 'app/contact-editor-component/contact-editor-component.html',
    controller: function (contactsService, cloneService, $location, $routeParams) {

      this.contact = cloneService.createClone(contactsService.getContact($routeParams.id));

      //http://stackoverflow.com/questions/30537886/error-ngmodeldatefmt-expected-2015-05-29t190616-693209z-to-be-a-date-a
      this.contact.birthday = new Date(this.contact.birthday);

      this.$onInit = function () {
        console.log('running');
      };

      this.cancel = function (contact) {
        cloneService.abortChanges();
        goToDetails(contact);
      };

      this.save = function (contact) {
        cloneService.commitChanges();
        goToDetails(contact);
      };

      goToDetails = function (contact) {
        $location.url('/contact/' + contact.id);
      };

    }
});
