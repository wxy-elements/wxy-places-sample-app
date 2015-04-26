libraryLoad = false
libraryLoaded = false
waiting = []
onPlacesLoad = ->
  libraryLoaded = true
  for item in waiting
    item.onMapReady()
  waiting = []
  return

Polymer
  is: 'wxy-google-places'

  properties:
    radius:
      type: Number
      value: 500

  ready: ->
    window.onPlacesLoad = onPlacesLoad
    if libraryLoaded
      @onMapReady()
    else
      waiting.push @

    return if libraryLoad

    libraryLoad = true
    script = document.createElement 'script'
    script.type = 'text/javascript'
    script.src = 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=onPlacesLoad'
    document.body.appendChild script
    return

  onMapReady: ->
    # Default
    location = new google.maps.LatLng -33.8665433, 151.1956316

    @map = new google.maps.Map @$.map,
      center: location
      zoom: 15
      mapTypeId: google.maps.MapTypeId.ROADMAP

    # If browser supports geolocation, then use it to get user's position.
    # Otherwise use maps default.
    if navigator.geolocation
      navigator.geolocation.getCurrentPosition (position) =>
        latitude = position.coords.latitude
        longitude = position.coords.longitude
        @map.setCenter new google.maps.LatLng latitude, longitude
        return

    @service = new google.maps.places.PlacesService @map
    @fire 'google-places-ready'
    return

  setLocation: (query) ->
    new Promise (resolve, reject) =>
      geocoder = new google.maps.Geocoder()
      geocoder.geocode address: query, (results, status) =>
        if status is google.maps.places.PlacesServiceStatus.OK and results.length > 0
          @map.setCenter results[0].geometry.location
          resolve results
        else
          reject
            status: status
            error: result

        return

  textSearch: (query) ->
    request =
      radius: @radius
      query: query
      location: @map.getCenter()

    new Promise (resolve, reject) =>
      @service.textSearch request, (results, status) =>
        if status is google.maps.places.PlacesServiceStatus.OK
          console.log results
          for result in results
            result.photo = result.photos?[0]?.getUrl
              maxHeight: 200
              maxWidth: 200
          resolve results
        else
          reject
            status: status
            error: result

        return

  getDetails: (id) ->
    request =
      placeId: id

    new Promise (resolve, reject) =>
      @service.getDetails request, (result, status) =>
        if status is google.maps.places.PlacesServiceStatus.OK
          resolve result
        else
          reject
            status: status
            error: result

        return
