import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryUl = document.querySelector('.country-list');
const countryDiv = document.querySelector('.country-info');

const getInfoCountry = (countrys) => {
countryUl.innerHTML = '';
                    countryDiv.innerHTML = `${countrys.map(country => { 
                        const arrayLanguages = [].concat(Object.values(country.languages)); 
                         
                            return `<ul><li class = 'country finded'><img src=${country.flags.svg} width=''>${country.name.official}</li>
              <li class = 'country finded'><b>Capital:</b> ${country.capital}</li>
              <li class = 'country finded'><b>Population:</b> ${country.population}</li>
              <li class = 'country finded'><b>Languages:</b> ${arrayLanguages.join(', ')}</li></ul>`})}`
};

const putInputForCountry = debounce(
    (e) => {
   if (e.target.value.trim() != '') {

            fetchCountries(e.target.value.trim()).then(countrys => {
               let countryList = countrys.map(country => {
                    return `<li class = 'country'><img src=${country.flags.svg} width=''>${country.name.official}</li>`
               });
                
                if (countryList.length <= 10 && countryList.length >= 2)
                {
                    countryDiv.innerHTML = '';
                    countryUl.innerHTML = `${countryList.join('')}`;
                }

                else if (countryList.length > 10) {
                    countryUl.innerHTML = '';
                    Notify.info('Too many matches found. Please enter a more specific name.');
                }
    
                else {
                
                getInfoCountry(countrys)
                    
              }}).catch(error => Notify.failure(`${error}`));
           }
                  
   else {
           countryUl.innerHTML = '';
           countryDiv.innerHTML = ''; 
        }
          
 }, DEBOUNCE_DELAY);

searchInput.addEventListener('input', putInputForCountry);