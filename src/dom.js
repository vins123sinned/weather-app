import { locationData } from "./api.js";
import { format, parseISO } from 'date-fns';

export function showInitialLocation() {
    populateDateHeading();
    setWeatherIcon(locationData.currentDay.icon);
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