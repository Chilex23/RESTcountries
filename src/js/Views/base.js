export const elements = {
    resContainer: document.querySelector('.results'),
    resultsList: document.querySelector('.results__list'),
    pagination: document.querySelector('.pagination'),
    searchVal: document.querySelector('.header__search'),
    searchForm: document.querySelector('.header__form'),
    dropdwnVal: document.querySelector('.header__region-dropdwn'),
    allCountries: document.querySelector('.all'),
    back: document.querySelector('.back')
}

export const elementStrings = {
    loader: 'spinner'
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-spinner2"></use>
            </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};