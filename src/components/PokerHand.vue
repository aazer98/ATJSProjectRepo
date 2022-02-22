<template>
  <div class="flex content-center justify-center m-auto">
    <Card v-for="card in cards" :card="card" :key="`${card.value}-${card.symbol}`" />
  </div>
</template>

<script>
import Card from './Card.vue';

export default {
  name: 'CardList',

  components: {
    Card,
  },

  computed: {
    cards() {
      console.log(this.$store.state.poker.cards)
      return this.$store.state.poker.cards;
    },
  },
};

</script>