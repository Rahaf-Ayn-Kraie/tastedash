'use strict';

import * as utils from "./utils.js";

const trackMe = utils.select('.track-btn');
const serchbtn = utils.select('.search-here');
const input = utils.select('.location');
const modal = utils.select('.modal');
const loginBtn = utils.select(".header-btn");
const closeBtn = utils.select(".close");
const login = utils.select('.login-btn');
const emailInput = utils.select('.input-1');
const password = utils.select('.input-2');


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

    
    if (userLocation) { 
        map.flyTo({
            center: [userLocation.longitude, userLocation.latitude],
            essential: true 
        });
        if (marker) { 
            marker.remove(); 
        } 
        marker = new mapboxgl.Marker({ 
            color: "#de9c5b", 
        })
        .setLngLat([longitude, latitude]) 
        .addTo(map); 
    } else { 
        map.setCenter([longitude, latitude]); 
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

showMap(defaultLocation);

utils.listen('click', serchbtn, () => {
    input.value = '';
});

utils.listen('click', loginBtn, () => {
    modal.style.display = "block";
});

utils.listen('click', closeBtn, () => {
    modal.style.display = "none";
});


utils.listen('click', login, (event) => {
    event.preventDefault();
    if(emailInput.value.length && password.value.length > 0){
        modal.style.display = 'none';
    }else {
        emailInput.style.borderColor = "#f00";
        password.style.borderColor = "#f00";
    }
});
