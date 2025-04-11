export let locationData;

(function initializeLocationData() {
    const data = localStorage.getItem('locationData');
    
    if (!data) return setLocationData('las-vegas');

    setLocationVar();
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
        })
    );
    
    setLocationVar();
}

function setLocationVar() {
    const data = localStorage.getItem('locationData');
    locationData = JSON.parse(data);
}

