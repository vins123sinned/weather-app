export let currentLocationData;

export async function getLocationData(location) {
    const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=G5YF7NL3UB3T5NVFAGGZH9GMN`, {mode: 'cors'});
    const locationData = await response.json();
    
    setLocationData(locationData);
}

function setLocationData(location) {
    const days = [];
    // Since location.days include the first day which we don't want
    // we slice it to remove it from our loop
    for (const day of location.days.slice(1)) {
        days.push({
            date: day.datetime,
            conditions: day.conditions,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
        });
    }

    currentLocationData = {
        currentDay: {
            date: location.days[0].datetime,
            resolvedAddress: location.resolvedAddress,
            conditions: location.currentConditions.conditions,
            datetime: location.currentConditions.datetime,
            temp: location.currentConditions.temp,
        },
        forecast: days,
    };
}