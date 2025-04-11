import { locationData } from "./api.js";
import { format, parseISO } from 'date-fns';

export function showInitialLocation() {
    populateDateHeading();
    setWeatherIcon(locationData.currentDay.icon);
    populateOverview();
}

function populateDateHeading() {
    const dateHeading = document.querySelector('.date');

    const fullLocation = `${locationData.currentDay.date} ${locationData.currentDay.datetime}`;
    const formattedDate = format(parseISO(fullLocation), 'cccc, h:00 a');
    
    dateHeading.textContent = formattedDate;
}

async function setWeatherIcon(icon) {
    const weatherObject = document.querySelector('.weather-icon');
    const svgUrl = await import(`./assets/${icon}.svg`);
    weatherObject.data = svgUrl.default;
}

function populateOverview() {
    const city = document.querySelector('.city');
    const country = document.querySelector('.country');
    const currentTemperature = document.querySelector('.current-temperature');

    const splitLocation = locationData.currentDay.resolvedAddress.split(', ');
    
    city.textContent = splitLocation[0];
    country.textContent = splitLocation[splitLocation.length - 1];
    currentTemperature.textContent = `${locationData.currentDay.temp}° ${locationData.currentDay.conditions}`;
}