<template>
  <h1>Guesses: {{ guesses }}</h1>
  <h1>Points: {{ points }}</h1>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GuesserScores',

  computed: {
    guesses() {
      return this.$store.state.guesser.guesses;
    },
    points() {
      return this.$store.state.guesser.points;
    },
  },
};
</script>
