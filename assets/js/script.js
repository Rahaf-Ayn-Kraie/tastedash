'use strict';

import * as utils from "./utils.js";

const trackMe = utils.select('.track-btn');

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbG1hLWRldiIsImEiOiJjbGJncnJqc2wwaXhjM29xd2liMXYzbmE4In0.c2LzFGTr8v0YUQlSfSe3mQ';

function getLocation(position) {
    let { latitude, longitude } = position.coords;

    console.log(
        `Latitude: ${latitude}\n` + 
        `Longitude: ${longitude}`
    );

    showMap(position);
    map.flyTo({
        center: [longitude, latitude],
        essential: true // This animation is considered essential with
        //respect to prefers-reduced-motion
    });
}

// The 'failure' callback function
function errorHandler() {
    console.log('Unable to retrieve your location');
}

const accuracy = {
    enableHeightAccuracy: true
}

utils.listen('click', trackMe, () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            getLocation, errorHandler, accuracy
        );
    } else {
        console.log('Geolocation is not supported by your browser');
    }

});

function showMap(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [longitude, latitude],
      zoom: 14
    });

    // Add marker for user's location
    new mapboxgl.Marker({
        color: "#de9c5b",
    }).setLngLat([longitude, latitude])
      .addTo(map);
}
