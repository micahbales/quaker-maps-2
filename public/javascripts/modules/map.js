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
    // create bounds for map view
    const bounds = new google.maps.LatLngBounds();
    // create infoWindow to be dynamically populated onclick
    let infoWindow = new google.maps.InfoWindow;


    meetings.forEach(meeting => {
      let meetingLocation = {
        lat: meeting.location.coordinates[1],
        lng: meeting.location.coordinates[0]
      }

      const marker = new google.maps.Marker({
        position: meetingLocation,
        map: map
      });

      let contentString = `<h1><a href="/meetings/${meeting.slug}">${meeting.name}</a></h1>
                      <p>${meeting.description}</p>`;

      marker.addListener('click', () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      })

      bounds.extend(meetingLocation);
    });

    map.fitBounds(bounds)
  });
};



function makeMap(mapDiv) {
  if (!mapDiv) return;
  const map = new google.maps.Map(mapDiv, mapOptions);
  loadPlaces(map);
}

export default makeMap;
