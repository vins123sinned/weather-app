export let currentLocationData;

export function getLocationData(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}/next7days?key=G5YF7NL3UB3T5NVFAGGZH9GMN`, {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response);
        console.log(response.days[0].datetime);
        console.log(response.resolvedAddress);
        console.log(response.currentConditions.conditions);
        console.log(response.currentConditions.datetime);
        console.log(response.currentConditions.temp);

        //Loop over next seven days and get:
        //console.log(response.days[i].datetime);
        console.log(response.currentConditions.conditions);
        console.log(response.currentConditions.tempmax);
        console.log(response.currentConditions.tempmin);
    });
}