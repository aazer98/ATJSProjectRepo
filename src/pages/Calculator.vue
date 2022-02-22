<template>
    <div id="calculator">
        <h2>Calculator</h2>

        <div>
            <strong>last stored number</strong>
            <p class="displayNumber">{{ lastNumber }}</p>
        </div>

        <div>
            <strong>Display Number</strong>
            <p class="displayNumber">{{ currentNumber }}</p>
        </div>

        <br />

        <button v-for="number in numberKeys" @click="pushNumber(number)" :key="number">{{ number }}</button>

        <br />

        <button @click="addNumber">+</button>
        <button @click="subtractNumber">-</button>
        <button @click="multiplicateNumber">*</button>
        <button @click="divideNumber">/</button>
        <button @click="deleteNumbers">DEL</button>
        <button @click="showResult">=</button>
        <!-- Room for other operations -->

        <br />

        <button @click="showResult">Show Result</button>
    </div>
</template>

<script>
const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export default {
    data() {
        return {
            lastNumber: 0,
            currentNumberArray: [],
            numberKeys,
            operation: "add",
        };
    },

    computed: {
        currentNumber() {
            // We turn the array into a number so we don't need to convert
            // any other istance of the currentNumber
            return parseInt(this.currentNumberArray.join(""), 10) || 0;
        },
    },

    methods: {
        pushNumber(numberStr) {
            // Just add the last number to the array
            this.currentNumberArray.push(numberStr);
        },

        addNumber() {
            // Store the currentNumber in memory of the lastNumber
            this.operation = "add";
            this.lastNumber = this.currentNumber;
            this.currentNumberArray = [];
        },

        subtractNumber() {
            // Store the currentNumber in memory of the lastNumber
            this.operation = "subtract";
            this.lastNumber = this.currentNumber;
            this.currentNumberArray = [];
        },

        multiplicateNumber() {
            // Store the currentNumber in memory of the lastNumber
            this.operation = "multiply";
            this.lastNumber = this.currentNumber;
            this.currentNumberArray = [];
        },

        divideNumber() {
            // Store the currentNumber in memory of the lastNumber
            this.operation = "divide";
            this.lastNumber = this.currentNumber;
            this.currentNumberArray = [];
        },

        deleteNumbers() {
            // Store the currentNumber in memory of the lastNumber

            this.lastNumber = [];
            this.currentNumberArray = [];
        },

        showResult() {
            let result = null;
            if (this.operation == "add") {
                result = this.lastNumber + this.currentNumber;
            } else if (this.operation == "subtract") {
                result = this.lastNumber - this.currentNumber;
            } else if (this.operation == "multiply") {
                result = this.lastNumber * this.currentNumber;
            } else if (this.operation == "divide") {
                result = this.lastNumber / this.currentNumber;
            }

            this.currentNumberArray = [...String(result)];
            // Logic here has a lot of room for improvements
        },
    },
};
</script>

<style>
.displayNumber {
    font-family: monospace;
}
</style>