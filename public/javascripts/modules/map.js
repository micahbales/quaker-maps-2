function initMap(mapDiv) {
  var map = new google.maps.Map(mapDiv, {
    zoom: 4,
    center: {lat: 39.8283, lng: -98.5795}
  });
  var marker = new google.maps.Marker({
    position: {lat: 39.8283, lng: -98.5795},
    map: map
  });
}

export default initMap;
