Polymer
  is: 'wxy-google-place-detail'
  placesReady: false

  properties:
    placeId:
      type: String
      observer: 'placeIdChanged'

    detail:
      type: Object
      notify: true

  computeOpenNow: (open) -> if open then 'Open Now' else 'Closed'

  onReady: ->
    @placesReady = true
    @placeIdChanged()
    return

  placeIdChanged: ->
    return if not @placesReady or not @placeId
    placeDetailPromise = @$.places.getDetails @placeId
    placeDetailPromise.then (@detail) =>
      @photoIndex = 0
      @_SetCurrentPhoto()
      return
    , (error) =>
      @errorMessage = error.message
      return

  _SetCurrentPhoto: ->
    @currentPhoto = @detail.photos?[@photoIndex]?.getUrl
      maxWidth: 350
      maxHeight: 350
    return
