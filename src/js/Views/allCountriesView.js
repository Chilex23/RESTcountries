import { elements } from "./base";

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
    elements.pagination.innerHTML = '';
}

const formatPopulation = num => {
    let value = (num).toLocaleString(
        undefined,
        { minimumFractionDigits: 0 }
    );
    return value;
}

const sortCountries = countries => {
    countries.sort((obj1, obj2) => {
        if (obj1.name.common > obj2.name.common) {
            return 1;   
        } else if (obj1.name.common < obj2.name.common) {
            return -1;
        } else {
            return 0;
        }
    })
};

export const renderCountry = country => {
    const markup = `
        <div class="results__card">
            <figure class="results__card-img">
                <img src="${country.flags.svg}" alt="${country.name.common} Flag">
            </figure>
            <div class="results__card-deets">
                <span>
                    <svg class="results__icon">
                        <use href="img/icons.svg#icon-arrow-right2"></use>
                    </svg>
                    Name: ${country.name.common}
                </span>
                <span>
                    <svg class="results__icon">
                        <use href="img/icons.svg#icon-location2"></use>
                    </svg>
                    Capital: ${country.capital !== undefined ? country.capital[0] : 'No Capital' }
                </span>
                <span>
                    <svg class="results__icon">
                        <use href="img/icons.svg#icon-map2"></use>
                    </svg>
                    Region: ${country.subregion !== undefined ? country.subregion : 'No Subregion' }
                </span>
                <span>
                    <svg class="results__icon">
                        <use href="img/icons.svg#icon-man-woman"></use>
                    </svg>
                    Population: ${formatPopulation(country.population)}
                </span>
            </div>
        </div>
    `;

    elements.resultsList.insertAdjacentHTML('beforeend', markup);
};

const createButtons = pageNo => `
    <button class="btn--inline" data-page="${pageNo}">
        <a href="#bd">
            <span>Page ${pageNo}</span>
        </a> 
    </button>
`;

export const renderButtons = (numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);

    let buttonMarkup = '';
    for (let i = 1; i <= pages; i++) {
        buttonMarkup += createButtons(i);
    }
    elements.pagination.insertAdjacentHTML('beforeend', buttonMarkup);
}

export const renderResults = (countries,  page = 1, resPerPage = 12) => {
    // Render the results of the current page
    let start = (page - 1) * resPerPage;
    let end = page * resPerPage;
    // Sort the countries according to alphabetical order.
    sortCountries(countries);
    countries.slice(start, end).forEach(renderCountry);

    // Render the pagination buttons
    renderButtons(countries.length, resPerPage);
}