import { elements } from "./base";

export const getSearchInput = () => elements.searchVal.value;

export const clearInput = () => {
    elements.searchVal.value = '';
}