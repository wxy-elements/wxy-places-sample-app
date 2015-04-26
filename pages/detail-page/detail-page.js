(function() {
  Polymer({
    is: 'detail-page',
    properties: {
      placeId: String
    },
    handleBackTap: function() {
      this.router.go('/');
    }
  });

}).call(this);
