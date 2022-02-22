<template>
  <div class="p-8">
    <img :src="card.image" :alt="altText" />
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    card: Object,
  },
  computed: {
    altText() {
      return `${this.card.value} of ${this.card.symbol}`;
    },
  },
};
</script>
