<template>
  <h1>Coins: {{ coins }}</h1>
  <h1>Coins Bet: {{ coinsBet }}</h1>
  <h1>Coins Won: {{ coinsWon }}</h1>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Coins',

  computed: {
    coins() {
      return this.$store.state.poker.coins;
    },
    coinsBet() {
      return this.$store.state.poker.coinsBet;
    },
    coinsWon() {
      return this.$store.state.poker.coinsWon;
    },
  },
};
</script>