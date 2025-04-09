import { currentLocationData, getLocationData } from "./api.js";

getLocationData('las-vegas').then(() => {
    console.log(currentLocationData);
});
