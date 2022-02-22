<script>
import { mapState, mapActions } from 'vuex'
import Coins from '../components/Coins.vue'
import PokerHand from '../components/PokerHand.vue'

export default {
    components: {
        Coins,
        PokerHand
    },
    computed: {
        ...mapState(['poker']),
    },

    methods: {
        ...mapActions(['getDeckPoker', 'drawHand', 'placeBet5', 'discardHand', 'chooseCards', 'evaluateHand','reset']),
        
    },

};


</script>

<template>
    <h1>Poker</h1>
    <button @click="getDeckPoker">Get a new Deck</button>
    <div v-if="poker.deckId">
        <h2>Choose your bet!</h2>
        <div class="well" style="margin-bottom: 30px">
            <div
                v-if="poker.allowedBet == true"
                style="padding-top: 5px; padding-bottom: 5px;"
                class="text-center"
            >
                <span style="font-weight: 900; text-transform: uppercase; font-size: 14px">
                    <span >Place bet:&nbsp;</span>
                </span>
                <span class="btn-group" role="group">
                    <button type="button" v-on:click="placeBet5({bet: 5})">5</button>
                    <button type="button" v-on:click="placeBet5({bet: 25})">25</button>
                    <button type="button" v-on:click="placeBet5({bet: 50})">50</button>
                </span>

                &nbsp;&nbsp;
                <!--<div style="margin-top: 15px; font-weight: 700">
                 Coins bet: {{coins_bet}} | Discard Index: {{discards}} | Cards left: {{deck.length}} |  Draws: {{numberOfDraws}}
                </div>-->
            </div>

            <Coins />
            
            <button v-if="poker.showHandButton == true" class="mr-4 bg-orange-600 text-gray-800 w-32" @click="drawHand">Draw a hand</button>
        </div>

        

        <PokerHand />
        <button type="button" v-if="poker.showDiscardOptions == true" v-on:click="chooseCards({cardNr: 0})">Discard card 1</button>
        <button type="button" v-if="poker.showDiscardOptions == true" v-on:click="chooseCards({cardNr: 1})">Discard card 2</button>
        <button type="button" v-if="poker.showDiscardOptions == true" v-on:click="chooseCards({cardNr: 2})">Discard card 3</button>
        <button type="button" v-if="poker.showDiscardOptions == true" v-on:click="chooseCards({cardNr: 3})">Discard card 4</button>
        <button type="button" v-if="poker.showDiscardOptions == true" v-on:click="chooseCards({cardNr: 4})">Discard card 5</button>
        <br>
        <button type="button" v-if="poker.showDiscardButton == true" v-on:click="discardHand">Discard</button>
        <button type="button" v-if="poker.showEvaluationButton == true" v-on:click="evaluateHand">Evaluate Hand</button>
        <button type="button" v-if="poker.showRestartButton == true" v-on:click="reset">Go again!</button>
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