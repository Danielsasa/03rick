// URL base de la API de Rick and Morty (character-personajes)
const url = "https://rickandmortyapi.com/api/character";

// Manipular el DOM
// Seleccionar los elementos
// Referencia a los elementos del DOM que son el contenedor de los personajes y los botones de paginación
const container = document.getElementById("characters-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Variables para llevar el control de la paginación
let currentPage = 1;
let totalpages = 1; // Total de páginas en la API

// Función asincrónica para obtener los personajes de la API
// Usando fetch para obtener los datos de la API y manejar errores de red o respuesta
async function getCharacters(page = 1) {
    try {
        // Solicitar los datos de la API usando el número de la página
        const response = await fetch(`${url}?page=${page}`);
        
        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        // Extraer la data de la respuesta y parsearla a JSON
        const data = await response.json();

        // Actualizar el total de páginas disponibles proporcionado por la API
        totalpages = data.info.pages;

        // Renderizar los personajes en el contenedor
        renderCharacters(data.results);

        // Actualizar los botones de paginación
        updateButtons(); // Actualizar el estado de los botones

    } catch (error) {
        // Mostrar un mensaje de error en el contenedor
        container.innerHTML = `<p>❌ Error al obtener los personajes: ${error.message}</p>`;
    }
}

// Función para renderizar los personajes en el contenedor
// Crea una tarjeta para cada personaje y la agrega al contenedor
function renderCharacters(characters) {
    // Limpiar el contenedor antes de agregar los personajes
    container.innerHTML = ""; // Vacía el contenedor

    // Iterar sobre cada personaje
    characters.forEach(personaje => {
        // Crear un div para cada personaje
        const card = document.createElement("div");
        card.classList.add("card");

        // Definir el contenido HTML de la tarjeta con los datos del personaje
        card.innerHTML = `
        <img class="character-image" src="${personaje.image}" alt="${personaje.name}" >
        <h2>${personaje.name}</h2>
        <p style="font-size: 1.2rem">Especie: ${personaje.species}</p>
        <p style="font-size: 1.2rem">Estado: ${personaje.status}</p>
        <p style="font-size: 1.2rem">Género: ${personaje.gender}</p>
        <p style="font-size: 1.2rem">Ubicación: ${personaje.location?.name || 'Desconocida'}</p>
        <p style="font-size: 1.2rem">Origen: ${personaje.origin?.name || 'Desconocido'}</p>
    `;

        // Agregar la tarjeta al contenedor
        container.appendChild(card);
    });
}

function updateButtons() {
    // Habilitar o deshabilitar los botones de paginación según la página actual
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalpages;
}

//crear un evento clcik para el botón anterior

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        getCharacters(currentPage);
        updateButtons(); // Actualizar el estado de los botones
    }
}   
);
//evento para el botón siguiente 
nextBtn.addEventListener("click", () => {
    if (currentPage < totalpages) {
        currentPage++;
        getCharacters(currentPage);
        updateButtons(); // Actualizar el estado de los botones
    }
}   
);

// Mostrar los personajes de la página actual al cargar la página
getCharacters(currentPage);