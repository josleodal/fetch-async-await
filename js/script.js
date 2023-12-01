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
    <div class="pokemon-card">
        <img src="${imgPokemons.sprites.front_default }"/>
        <p id='nombre' value=${imgPokemons.name}>${imgPokemons.name}</p>
    </div>
    `;


}

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
        getPokemons(restar, restar2)
        console.log(sumar, sumar2)

    }


})
resetBtn.addEventListener('click', () => {
    app.innerHTML = '';
    sumar = 0;
    sumar2 = 10;
    getPokemons();
})

searchBtn.addEventListener('click', () => {
    console.log(searchBtn.value);
    if (searchInput.value != '') {
        let nombre = searchBtn.value;
        const getPokemons = async(nombre) => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
                if (!response.ok) {
                    throw new Error('Hubo un error cargando los Pokemons');
                }
                const pokemons = await response.json();
                app.innerHTML = ""
                app.innerHTML = pokemons.name


            } catch (error) {
                console.error(error)
            }
        };


    }
})