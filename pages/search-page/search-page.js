(function() {
  var location, places, search;

  places = null;

  search = null;

  location = null;

  Polymer({
    is: 'search-page',
    properties: {
      narrow: {
        type: Boolean,
        value: true
      },
      searchValue: String,
      locationValue: String,
      places: Object,
      errorMessage: {
        type: String,
        value: ""
      }
    },
    attached: function() {
      this.places = places;
      this.locationValue = this.location = location;
      this.searchValue = this.search = search;
    },
    handleSearchChanged: function(e, detail) {
      var queryPromise;
      search = detail.value;
      if (!search) {
        return;
      }
      queryPromise = this.$.places.textSearch(search);
      queryPromise.then((function(_this) {
        return function(result) {
          places = _this.places = result;
          _this.errorMessage = "";
        };
      })(this), (function(_this) {
        return function(error) {
          var _ref;
          _this.places = [];
          _this.errorMessage = "Error: " + error.status + " " + (((_ref = error.error) != null ? _ref.message : void 0) || '');
        };
      })(this));
    },
    handleLocationChanged: function(e, detail) {
      var promise;
      location = detail.value;
      if (!location) {
        return;
      }
      promise = this.$.places.setLocation(location);
      promise.then((function(_this) {
        return function() {
          _this.handleSearchChanged(e, {
            value: search
          });
        };
      })(this));
    },
    handleClearSearch: function(e) {
      e.stopPropagation();
      this.searchValue = "";
      this.search = "";
    },
    handlePlaceSelect: function(e, detail) {
      var item;
      item = e.currentTarget._templateInstance._data.item;
      if (this.mobile) {
        this.router.go("/place/" + item.place_id);
      } else {
        this.$.drawer.scroller.scrollTop = 0;
        this.placeName = item.name;
        this.placeId = item.place_id;
        this.narrow = false;
      }
    },
    handleCloseDrawerTap: function(e, detail) {
      this.narrow = true;
      this.$.panel.closeDrawer();
      this.$.panel.selected = "main";
    }
  });

}).call(this);
