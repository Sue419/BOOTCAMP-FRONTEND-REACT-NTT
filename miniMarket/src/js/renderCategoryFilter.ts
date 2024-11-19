import { Category } from "../types/category";

export function renderCategoryFilter(categories: Category[]): void  {
    const categoryFilter = document.querySelector('#category-filter') as HTMLSelectElement;

    while (categoryFilter.firstChild) {
        categoryFilter.removeChild(categoryFilter.firstChild);
    }

    // Op. predeterminada
    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.textContent = "Todas las categorías";
    categoryFilter.appendChild(defaultOption);

    //categorías
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.slug;
        option.textContent = category.name;
        categoryFilter.appendChild(option);
    });
}