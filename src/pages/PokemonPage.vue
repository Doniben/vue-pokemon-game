<template>
  <h1 v-if="!pokemon">Cargando juego...</h1>
  <div v-else>
    <h1>¿Quién es ese pokemon?</h1>
    <PokemonPicture :pokemon-id="pokemon.id" :show-pokemon="showPokemon" />
    <PokemonOptions :pokemons="pokemonArr" @selection-pokemon="checkAnswer" />
    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">Nuevo Juego</button>
    </template>
  </div>
</template>

<script>
import PokemonOptions from "@/components/PokemonOptions.vue";
import PokemonPicture from "@/components/PokemonPicture.vue";
import getPokemonOptions from "@/helpers/getPokemonOptions";
// retorna en data pokemonArr como array vacío, pokemon como null, showPokemon en false, showAnswer en false, message como string vacío.
// crea método asíncrono mixPokemonArray. asigna a pokemonArr get4PokemonOptions con await. Este arraty se pasa al componente PokemonOptions con la llame :pokemons.

export default {
  components: { PokemonOptions, PokemonPicture },
  data() {
    return {
      pokemonArr: [],
      pokemon: {},
      showPokemon: false,
      showAnswer: false,
      message: "",
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();
      console.log("this.pokemonArr", this.pokemonArr);
      const rdInt = Math.floor(Math.random() * 4)
      this.pokemon = this.pokemonArr[rdInt];
      console.log(this.pokemon.id)
    },
    // Crea método checkAnswer al que se le pasará el valor de selectedId. Establezca showPokemon y showAnswer en true. Pásele a PokemonPicture el 
    // id del pokemon y showPokemon. A pokemonOPtions pásele el evento @selection-pokemon con la función checkAnswer.
    checkAnswer(selectedId) {
      this.showAnswer = true;
      this.showPokemon = true;
      if ( selectedId === this.pokemon.id ) {
        this.message = `Correcto, este es ${this.pokemon.name}`;
      } else {
        this.message = `Oops, el nombre de este pokemon es ${this.pokemon.name}`;
      }
    },
    newGame() {
      this.showAnswer = false
      this.showPokemon = false
      this.pokemonArr = []
      this.pokemon = {}
      this.mixPokemonArray()
    }
  },
  mounted() {
    this.mixPokemonArray()
  }
};
</script>

<style>
</style>