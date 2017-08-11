function initMap(mapDiv) {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(mapDiv, {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}

export default initMap;
