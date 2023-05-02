import pokemonApi from "@/api/pokemonApi";

// Crea función get4PokemonOptions asíncrona
// Crea en ella una variable mixedPokemons que invoca getPokemons con un sort cuya función es Math.random() -0.5
// Retorna mixedPomenos

// Crea una función getPokemonNames asíncrona que desestructructura un array de 4 items, a-d. Imprime como prueba get de pokemonApi con 
// /1 y extrae data.name y data.id. Luego, crea un array llamado promiseArr que hará 4 peticies a pokemonApi con los 4 valores 
// desestruturados que se le pasaron como argumento a getPokemonNames. Luego dispara con Promise.all 4 promesas en simultanea desestructurando
// las respuestas de promiseArr en p1, p2, p3 y p4. Retorna un array de 4 objetos con name y id. Invoca en getPokemonOPtions await getPokemonNames pasándole mixedPokemons 
// co nun splice para retornar arreglo entre las posiciones 0 y 4, retórnalos en pokemons y retorna pokemons en getPokemonOPtions. 
const getPokemons = () => {
    const pokemonsArr = Array.from( Array(650) )
        .map( ( x, index) => index + 1 )     
    return pokemonsArr
}

const getPokemonOptions = async() => {
    const mixedPokemons = getPokemons().sort( () => Math.random() - 0.5 )
    // console.log(mixedPokemons)
    const pokemons = await getPokemonNames(mixedPokemons.splice(0,4))
    console.log(pokemons)
    return pokemons
}

const getPokemonNames = async([a, b, c, d] = [] ) => {
    // const resp = await pokemonApi.get(`/1`)
    //console.log(resp.data.name)
    // console.log(resp.data.id)

    const promiseArr = [
        pokemonApi.get(`/${ a }`),
        pokemonApi.get(`/${ b }`),
        pokemonApi.get(`/${ c }`),
        pokemonApi.get(`/${ d }`)
    ]

    const [p1, p2, p3, p4] = await Promise.all(promiseArr)

    return [
        { name: p1.data.name, id: p1.data.id },
        { name: p2.data.name, id: p2.data.id },
        { name: p3.data.name, id: p3.data.id },
        { name: p4.data.name, id: p4.data.id }
    ]
}

export default getPokemonOptions