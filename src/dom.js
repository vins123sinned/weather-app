import { locationData } from "./api.js";
import { format, parseISO } from 'date-fns';

export function showInitialLocation() {
    const weatherObject = document.querySelector('.weather-icon');

    populateDateHeading();
    setWeatherIcon(weatherObject, locationData.currentDay.icon);
    populateOverview();
    populateForecast();
}

function populateDateHeading() {
    const dateHeading = document.querySelector('.date');

    const fullLocation = `${locationData.currentDay.date} ${locationData.currentDay.datetime}`;
    const formattedDate = format(parseISO(fullLocation), 'cccc, h:00 a');
    
    dateHeading.textContent = formattedDate;
}

async function setWeatherIcon(weatherObject, icon) {
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

function populateForecast() {
    const forecastContainer = document.querySelector('.forecast-container');
    
    for (const day of locationData.forecast) {
        const dayContainer = document.createElement('div');
        const dayHeading = document.createElement('h3');
        const dayIcon = document.createElement('object');
        const temperatureContainer = document.createElement('div');
        const maxTemp = document.createElement('p');
        const minTemp = document.createElement('p');

        dayContainer.classList.add('day-container');
        dayHeading.classList.add('day-heading');
        dayIcon.classList.add('day-icon');
        temperatureContainer.classList.add('day-temperatures');
        minTemp.classList.add('min-temp');

        const formatDay = format(parseISO(day.date), 'cccc');
        dayHeading.textContent = formatDay;

        setWeatherIcon(dayIcon, day.icon);
        
        maxTemp.textContent = `${day.maxTemp}°`;
        minTemp.textContent = `${day.minTemp}°`;

        temperatureContainer.appendChild(maxTemp);
        temperatureContainer.appendChild(minTemp);
        dayContainer.appendChild(dayHeading);
        dayContainer.appendChild(dayIcon);
        dayContainer.appendChild(temperatureContainer);
        forecastContainer.appendChild(dayContainer);
    }
}

// do switching between F and C next!
// could also do refresh button (refreshing in general);