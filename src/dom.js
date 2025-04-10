(function checkTemperatureMode() {
    const mode = localStorage.getItem('temperatureMode');
    
    if (!mode) return localStorage.setItem('temperatureMode', 'Fahrenheit');
})();

(function setTemperatureMode() {
    const mode = localStorage.getItem('temperatureMode');
    const temperatureCheckbox = document.querySelector('.temperature-checkbox');

    temperatureCheckbox.checked = (mode === 'Fahrenheit') ? false : true;

    const modePara = document.querySelector(`.${mode.toLowerCase()}`);
    modePara.classList.add('current-mode');
})();

(function switchListener() {
    const temperatureCheckbox = document.querySelector('.temperature-checkbox');
    
    temperatureCheckbox.addEventListener('click', () => {
        const currentMode = document.querySelector('.current-mode');
        
        currentMode.classList.remove('current-mode');
        changeTemperatureMode();
        updateCurrentMode();
    });
})();

function changeTemperatureMode() {
    const temperatureCheckbox = document.querySelector('.temperature-checkbox');

    const newMode = (temperatureCheckbox.checked) ? 'Celsius' : 'Fahrenheit';

    localStorage.setItem('temperatureMode', newMode);
}

function updateCurrentMode() {
    const mode = localStorage.getItem('temperatureMode');

    document.querySelector(`.${mode.toLowerCase()}`).classList.add('current-mode');
}