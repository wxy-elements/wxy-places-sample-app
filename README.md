Google Places Search
Helen Wu

To Run

- Can run with a http static server (python -m http.server)

Application Description

- Contains a query and location input to search for places
- Search triggers on blur/enter (there's a search button but its a pseudo ui element)
- If geolocation is supported, it will default to the user's location
- Clicking an item shows its details
- UI is responsive

Implementation

- Uses Polymer, CoffeeScript
- Items in components are from bower
- I wrote the items in custom-components, pages, main directory for this sample

General things I would do I had more time

- Error UI / better error handling
- UI for loading
- Unit tests
- Vulcanize/minify everything
