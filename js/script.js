const app = document.getElementById('app')
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let numeroInicial = 0;
let numeroFinal = 10;
let sumar;
let sumar2;


const getPokemons = async(numeroInicial, numeroFinal) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${numeroInicial}&limit=${numeroFinal}`);
        if (!response.ok) {
            throw new Error('Hubo un error cargando los Pokemons');
        }
        const pokemons = await response.json();
        console.log(pokemons.results);
        for (i = 0; i < 10; i++) {
            getPokemon(pokemons.results[i].url);

        }
    } catch (error) {
        console.error(error)
    }
};



const getPokemon = async(pokemon) => {
    try {
        const response = await fetch(pokemon);
        if (!response.ok) {
            throw new Error('Hubo un error cargando los Pokemons');
        }
        const pokemons = await response.json();
        console.log(pokemons);
        templatePokemons(pokemons);
    } catch (error) {
        console.error(error)
    }
};
getPokemons();

const templatePokemons = (imgPokemons) => {
    app.innerHTML += `
    <div class="pokemons-card">
        <img  class="imgPokemons"src="${imgPokemons.sprites.front_default }"/>
        <p id='nombrePokemons' value=${imgPokemons.name}>${imgPokemons.name}</p>
    </div>
    `;


}
const getNamePokemons = async(nombre) => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!response.ok) {
            throw new Error('Hubo un error cargando los Pokemons');
        }
        const pokemons = await response.json();
        console.log(pokemons);
        let imgPokemon = pokemons.sprites.front_default;
        let namePokemon = pokemons.name;
        app.innerHTML = ""
        app.innerHTML = `
            <div class="pokemon-card">
                <img class="imgPokemon"src="${imgPokemon}"/>
                <p class="nombrePokemon"id='nombre' value=${namePokemon}>${namePokemon}</p>
                <div>
                    <p><span>Base Experience:</span> ${pokemons.base_experience}</p>
                    <p><span>Types:</span> ${pokemons.types[0].type.name}</p>
                    <p><span>Weight:</span> ${pokemons.weight}</p>
                </div>
            </div>
            `;


    } catch (error) {
        console.error(error)
    }
};

nextBtn.addEventListener("click", () => {

    if ((isNaN(sumar)) && (isNaN(sumar2))) {
        sumar = numeroInicial + 10;
        sumar2 = numeroFinal + 10;
        app.innerHTML = "";
        getPokemons(sumar, sumar2)
        console.log(sumar, sumar2)

    } else {

        sumar += 10;
        sumar2 += 10;
        app.innerHTML = "";
        getPokemons(sumar, sumar2)
        console.log(sumar, sumar2)




    }


})
prevBtn.addEventListener("click", () => {
    if ((sumar == 0) && (sumar2 == 10)) {
        app.innerHTML = '';
        getPokemons();
    } else {
        sumar -= 10;
        sumar2 -= 10;
        app.innerHTML = "";
        getPokemons(sumar, sumar2)
        console.log(sumar, sumar2)

    }


})
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    app.innerHTML = '';
    sumar = 0;
    sumar2 = 10;
    getPokemons();
})

searchBtn.addEventListener('click', () => {
    let nombrePokemon = searchInput.value;
    let pokemonNameEnd = nombrePokemon.toLowerCase();
    console.log(pokemonNameEnd);
    if (pokemonNameEnd != '') {
        getNamePokemons(pokemonNameEnd)
    } else {
        console.log('Pokemon no existe');
    }
})
