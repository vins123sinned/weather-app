import './switch.css';
import './styles.css';
import './switch.js';
import { setLocationData } from "./api.js";
import { showInitialLocation } from './dom.js';

(function searchListener() {
    const searchInput = document.querySelector('#search');
    const searchIcon = document.querySelector('.search-icon');

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Backspace') return;

        const acceptableRegExp = /^[a-zA-ZÀ-ÿ .'-]$/;
        
        if (event.key === 'Enter') {
            if (searchInput.value.length === 0) return;

            updateWeather(event, searchInput);
        } else if (!acceptableRegExp.test(event.key)) {
            event.preventDefault()
        };
    });

    searchIcon.addEventListener('click', (event) => {
        if (searchInput.value.length === 0) return;

        updateWeather(event, searchInput);
    });
})();

async function updateWeather(event, searchInput) {
    event.preventDefault();
    
    const pruneRegExp = /([ .'-])\1+/g;
    const invalidRegExp = /[^a-zA-ZÀ-ÿ .'-]/g;

    const locationName = searchInput.value.replace(pruneRegExp, '$1').replace(invalidRegExp, '');

    try {
        await setLocationData(locationName);
    } catch (error) {
        console.log('Error: ' + error);
    }
}

showInitialLocation();