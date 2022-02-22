<template>
  <div class="flex">
    <Card
      v-for="card in cards"
      :card="card"
      :key="`${card.value}-${card.symbold}`"
    />
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
      return this.$store.state.guesser.cards;
    },
  },
};
</script>
