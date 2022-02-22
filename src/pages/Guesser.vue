<script>
import { mapState, mapActions } from 'vuex'
import GuesserScores from '../components/GuesserScores.vue'
import CardsList from '../components/CardsList.vue'

export default {
  components: {
    GuesserScores,
    CardsList,
  },
  computed: {
    ...mapState(['guesser']),
  },

  methods: {
    ...mapActions(['getDeck', 'setNextGuess', 'drawCard']),
  },
};
</script>

<template>
  <h1>The great guesser game!</h1>

  <button @click="getDeck">Get a new Deck</button>

  <div v-if="guesser.deckId">
    <GuesserScores />

    <div class="flex">
      <button @click="setNextGuess('red')">Guess Red 🟥</button>
      <button @click="setNextGuess('black')">Guess Black 🖤</button>
    </div>

    <button v-if="guesser.nextGuess" @click="drawCard">Draw a card</button>
    <h2>Your next guess is: {{ guesser.nextGuess }}</h2>

    <CardsList />
  </div>
  <div v-else>Please draw a new deck!</div>
</template>

<style>
img {
  width: 100px;
}

.flex {
  display: flex;
}
</style>
