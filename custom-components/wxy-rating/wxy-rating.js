(function() {
  Polymer({
    is: 'wxy-rating',
    properties: {
      icon: String,
      count: {
        type: Number,
        observer: 'countChanged'
      }
    },
    countChanged: function() {
      var _i, _ref, _results;
      this.fillArray = (function() {
        _results = [];
        for (var _i = 0, _ref = this.count; 0 <= _ref ? _i < _ref : _i > _ref; 0 <= _ref ? _i++ : _i--){ _results.push(_i); }
        return _results;
      }).apply(this).map(function(index) {
        return {
          index: index
        };
      });
    }
  });

}).call(this);
