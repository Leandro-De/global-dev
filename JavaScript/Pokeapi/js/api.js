const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const formulario = document.querySelector("#form");
const btnPrevious = document.querySelector("#anterior");
const btnSiguiente = document.querySelector("#siguiente");

// Variables para la paginacion
let offset = 1;
let limit = 8;

// paginacion
btnPrevious.addEventListener('click', () =>{
    if(offset != 1){
        listaPokemon.innerHTML = "";
        offset -=9;
        cardPokemon(offset, limit);
    }
});
/*
// los muestra en seguida de los anteriores
btnSiguiente.addEventListener('click', () =>{
    offset +=9;
    cardPokemon(offset, limit);
});
*/
// Elimina los anteriores y muestra los nuevos
btnSiguiente.addEventListener('click', () =>{
    offset +=9;
    listaPokemon.innerHTML = "";
    cardPokemon(offset, limit);
});

//Buscar Pokemon
window.onload = () => {
    formulario.addEventListener('submit', nombrePokemon);
}

cardPokemon(offset, limit);

// Mostrar pokemones que se definan como offset y limit
function cardPokemon(offset, limit){
    let URL = "https://pokeapi.co/api/v2/pokemon/";
    for (let i = offset; i <= offset + limit; i++) {
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
    }
}

//Buscar Pokemon
function nombrePokemon(e){
    e.preventDefault();
    listaPokemon.innerHTML = "";
    const termino = document.querySelector("#termino").value;
    const url = `https://pokeapi.co/api/v2/pokemon/${termino}`;

    fetch(url)
        .then(response => response.json())
        .then(resultado => mostrarPokemon(resultado))
}

//Mostrar pokemon
function mostrarPokemon(poke){
    // Filtrar los tipos
    let tipos = poke.types.map(type => `
        <p class="tipo ${type.type.name}">${type.type.name}</p>
    `);
    
    tipos = tipos.join('');
    let pokeId = poke.id.toString();
    if(pokeId.length === 1){
        pokeId = "00" + pokeId;
    }else if(pokeId.length === 2){
        pokeId = "0" + pokeId;
    }

    // Pintar Api
    const div = document.createElement("div");
     div.classList.add("pokemon");
     div.innerHTML = `
     <p class="pokemon-id-back">#${pokeId}</p>
     <div class="pokemon-imagen">
         <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
     </div>
     <div class="pokemon-info">
         <div class="nombre-contenedor">
             <p class="pokemon-id">
                 #${pokeId}
             </p>
             <h2 class="pokemon-nombre">
                 ${poke.name}
             </h2>
         </div>
         <div class="pokemon-tipos">
             ${tipos}
         </div>
         <div class="pokemon-stats">
             <p class="stat">${poke.height}m</p>
             <p class="stat">${poke.weight}Kg</p>
         </div>
     </div>
     `;
    listaPokemon.append(div);
}

//Botones para los filtros
botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    let URL = "https://pokeapi.co/api/v2/pokemon/";
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            if(botonId === "ver-todos"){
                mostrarPokemon(data);
            }else {
                const tipos = data.types.map(type => type.type.name);
                if(tipos.some(tipo => tipo.includes(botonId))){
                    mostrarPokemon(data);
                }
            }
        })
    }
}))


// Ventana modal