import { displayLocationData } from "./dom.js";

export let locationData;

(async function initializeLocationData() {
    const data = localStorage.getItem('locationData');
    
    if (!data) {
        await setLocationData('las-vegas');
    } else {
        await setLocationVar();
    }

    displayLocationData();
})();

export async function setLocationData(locationName) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}/next7days?key=G5YF7NL3UB3T5NVFAGGZH9GMN`, {mode: 'cors'});
    const location = await response.json();
    const days = [];

    // Since location.days include the first day which we don't want
    // we slice it to remove it from our loop
    for (const day of location.days.slice(1)) {
        days.push({
            date: day.datetime,
            icon: day.icon,
            conditions: day.conditions,
            maxTemp: day.tempmax,
            minTemp: day.tempmin,
        });
    }

    localStorage.setItem(
        'locationData', 
        JSON.stringify({
            currentDay: {
                date: location.days[0].datetime,
                resolvedAddress: location.resolvedAddress,
                icon: location.currentConditions.icon,
                conditions: location.currentConditions.conditions,
                datetime: location.currentConditions.datetime,
                temp: location.currentConditions.temp,
            },
            forecast: days,
            latitude: location.latitude,
            longitude: location.longitude,
        })
    );
    
    setLocationVar();
}

async function setLocationVar() {
    const data = localStorage.getItem('locationData');
    // awaiting here fixes the bug of locationData being 
    // undefined when displayLocationData is invoked!
    locationData = await JSON.parse(data);
}

