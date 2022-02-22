<script>
import Pokemon from '../components/Pokemon.vue';

export default {
  data() {
    return {
      list: [],
    };
  },

  components: {
    Pokemon,
  },
  async mounted() {
    const localData = localStorage.getItem('pokemon');

    if (localData) {
      console.log('from storage');
      return (this.list = JSON.parse(localData));
    }

    const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';

    const data = await fetch(url);
    const pokemon = await data.json();

    localStorage.setItem('pokemon', JSON.stringify(pokemon.results));

    console.log('from fetch');
    this.list = pokemon.results;
  },
};
</script>

<template>
  <h1>Pokedex</h1>
  <div id="pokeFlex" class="flex">
    <Pokemon v-for="(item, index) in list" :key="index" :pokemon="item" />
  </div>
</template>
