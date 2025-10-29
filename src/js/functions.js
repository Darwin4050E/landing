"use strict";

/**
 * Realiza una solicitud HTTP para obtener productos en formato JSON desde una URL dada.
 *
 * @async
 * @function fetchProducts
 * @param {string} url - URL del recurso JSON que contiene los productos.
 * @returns {Promise<{success: boolean, body: Object[] | string}>} 
 * Un objeto que indica si la solicitud fue exitosa (`success: true`) junto con el cuerpo (`body`) que contiene los datos obtenidos.
 * Si ocurre un error, devuelve `success: false` y `body` con el mensaje de error.
 *
 * @example
 * fetchProducts("https://data-dawm.github.io/datum/reseller/products.json")
 *  .then(result => {
 *      if (result.success) {
 *          console.log(result.body); // Lista de productos
 *      } else {
 *          console.error(result.body); // Mensaje de error
 *      }
 *  });
 */

let fetchProducts = (url) => {
    return fetch(url)
        .then(response => {
            // Verificar si la respuesta no es exitosa
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Respuesta exitosa
            return {
                success: true,
                body: data
            }
        })
        .catch(error => {
            // Error en la solicitud
            return {
                success: false,
                body: error.message
            };
        });
}

/**
 * Obtiene un documento XML con las categorías de productos desde una URL dada
 * y lo convierte en un objeto DOM para su posterior análisis.
 *
 * @async
 * @function fetchCategories
 * @param {string} url - URL del archivo XML que contiene las categorías.
 * @returns {Promise<{success: boolean, body: Document | string}>}
 * Un objeto con `success: true` y `body` conteniendo el documento XML si la carga fue exitosa.
 * En caso de error, devuelve `success: false` con el mensaje de error en `body`.
 *
 * @example
 * fetchCategories("https://data-dawm.github.io/datum/reseller/categories.xml")
 *  .then(result => {
 *      if (result.success) {
 *          console.log(result.body.getElementsByTagName("category"));
 *      }
 *  });
 */

let fetchCategories = async (url) => {
    try{
        let response = await fetch(url);
        if(!response.ok){
            throw new Error(`Error HTTP: ${response.status}`);
        }
        let text = await response.text();
        const parser = new DOMParser();
        let data = parser.parseFromString(text, "application/xml");
        return {
            success: true,
            body: data
        }
    }catch(error){
        return {
            success: false,
            body: error.message
        };
    }
}

export { fetchProducts, fetchCategories };

// Todo este archivo forma parte de la guia 9.