import { locationData } from "./api.js";
import { format, parseISO } from 'date-fns';

export function displayLocationData() {
    const weatherObject = document.querySelector('.weather-icon');
    const forecast = document.querySelector('.forecast');

    // if there is existing forecast, clear it first
    if (forecast.innerHTML) forecast.replaceChildren();

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
    currentTemperature.textContent = `${formatTemperature(locationData.currentDay.temp)} ${locationData.currentDay.conditions}`;
}

function populateForecast() {
    const forecastContainer = document.querySelector('.forecast');
    
    for (const day of locationData.forecast) {
        const dayContainer = document.createElement('div');
        const dayHeading = document.createElement('h3');
        const dayIcon = document.createElement('object');
        const temperatureContainer = document.createElement('div');
        const maxTemp = document.createElement('p');
        const minTemp = document.createElement('p');

        dayContainer.dataset.date = day.date;
        dayContainer.classList.add('day-container');
        dayHeading.classList.add('day-heading');
        dayIcon.classList.add('day-icon');
        temperatureContainer.classList.add('day-temperatures');
        maxTemp.classList.add('max-temp');
        minTemp.classList.add('min-temp');

        const formatDay = format(parseISO(day.date), 'cccc');
        dayHeading.textContent = formatDay;

        setWeatherIcon(dayIcon, day.icon);
        
        maxTemp.textContent = formatTemperature(day.maxTemp);
        minTemp.textContent = formatTemperature(day.minTemp);

        temperatureContainer.appendChild(maxTemp);
        temperatureContainer.appendChild(minTemp);
        dayContainer.appendChild(dayHeading);
        dayContainer.appendChild(dayIcon);
        dayContainer.appendChild(temperatureContainer);
        forecastContainer.appendChild(dayContainer);
    }
}

function formatTemperature(temperature) {
    if (localStorage.getItem('temperatureMode') === 'Celsius') {
        const celsius = (temperature - 32) * 5/9;
        return `${Math.round(celsius)}°`;
    } else {
        return `${Math.round(temperature)}°`;
    }
}

export function changeTemperatureText() {
    const currentTemperature = document.querySelector('.current-temperature');
    
    currentTemperature.textContent = `${formatTemperature(locationData.currentDay.temp)} ${locationData.currentDay.conditions}`;
    for (const day of locationData.forecast) {
        const dayContainer = document.querySelector(`[data-date='${day.date}']`);
        const maxTemp = dayContainer.querySelector('.max-temp');
        const minTemp = dayContainer.querySelector('.min-temp');

        maxTemp.textContent = formatTemperature(day.maxTemp);
        minTemp.textContent = formatTemperature(day.minTemp);
    }
}

export function createLoadingElement() {
    const searchIcon = document.querySelector('.search-icon');
    const loadingElement = document.createElement('div');

    loadingElement.classList.add('loader');
    searchIcon.replaceWith(loadingElement);
}

export function removeLoadingElement() {
    const searchIcon = document.createElement('span');
    const loadingElement = document.querySelector('.loader');

    searchIcon.classList.add('material-symbols-outlined', 'search-icon');
    searchIcon.textContent = 'search';
    loadingElement.replaceWith(searchIcon);
}