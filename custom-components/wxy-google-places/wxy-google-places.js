(function() {
  var libraryLoad, libraryLoaded, onPlacesLoad, waiting;

  libraryLoad = false;

  libraryLoaded = false;

  waiting = [];

  onPlacesLoad = function() {
    var item, _i, _len;
    libraryLoaded = true;
    for (_i = 0, _len = waiting.length; _i < _len; _i++) {
      item = waiting[_i];
      item.onMapReady();
    }
    waiting = [];
  };

  Polymer({
    is: 'wxy-google-places',
    properties: {
      radius: {
        type: Number,
        value: 500
      }
    },
    ready: function() {
      var script;
      window.onPlacesLoad = onPlacesLoad;
      if (libraryLoaded) {
        this.onMapReady();
      } else {
        waiting.push(this);
      }
      if (libraryLoad) {
        return;
      }
      libraryLoad = true;
      script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=onPlacesLoad';
      document.body.appendChild(script);
    },
    onMapReady: function() {
      var location;
      location = new google.maps.LatLng(-33.8665433, 151.1956316);
      this.map = new google.maps.Map(this.$.map, {
        center: location,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((function(_this) {
          return function(position) {
            var latitude, longitude;
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            _this.map.setCenter(new google.maps.LatLng(latitude, longitude));
          };
        })(this));
      }
      this.service = new google.maps.places.PlacesService(this.map);
      this.fire('google-places-ready');
    },
    setLocation: function(query) {
      return new Promise((function(_this) {
        return function(resolve, reject) {
          var geocoder;
          geocoder = new google.maps.Geocoder();
          return geocoder.geocode({
            address: query
          }, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
              _this.map.setCenter(results[0].geometry.location);
              resolve(results);
            } else {
              reject({
                status: status,
                error: result
              });
            }
          });
        };
      })(this));
    },
    textSearch: function(query) {
      var request;
      request = {
        radius: this.radius,
        query: query,
        location: this.map.getCenter()
      };
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.service.textSearch(request, function(results, status) {
            var result, _i, _len, _ref, _ref1;
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              console.log(results);
              for (_i = 0, _len = results.length; _i < _len; _i++) {
                result = results[_i];
                result.photo = (_ref = result.photos) != null ? (_ref1 = _ref[0]) != null ? _ref1.getUrl({
                  maxHeight: 200,
                  maxWidth: 200
                }) : void 0 : void 0;
              }
              resolve(results);
            } else {
              reject({
                status: status,
                error: result
              });
            }
          });
        };
      })(this));
    },
    getDetails: function(id) {
      var request;
      request = {
        placeId: id
      };
      return new Promise((function(_this) {
        return function(resolve, reject) {
          return _this.service.getDetails(request, function(result, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              resolve(result);
            } else {
              reject({
                status: status,
                error: result
              });
            }
          });
        };
      })(this));
    }
  });

}).call(this);
