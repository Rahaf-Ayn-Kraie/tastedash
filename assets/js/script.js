'use strict';

import * as utils from "./utils.js";

const trackMe = utils.select('.track-btn');
const serchbtn = utils.select('.search-here');
const input = utils.select('.location');

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlbG1hLWRldiIsImEiOiJjbGJncnJqc2wwaXhjM29xd2liMXYzbmE4In0.c2LzFGTr8v0YUQlSfSe3mQ';

const defaultLocation = {
    latitude: 51.5074,
    longitude: -0.1278
}

let userLocation = null;
let marker = null;

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [defaultLocation.longitude, defaultLocation.latitude],
    zoom: 14
});

function getLocation(position) {
    let { latitude, longitude } = position.coords; 
    userLocation = { latitude, longitude };
    showMap(userLocation);
}

function errorHandler() {
    console.log('Unable to retrieve your location');
}

const accuracy = {
    enableHeightAccuracy: true
}

function showMap(position) {
    const { latitude, longitude } = position;

    map.flyTo({
        center: [userLocation.longitude, userLocation.latitude],
        essential: true 
    });

    if (userLocation) { 
        if (marker) { 
            marker.remove(); 
        } 
        marker = new mapboxgl.Marker({ 
            color: "#de9c5b", 
        }).setLngLat([longitude, latitude]) 
          .addTo(map); 
    }
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

utils.listen('click', serchbtn, () => {
    input.value = '';
});

showMap(defaultLocation);