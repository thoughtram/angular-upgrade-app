angular.module('contacts-app', [
  'contact-header-component',
  'contacts-list-component',
  'contact-detail-component',
  'contact-editor-component'
])
.component('contactsApp', {
  templateUrl: 'app/contacts-app.html',
});
