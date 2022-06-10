export const fetchMapboxApi = (setterSearchResults, placeToSearch) => {
  fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${placeToSearch}.json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoiZGllc3Ryb2NvcnAiLCJhIjoiY2wxbmk5cHptMHVqajNianh2MW52c2U3MiJ9.a_02bq_H45ktO1czDGegGg`
  )
    .then((res) => res.json())
    .then((json) => {
      setterSearchResults(json.features);
    })
    .catch((e) => console.log('Error: ' + e));
};

export const selectSuggestion = (placeSetter, nameSetter, name, lon, lat) => {
  placeSetter({
    chosenName: name,
    chosenLon: lon,
    chosenLat: lat,
  });
  nameSetter(name);
};
