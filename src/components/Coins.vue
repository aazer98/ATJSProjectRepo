<template>
  <h2>Coins: {{ coins }}</h2>
  <h2>Coins Bet: {{ coinsBet }}</h2>
  <h2>Coins Won: {{ coinsWon }}</h2>
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