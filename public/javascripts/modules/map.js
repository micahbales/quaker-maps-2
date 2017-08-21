import axios from 'axios';
import { $ } from './bling';

const mapOptions = {
  zoom: 4,
  center: {lat: 39.8283, lng: -98.5795},
  maxZoom: 16
}

function loadPlaces(map) {
  var marker = new google.maps.Marker({
    position: {lat: 39.8283, lng: -98.5795},
    map: map
  });
};

function makeMap(mapDiv) {
  if (!mapDiv) return;
  var map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
}

export default makeMap;
