angular
  .module('zippy-component', [])
  .component('zippyComponent', {
    templateUrl: 'app/zippy-component/zippy-component.html',
    transclude: true,
    bindings: {
      closed: '<',
      title: '@',
      toggle: '&'
    },
    controller: function () {
      this.onToggle = function () {
        this.closed = !this.closed;
        this.toggle({closed: this.closed})
      }
    }
  })
