import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries  } from './fetchCountries';
import { showCountryList, showCountryCard } from './template';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputSearch: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

 const { inputSearch, countryList, countryInfo } = refs;

inputSearch.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

const clearMarkAp = function () { 
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
   
}

function onSearch (e) {
    e.preventDefault();

let search = (e.target.value).trim();

if(!search) {
    
    clearMarkAp();
    return;
}
    
    
fetchCountries(search)
.then(countries => {
    // console.log(countries);
    if(countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
         clearMarkAp();
        return;
    }

    if(countries.length > 1  && countries.length <= 10) {
        const markup = countries.map(country => showCountryList(country))
         clearMarkAp();
    countryList.innerHTML = markup.join('');
   
    }

    if(countries.length === 1) {
        const cardMarcup = countries.map(country => showCountryCard(country));
        clearMarkAp();
        countryInfo.innerHTML = cardMarcup.join('');
    }
})
    
.catch(error => {
    Notify.failure('УПС ЗБІГІВ НЕМАЄ )))');
 clearMarkAp();
    return error;
})
}