import { currentLocationData, getLocationData } from "./api.js";

(function searchListener() {
    const searchInput = document.querySelector('#search');

    searchInput.addEventListener('keydown', (event) => {
        const acceptableRegExp = /^[a-zA-ZÀ-ÿ .'-]$/;

        if (!acceptableRegExp.test(event.key)) return event.preventDefault();

        console.log(event.key);
    });

    searchInput.addEventListener('keyup', (event) => {
        // keydown doesn't register enter key, but keyup will
        if (searchInput.value.length === 0) return;
        if (event.key === 'Enter') {
            const pruneRegExp = /([ .'-])\1+/g;
            const invalidRegExp = /[^a-zA-ZÀ-ÿ .'-]/g;

            const value = searchInput.value.replace(pruneRegExp, '$1').replace(invalidRegExp, '');
        }
    });
})();

getLocationData('las-vegas').then(() => {
    console.log(currentLocationData);
});
