export let currentLocationData;

export function getLocationData(location) {
    return fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=G5YF7NL3UB3T5NVFAGGZH9GMN`, {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        setLocationData(response);
    });
}

function setLocationData(response) {
    const days = [];
    // Since response.days include the first day which we don't want
    // we slice it to remove it from our loop
    for (const day of response.days.slice(1)) {
        days.push({
            date: day.datetime,
            conditions: day.conditions,
            tempmax: day.tempmax,
            tempmin: day.tempmin,
        });
    }

    currentLocationData = {
        currentDay: {
            date: response.days[0].datetime,
            resolvedAddress: response.resolvedAddress,
            conditions: response.currentConditions.conditions,
            datetime: response.currentConditions.datetime,
            temp: response.currentConditions.temp,
        },
        forecast: days,
    };
}