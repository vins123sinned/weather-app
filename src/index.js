import './switch.css';
import './styles.css';
import { currentLocationData, getLocationData } from "./api.js";
import './dom.js';

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

    const location = searchInput.value.replace(pruneRegExp, '$1').replace(invalidRegExp, '');

    try {
        await getLocationData(location);
        console.log(currentLocationData);
    } catch (error) {
        console.log('Error: ' + error);
    }
}