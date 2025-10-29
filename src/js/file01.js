"use strict";

import { fetchProducts, fetchCategories } from "/src/js/functions.js";

/**
 * Muestra un mensaje tipo "toast" si existe el elemento con id "toast-interactive" en el DOM.
 *
 * @function showToast
 * @returns {void}
 */

const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

(() => {
    showToast();
})();

/**
 * Agrega un evento al elemento con id "demo" para abrir un video en YouTube al hacer clic.
 *
 * @function showVideo
 * @returns {void}
 */

const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

(() => {
    showToast();
    showVideo();
    renderProducts();
    renderCategories();
})();

/**
 * Renderiza una lista de productos obtenidos desde una API y los muestra en el contenedor con id "products-container".
 *
 * @async
 * @function renderProducts
 * @returns {Promise<void>}
 * No retorna ningún valor, pero actualiza el contenido HTML de la página.
 */

function renderProducts() {
    fetchProducts("https://data-dawm.github.io/datum/reseller/products.json")
    .then(result => {
        console.log(result);
        if (result.success == true) {
            let container = document.getElementById("products-container");
            container.innerHTML = "";
            let products = result.body.slice(0, 6);
            products.forEach( product => {
                let productHTML = `
                <div class="space-y-4 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
                    <img
                        class="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded-lg object-cover transition-transform duration-300 hover:scale-[1.03]"
                        src="[PRODUCT.IMGURL]" alt="[PRODUCT.TITLE]">
                    <h3
                        class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-black-600 dark:hover:text-white-400">
                        $[PRODUCT.PRICE]
                    </h3>
                    <div class="text-sm text-gray-700 dark:text-gray-300">[PRODUCT.TITLE]</div>
                    <div class="space-y-2">
                        <a href="[PRODUCT.PRODUCTURL]" target="_blank" rel="noopener noreferrer"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                            font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600
                            dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full inline-block">
                            Ver en Amazon
                        </a>
                        <div class="hidden">[PRODUCT.CATEGORY_ID]</div>
                    </div>
                </div>`;
                productHTML = productHTML.replaceAll("[PRODUCT.TITLE]", product.title.length > 20 ? product.title.substring(0, 20) + "..." : product.title);
                productHTML = productHTML.replaceAll("[PRODUCT.IMGURL]", product.imgUrl);
                productHTML = productHTML.replaceAll("[PRODUCT.PRICE]", product.price);
                productHTML = productHTML.replaceAll("[PRODUCT.PRODUCTURL]", product.productURL);
                productHTML = productHTML.replaceAll("[PRODUCT.CATEGORY_ID]", product.category_id);
                container.innerHTML += productHTML;
            });
        }else {
            window.alert("Error al cargar los productos: " + result.body);
        }
    })
}

/**
 * Renderiza una lista de categorías obtenidas desde un archivo XML
 * y las muestra en el elemento <select> con id "categories".
 *
 * @async
 * @function renderCategories
 * @returns {Promise<void>}
 * No retorna ningún valor, pero actualiza las opciones del elemento <select> con las categorías.
 */

async function renderCategories() {
    try{
        let result = await fetchCategories('https://data-dawm.github.io/datum/reseller/categories.xml');
        if(result.success == true){
            let container = document.getElementById("categories");
            container.innerHTML = `<option selected disabled>Seleccione una categoría</option>`;
            let categoriesXML = result.body;
            let categories = categoriesXML.getElementsByTagName("category");
            for(let category of categories){
                let categoryHTML = `<option value="[ID]">[NAME]</option>`;
                let id = category.getElementsByTagName("id")[0].textContent;
                let name = category.getElementsByTagName("name")[0].textContent;
                categoryHTML = categoryHTML.replaceAll("[ID]", id);
                categoryHTML = categoryHTML.replaceAll("[NAME]", name);
                container.innerHTML += categoryHTML;
            }
        }
    }catch(error){
        window.alert("Error al cargar las categorías: " + error.message);
    }
}

export { renderProducts, renderCategories }