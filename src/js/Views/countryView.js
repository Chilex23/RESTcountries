import { elements } from "./base"
import { formatPopulation } from "./allCountriesView";

export const countryDetails = country => {
    const markup = `
        <div class="country">
            <h1 class="country__header heading-1">${country.name.common}</h1>
            <div class="country__body">
                <div class="country__img-container">
                    <figure class="country__img">
                        <img src="${country.flags.svg}" alt="${country.name.common} Flag">
                    </figure>
                    <figure class="country__img">
                        <img src="${country.coatOfArms.svg}" alt="${country.name.common} coat of arms">
                    </figure>
                </div>
                <div class="country__details">
                    <div class="country__details-item">
                        <span>Offical Name:</span>
                        <span>${country.name.official}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Capital:</span>
                        <span>${country.capital}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Drive Side:</span>
                        <span>${country.car.side}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Landlocked:</span>
                        <span>${country.landlocked}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Population:</span>
                        <span>${formatPopulation(country.population)}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Continent:</span>
                        <span>${country.region}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Sub-Region:</span>
                        <span>${country.subregion}</span>
                    </div>
                    <div class="country__details-item">
                        <span>Top-Level Domain:</span>
                        <span>${country.tld}</span>
                    </div>
                    <div class="country__details-item">
                        <span>TimeZones:</span>
                        ${country.timezones.map((el) => `<span>${el}</span>`)}
                    </div>
                </div>
            </div>
            <button class="back btn--inline">Go back</button>
        </div>
    `;
    elements.resultsList.insertAdjacentHTML('beforeend', markup);
}