const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header");
const formulario = document.querySelector("#form");

//Buscar Pokemon
window.onload = () => {
    formulario.addEventListener('submit', nombrePokemon);
}

function nombrePokemon(e){
    e.preventDefault();
    const termino = document.querySelector("#termino").value;
    const url = `https://pokeapi.co/api/v2/pokemon/${termino}`;

    fetch(url)
        .then(response => response.json())
        .then(resultado => mostrarPokemon(resultado))
}

//Mostrar pokemon

function mostrarPokemon(poke){

    let tipos = poke.types.map(type => `
        <p class="tipo ${type.type.name}">${type.type.name}</p>
    `);

    const div = document.createElement("div");
     div.classList.add("pokemon");
     div.innerHTML = `
     <p class="pokemon-id-back">#${poke.id}</p>
     <div class="pokemon-imagen">
         <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
     </div>
     <div class="pokemon-info">
         <div class="nombre-contenedor">
             <p class="pokemon-id">
                 #${poke.id}
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


