import axios from 'axios';
import { $ } from './bling';

const mapOptions = {
  zoom: 4,
  center: {lat: 39.8283, lng: -98.5795},
  maxZoom: 16
}

function loadPlaces(map) {
  axios.get('/api/v1/meetings')
  .then(res => {
    // load array of meeting data from all records in DB
    const meetings = res.data;
    meetings.forEach(meeting => {
      var marker = new google.maps.Marker({
        position: { lat: meeting.location.coordinates[1], lng: meeting.location.coordinates[0] }, // {lat: 39.8283, lng: -98.5795}
        map: map
      });
    })
  });
};



function makeMap(mapDiv) {
  if (!mapDiv) return;
  var map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
}

export default makeMap;
