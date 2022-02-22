import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './index.css'
import Home from './pages/Home.vue';
import Pokedex from './pages/Pokedex.vue';
import Guesser from './pages/Guesser.vue';
import Poker from './pages/Poker.vue';
import { createStore } from 'vuex';


// Create a new store instance.
const API = 'https://deckofcardsapi.com/api/deck/new/shuffle/';

function cardSymbol(card) {
  switch (card.suit) {
    case 'CLUBS':
      return '♣️';
    case 'SPADES':
      return '♠️';
    case 'DIAMONDS':
      return '♦️';
    case 'HEARTS':
      return '♥️';
    default:
      break;
  }
}

function validateGuess(card, nextGuess) {
  const colors = {
    SPADES: 'black',
    HEARTS: 'red',
    CLUBS: 'black',
    DIAMONDS: 'red',
  };

  const cardColor = colors[card.suit];

  return cardColor == nextGuess;
}

const store = createStore({
  state() {
    return {
      guesser: {
        deckId: undefined,
        cards: [],
        points: 0,
        guesses: 0,
        nextGuess: undefined,
      },
      poker: {
        deckId: undefined,
        cards: [],
        cardsToSplice: [],
        coins: 1000,
        coinsBet: 0,
        coinsMultiplicator: 0,
        coinsWon: 0,
        allowedBet: true,
        priorBet: 0,
        showDiscardButton: false,
        showDiscardOptions: false,
        showEvaluationButton: false,
        showRestartButton: false,
        showHandButton: false,
      }
    };
  },

  getters: {
    drawCardAPI(state) {
      return `https://deckofcardsapi.com/api/deck/${state.guesser.deckId}/draw/?count=1`;
    },
    drawCardAPIPoker(state) {
      return `https://deckofcardsapi.com/api/deck/${state.poker.deckId}/draw/?count=1`;
    },

  },

  mutations: {
    incrementPoints(state) {
      state.guesser.points++;
    },
    incrementGuesses(state) {
      state.guesser.guesses++;
    },
    setDeckId(state, deckId) {
      state.guesser.deckId = deckId;
    },
    setDeckIdPoker(state, deckId) {
      state.poker.deckId = deckId;
    },
    setNextGuess(state, color) {
      state.guesser.nextGuess = color;
    },
    pushNewCard(state, newCard) {
      state.guesser.cards.push(newCard);
    },
    pushNewHand(state, newCard) {
      state.poker.allowedBet = false;
      state.poker.showDiscardOptions = true;
      state.poker.showEvaluationButton = true;
      state.poker.cards.push(newCard);
      state.poker.showHandButton = false;
      console.log(state.poker.cards)
    },
    bet5(state, bet) {
      state.poker.coins += state.poker.priorBet
      state.poker.coinsBet = 0;
      state.poker.coins -= bet;
      state.poker.coinsBet = bet;
      state.poker.priorBet = bet;
      state.poker.showHandButton = true;
    },

    addCardToRemove(state, card) {

      if (state.poker.cardsToSplice.includes(card)) {
        var index = state.poker.cardsToSplice.indexOf(card);
        state.poker.cardsToSplice.splice(index, 1);
        console.log(state.poker.cardsToSplice)
      } else {
        state.poker.cardsToSplice.push(card)
        console.log(state.poker.cardsToSplice)
      }

      if(state.poker.cardsToSplice.length > 0){
        state.poker.showDiscardButton = true;
      } else {
        state.poker.showDiscardButton = false;
      }
    },

    changeHand(state) {
      var i = 0;
      while (i <= state.poker.cardsToSplice.length - 1) {

        var index = state.poker.cardsToSplice[i];
        state.poker.cards.splice(index - i, 1);
        i++
      }
      console.log(state.poker.cards)
      state.poker.showDiscardButton = false;
      state.poker.showDiscardOptions = false;
    },

    evaluate(state) {
      let cardsString = JSON.stringify(state.poker.cards)

      console.log("evaluating")
      function countOccurences(string, word) {
        return string.split(word).length - 1;
      }

      var countAce = countOccurences(cardsString, `"value":"ACE"`);
      var countTwo = countOccurences(cardsString, `"value":"2"`);
      var countThree = countOccurences(cardsString, `"value":"3"`);
      var countFour = countOccurences(cardsString, `"value":"4"`);
      var countFive = countOccurences(cardsString, `"value":"5"`);
      var countSix = countOccurences(cardsString, `"value":"6"`);
      var countSeven = countOccurences(cardsString, `"value":"7"`);
      var countEight = countOccurences(cardsString, `"value":"8"`);
      var countNine = countOccurences(cardsString, `"value":"9"`);
      var countTen = countOccurences(cardsString, `"value":"10"`);
      var countJack = countOccurences(cardsString, `"value":"JACK"`);
      var countQueen = countOccurences(cardsString, `"value":"QUEEN"`);
      var countKing = countOccurences(cardsString, `"value":"KING"`);

      var countSpades = countOccurences(cardsString, `♠️`);
      var countClubs = countOccurences(cardsString, `♣️`);
      var countDiamonds = countOccurences(cardsString, `♦️`);
      var countHearts = countOccurences(cardsString, `♥️`);

      var NrOfPairs = 0
      if (countAce == 2) { NrOfPairs++ };
      if (countTwo == 2) { NrOfPairs++ };
      if (countThree == 2) { NrOfPairs++ };
      if (countFour == 2) { NrOfPairs++ };
      if (countFive == 2) { NrOfPairs++ };
      if (countSix == 2) { NrOfPairs++ };
      if (countSeven == 2) { NrOfPairs++ };
      if (countEight == 2) { NrOfPairs++ };
      if (countNine == 2) { NrOfPairs++ };
      if (countTen == 2) { NrOfPairs++ };
      if (countJack == 2) { NrOfPairs++ };
      if (countQueen == 2) { NrOfPairs++ };
      if (countKing == 2) { NrOfPairs++ };

      var paylines = "NONE"
      if (NrOfPairs == 2) { paylines = "TWO_PAIRS" }

      var triple = false;
      if (countAce == 3 ||
        countTwo == 3 ||
        countThree == 3 ||
        countFour == 3 ||
        countFive == 3 ||
        countSix == 3 ||
        countSeven == 3 ||
        countEight == 3 ||
        countNine == 3 ||
        countTen == 3 ||
        countJack == 3 ||
        countQueen == 3 ||
        countKing == 3) { triple = true; paylines = "TRIPLE" }

      var straight = false;
      if (countAce == 1 && countTwo == 1 && countThree == 1 && countFour == 1 && countFive == 1 ||
        countTwo == 1 && countThree == 1 && countFour == 1 && countFive == 1 && countSix == 1 ||
        countThree == 1 && countFour == 1 && countFive == 1 && countSix == 1 && countSeven == 1 ||
        countFour == 1 && countFive == 1 && countSix == 1 && countSeven == 1 && countEight == 1 ||
        countFive == 1 && countSix == 1 && countSeven == 1 && countEight == 1 && countNine == 1 ||
        countSix == 1 && countSeven == 1 && countEight == 1 && countNine == 1 && countTen == 1 ||
        countSeven == 1 && countEight == 1 && countNine == 1 && countTen == 1 && countJack == 1 ||
        countEight == 1 && countNine == 1 && countTen == 1 && countJack == 1 && countQueen == 1 ||
        countNine == 1 && countTen == 1 && countJack == 1 && countQueen == 1 && countKing == 1 ||
        countTen == 1 && countJack == 1 && countQueen == 1 && countKing == 1 && countAce == 1) { straight = true; paylines = "STRAIGHT" }


      var flush = false
      if (countSpades == 5 || countDiamonds == 5 || countClubs == 5 || countHearts == 5) { flush = true; paylines = "FLUSH" }


      var fullHouse = false;
      if (NrOfPairs == 1 && triple == true) { fullHouse == true; paylines = "FULL_HOUSE" }


      var fourOfAKind = false;
      if (countAce == 4 ||
        countTwo == 4 ||
        countThree == 4 ||
        countFour == 4 ||
        countFive == 4 ||
        countSix == 4 ||
        countSeven == 4 ||
        countEight == 4 ||
        countNine == 4 ||
        countTen == 4 ||
        countJack == 4 ||
        countQueen == 4 ||
        countKing == 4) { fourOfAKind = true }
      if (fourOfAKind == true) { paylines = "FOUR_OF_A_KIND" }

      var straightFlush = false;
      if (flush == true && straight == true) { straightFlush == true; paylines = "STRAIGHT_FLUSH" }

      var straightRoyalFlush = false;
      if (countAce == 1 &&
        countTen == 1 &&
        countJack == 1 &&
        countQueen == 1 &&
        countKing == 1 &&
        flush == true) { straightRoyalFlush = true; paylines = "STRAIGHT_ROYAL_FLUSH" }

        if(paylines == "NONE"){state.poker.coinsMultiplicator = 0}
        else if(paylines == "TWO_PAIRS"){state.poker.coinsMultiplicator = 1}
        else if(paylines == "TRIPLE"){state.poker.coinsMultiplicator = 3}
        else if(paylines == "STRAIGHT"){state.poker.coinsMultiplicator = 4}
        else if(paylines == "FLUSH"){state.poker.coinsMultiplicator = 5}
        else if(paylines == "FULL_HOUSE"){state.poker.coinsMultiplicator = 7}
        else if(paylines == "FOUR_OF_A_KIND"){state.poker.coinsMultiplicator = 25}
        else if(paylines == "STRAIGHT_FLUSH"){state.poker.coinsMultiplicator = 75}
        else if(paylines == "STRAIGHT_ROYAL_FLUSH"){state.poker.coinsMultiplicator = 500}

        state.poker.coinsWon = state.poker.coinsBet * state.poker.coinsMultiplicator;

        state.poker.coins += state.poker.coinsWon;

        state.poker.showRestartButton = true;
        state.poker.showEvaluationButton = false;
        state.poker.showDiscardButton= false;
      state.poker.showDiscardOptions= false;
    }

  },

  actions: {
    setNextGuess({ commit }, color) {
      commit('setNextGuess', color);
    },

    async getDeck({ commit }) {
      const { deck_id } = await fetch(API).then((r) => r.json());
      commit('setDeckId', deck_id);
    },
    async getDeckPoker({ commit }) {
      const { deck_id } = await fetch(API).then((r) => r.json());
      commit('setDeckIdPoker', deck_id);
    },

    async drawCard({ state, commit, getters }) {
      const { cards } = await fetch(getters.drawCardAPI).then((r) => r.json());

      // +1 the guess counter
      commit('incrementGuesses');

      // +1 the point counter if you guessed correctly
      if (validateGuess(cards[0], state.guesser.nextGuess)) {
        commit('incrementPoints');
      }

      // Here's a clean card object that has a nice symbol
      const cleanCard = {
        value: cards[0].value,
        symbol: cardSymbol(cards[0]),
        image: cards[0].image,
      };

      commit('pushNewCard', cleanCard);
    },

    async drawHand({ commit, getters }) {
      let i = 0;
      while (i <= 4) {
        const { cards } = await fetch(getters.drawCardAPIPoker).then((r) => r.json());

        const cleanCard = {
          value: cards[0].value,
          symbol: cardSymbol(cards[0]),
          image: cards[0].image,
        };

        commit('pushNewHand', cleanCard);
        i++;
      }
    },

    placeBet5: (state, data) => {
      state.commit('bet5', data.bet)
    },

    chooseCards: (state, data) => {

      var discard = JSON.stringify(data.cardNr)
      state.commit('addCardToRemove', discard)

    },

    async discardHand({ state, commit, getters }) {
      console.log(state.poker.cards)
      commit('changeHand')

      let i = 0;
      while (i <= state.poker.cardsToSplice.length - 1) {
        const { cards } = await fetch(getters.drawCardAPIPoker).then((r) => r.json());

        const cleanCard = {
          value: cards[0].value,
          symbol: cardSymbol(cards[0]),
          image: cards[0].image,
        };

        commit('pushNewHand', cleanCard);
        i++;
      }

      state.poker.showDiscardOptions = false;
    },

    evaluateHand({ commit }) {

      commit('evaluate');
    },

    async reset({ state, commit }) {
      state.poker.cards.splice(0,5)
      state.poker.cardsToSplice.splice(0,5)
      state.poker.coinsBet = 0;
      state.poker.coinsWon = 0;
      state.poker.allowedBet = true;
      state.poker.priorBet = 0;
      state.poker.showRestartButton= false;
      const { deck_id } = await fetch(API).then((r) => r.json());
      commit('setDeckIdPoker', deck_id);
      console.log(state.poker.cards)
      console.log(state.poker.cardsToSplice)
      
      
    },
  },
});


// Here we create our own Vue Router Instance
// and define the paths we can then use.
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/pokedex', component: Pokedex },
    { path: '/guesser', component: Guesser },
    { path: '/poker', component: Poker },
  ],
});

const app = createApp({});
app.use(router);
app.use(store);
app.mount('#app');


