export function getLocation(location) {
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=G5YF7NL3UB3T5NVFAGGZH9GMN`, {mode: 'cors'})
    .then((response) => {
        return response.json();
    })
    .then((response) => {
        console.log(response);
    });
}