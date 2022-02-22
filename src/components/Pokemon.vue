<script>
function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1).toLowerCase();
}

export default {
  props: {
    pokemon: Object,
  },

  computed: {
    imgPath() {
      const id = this.pokemon.url.slice(0, -1).split('/').pop();
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    },
    name() {
      return capitalize(this.pokemon.name);
    },
  },
};
</script>

<template>
  <div>
    <img :src="imgPath" :alt="name" />
    <h2>{{ name }}</h2>
  </div>
</template>
