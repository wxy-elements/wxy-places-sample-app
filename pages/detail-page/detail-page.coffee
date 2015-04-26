Polymer
  is: 'detail-page'

  properties:
    placeId: String
    
  handleBackTap: ->
    @router.go '/'
    return
