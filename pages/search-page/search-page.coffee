places = null
search = null
location = null

Polymer
  is: 'search-page'

  properties:
    narrow:
      type: Boolean
      value: true

    searchValue: String

    locationValue: String

    places: Object

    errorMessage:
      type: String
      value: ""

  attached: ->
    @places = places
    @locationValue = @location = location
    @searchValue = @search = search
    return

  handleSearchChanged: (e, detail) ->
    search = detail.value
    return if not search
    queryPromise = @$.places.textSearch search
    queryPromise.then (result) =>
      places = @places = result
      @errorMessage = ""
      return
    , (error) =>
      @places = []
      @errorMessage = "Error: #{error.status} #{error.error?.message || ''}"
      return

    return

  handleLocationChanged: (e, detail) ->
    location = detail.value
    return if not location
    promise = @$.places.setLocation location
    promise.then =>
      @handleSearchChanged e, value: search
      return
    return

  handleClearSearch: (e) ->
    e.stopPropagation()
    @searchValue = ""
    @search = ""
    return

  handlePlaceSelect: (e, detail) ->
    item = e.currentTarget._templateInstance._data.item
    if @mobile
      @router.go "/place/#{item.place_id}"
    else
      @$.drawer.scroller.scrollTop = 0
      @placeName = item.name
      @placeId = item.place_id
      @narrow = false
    return

  handleCloseDrawerTap: (e, detail) ->
    @narrow = true
    @$.panel.closeDrawer()
    @$.panel.selected = "main"
    return
