Polymer
  is: 'wxy-rating'

  properties:
    icon: String

    count:
      type: Number
      observer: 'countChanged'

  countChanged: ->
    @fillArray = [0...@count].map (index) -> index: index
    return
