/*
THE GLOBAL APP CONTROLLER
*/
import axios from 'axios';
import SearchCountry from './Models/SearchCountry';
import SearchRegion from './Models/SearchRegion';
import { elements, renderLoader, clearLoader } from './Views/base';
import * as allCountriesView from './Views/allCountriesView';
import * as searchCountryView from './Views/searchCountryView';
import * as searchRegionView from './Views/searchRegionView';

/*
GLOBAL STATE
*/
const state = {}

//CONTROLLER TO LOAD ALL COUNTRIES ON LOAD OF THE PAGE
const controlAll = async () => {
    try {
        const res = await axios(`https://restcountries.com/v3.1/all`);
        if (res.status === 200) {
            state.countries = {
                result: res.data
            }
            return res.data;
        } else {
            throw new Error('Request failed');
        }  
    } catch(err) {
        console.log('Something happened');
    }
}

const loadAll = async () => {
    allCountriesView.clearResults();
    // Render the loader
    renderLoader(elements.resContainer);

    try {
        //Recieve the countries data
        const data = await controlAll();
        console.log(data);
        
        // Clear the loader
        clearLoader();

        //Render the results on the UI
        allCountriesView.renderResults(data);
    } catch(error) {
        console.log('UI failed');
    }
}

/**
 * CONTROLLER FOR THE SEARCH FUNCTIONALITY
 */

const controlSearch = async () => {
    //1. Get the query from the UI
    const query = searchCountryView.getSearchInput();
    
    if (query) {
        //2. New Search Object and add it to state
        state.countries = new SearchCountry(query);

        //3. Prepare the UI for results
        searchCountryView.clearInput();
        allCountriesView.clearResults();
        renderLoader(elements.resContainer);

        try {
            await state.countries.getResults();

            clearLoader();
            //4. Render the results
            allCountriesView.renderResults(state.countries.result);
        } catch (err) {
            console.log(err);
        }
    }   
}

/**
 * CONTROLLER FOR THE REGION FUNCTIONALITY
 */

const controlRegion = async () => {
    //1. Get query from the UI
    const query = searchRegionView.getRegionInput();

    if (query) {
        //2. Add the region object to state
        state.countries = new SearchRegion(query);

        //3. Prepare the UI for results
        allCountriesView.clearResults();
        renderLoader(elements.resContainer);

        try {
            await state.countries.getResults();

            clearLoader();
            //4. Render the results
            allCountriesView.renderResults(state.countries.result);
        } catch (err) {
            console.log(err);
        }
    }
}
console.log(state);
/**
 * EVENT LISTENERS
 */

// Event listeners to load all the countries
window.addEventListener('load', loadAll);
elements.allCountries.addEventListener('click', loadAll);

// Event listener for the pagination buttons
elements.pagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn--inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.page);
        const selectedBtn = document.querySelector(`[data-page='${goToPage}']`);
        scroll();
        selectedBtn.classList.add('purple');
        console.log(selectedBtn);
        allCountriesView.clearResults();
        allCountriesView.renderResults(state.countries.result, goToPage);
    }
})

// Event listener for the search 
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// Event listener for the region
elements.dropdwnVal.addEventListener('change', controlRegion); 