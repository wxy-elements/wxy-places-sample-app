(function() {
  Polymer({
    is: 'wxy-google-place-detail',
    placesReady: false,
    properties: {
      placeId: {
        type: String,
        observer: 'placeIdChanged'
      },
      detail: {
        type: Object,
        notify: true
      }
    },
    computeOpenNow: function(open) {
      if (open) {
        return 'Open Now';
      } else {
        return 'Closed';
      }
    },
    onReady: function() {
      this.placesReady = true;
      this.placeIdChanged();
    },
    placeIdChanged: function() {
      var placeDetailPromise;
      if (!this.placesReady || !this.placeId) {
        return;
      }
      placeDetailPromise = this.$.places.getDetails(this.placeId);
      return placeDetailPromise.then((function(_this) {
        return function(detail) {
          _this.detail = detail;
          _this.photoIndex = 0;
          _this._SetCurrentPhoto();
        };
      })(this), (function(_this) {
        return function(error) {
          _this.errorMessage = error.message;
        };
      })(this));
    },
    _SetCurrentPhoto: function() {
      var _ref, _ref1;
      this.currentPhoto = (_ref = this.detail.photos) != null ? (_ref1 = _ref[this.photoIndex]) != null ? _ref1.getUrl({
        maxWidth: 350,
        maxHeight: 350
      }) : void 0 : void 0;
    }
  });

}).call(this);
