angular
  .module('clone-service', [])
  .service('cloneService', function CloneService () {
    var originalItem = null;
    var currentItem = null;

    this.createClone = function (item) {
      originalItem = item;
      currentItem = this.clone(item);
      return currentItem;
    }

    this.getItem = function () {
      return currentItem;
    }

    this.abortChanges = function () {
      Object.assign(currentItem, originalItem);
      return originalItem;
    }

    this.commitChanges = function (item) {
      Object.assign(originalItem, currentItem);
    }

    this.clone = function (item) {
      // super poor clone implementation
      return JSON.parse(JSON.stringify(item));
    }
  })
