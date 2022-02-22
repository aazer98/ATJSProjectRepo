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
        ...mapActions(['getDeckPoker', 'drawHand', 'placeBet5', 'discardHand', 'chooseCards', 'evaluateHand', 'reset']),

    },

};


</script>

<template>
    <h1>Poker</h1>
    <button id="button2" @click="getDeckPoker">Get a new Deck</button>

    <div id="flexMain" v-if="poker.deckId" class>
        <div>
            <Coins />
            <div v-if="poker.allowedBet == true">
                <span style="font-weight: 900; text-transform: uppercase; font-size: 14px">
                    <span>Place bet:&nbsp;</span>
                </span>
                <span class="btn-group" role="group">
                    <button id="button2" v-on:click="placeBet5({ bet: 5 })">5</button>
                    <button id="button2" v-on:click="placeBet5({ bet: 25 })">25</button>
                    <button id="button2" v-on:click="placeBet5({ bet: 50 })">50</button>
                </span>
                <h2>Choose your bet!</h2>
            </div>

            <button v-if="poker.showHandButton == true" @click="drawHand">Draw a hand</button>
        </div>

        <div>
            <div class="flex justify-evenly">
                <PokerHand />
            </div>
            <div class="flex justify-evenly">
                <button
                    v-if="poker.showDiscardOptions == true && poker.cardsToSplice.includes('0')"
                    v-on:click="chooseCards({ cardNr: 0 })"
                >Undo</button>
                <button
                    v-else-if="poker.showDiscardOptions == true"
                    v-on:click="chooseCards({ cardNr: 0 })"
                >Discard card 1</button>
                <button
                    v-if="poker.showDiscardOptions == true && poker.cardsToSplice.includes('1')"
                    v-on:click="chooseCards({ cardNr: 1 })"
                >Undo</button>
                <button
                    v-else-if="poker.showDiscardOptions == true"
                    v-on:click="chooseCards({ cardNr: 1 })"
                >Discard card 2</button>
                <button
                    v-if="poker.showDiscardOptions == true && poker.cardsToSplice.includes('2')"
                    v-on:click="chooseCards({ cardNr: 2 })"
                >Undo</button>
                <button
                    v-else-if="poker.showDiscardOptions == true"
                    v-on:click="chooseCards({ cardNr: 2 })"
                >Discard card 3</button>
                <button
                    v-if="poker.showDiscardOptions == true && poker.cardsToSplice.includes('3')"
                    v-on:click="chooseCards({ cardNr: 3 })"
                >Undo</button>
                <button
                    v-else-if="poker.showDiscardOptions == true"
                    v-on:click="chooseCards({ cardNr: 3 })"
                >Discard card 4</button>
                <button
                    v-if="poker.showDiscardOptions == true && poker.cardsToSplice.includes('4')"
                    v-on:click="chooseCards({ cardNr: 4 })"
                >Undo</button>
                <button
                    v-else-if="poker.showDiscardOptions == true"
                    v-on:click="chooseCards({ cardNr: 4 })"
                >Discard card 5</button>
            </div>
        </div>

        <div>
            <button v-if="poker.showDiscardButton == true" v-on:click="discardHand">Discard</button>
            <br />
            <button
                v-if="poker.showEvaluationButton == true"
                v-on:click="evaluateHand"
            >Evaluate Hand</button>
            <br />
            <button v-if="poker.showRestartButton == true" v-on:click="reset">Go again!</button>
        </div>
    </div>

    <div v-else>
        <p>Please draw a new deck!</p>
    </div>

    <div id="payout">
        <h2>Payouts:</h2>
        <p>Two Pairs: x1</p>
        <p>Three of a kind: x3</p>
        <p>Straight: x4</p>
        <p>Flush: x5</p>
        <p>Full House: x7</p>
        <p>Four of a kind: x25</p>
        <p>Straight Flush: x75</p>
        <p>Royal Flush: x500</p>
    </div>
</template>

<style>
img {
    width: 100px;
}

.flex {
    display: flex;
}
</style>