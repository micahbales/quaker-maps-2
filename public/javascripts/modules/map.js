import axios from 'axios';

const mapOptions = {
  // zoom: 10,
  // center: {lat: 39.8283, lng: -98.5795},
  // maxZoom: 16
}

function getUserCoordinates() {

  return new Promise((resolve, reject) => {

    navigator.geolocation.getCurrentPosition(
      ({"coords": {"latitude": lat, "longitude": lng} }) => {
        resolve({ lat, lng });
      }, error => reject(error));

  });
}

function loadPlaces(map, slug) {
  axios.get(`/api/v1/meetings/${slug ? slug : ''}`)
  .then(res => {
    // load array of meeting data from all records in DB
    const meetings = res.data;
    if (!meetings.length) {
      alert('no meetings found!');
      return;
    }
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
                      <p>${meeting.description}</p>
                      <p><strong>Address:</strong> ${meeting.location.address}, ${meeting.city}, ${meeting.state}, ${meeting.zip}</p>
                      <p><strong>Yearly Meeting:</strong> ${meeting.yearlymeeting}</p>
                      <p><strong>Branch:</strong> ${meeting.branch}</p>
                      <p><strong>Worship Style:</strong> ${meeting.worshipstyle}</p>`;

      marker.addListener('click', () => {
        infoWindow.setContent(contentString);
        infoWindow.open(map, marker);
      })

      bounds.extend(meetingLocation);
    });

    map.fitBounds(bounds);

    /* If this is not a single-state map, we will center
       the map on the user's geolocation, if provided */
    if (!slug) {
      getUserCoordinates()
        .then(coords => {
          try {                     
            let lat = coords.lat,
                lng = coords.lng;

            // set user location as new center of the map
            map.panTo(new google.maps.LatLng(lat, lng));

            /*
               set zoom at a regional level
               (this could probably be done
               in a more dynamic, contextual way)
            */
            map.setZoom(9);

          } catch (err) {
            console.error(err);
          }

        },
        reason => { console.log(reason) });
    }
  });
};

function makeMap(mapDiv) {
  if (!mapDiv) return;

  const map = new google.maps.Map(mapDiv, mapOptions);

  /* if we're looking at a particular meeting, get its slug
     so that we can display just that one meeting
     otherwise, it will be null */
  const pathname = window.location.pathname;
  const slug = pathname.slice(10);
  loadPlaces(map, slug);

  /* check and make sure the zoom level isn't too tight
     if it is, make it wider */
  let listener = google.maps.event.addListener(map, "idle", function() {
    if (map.getZoom() > 14) map.setZoom(14);
    google.maps.event.removeListener(listener);
  });
}

export default makeMap;
