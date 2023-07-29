<template>
  <span>{{ name }} {{ affilliations }}{{ commaOrEmpty }}</span>
</template>

<script>
export default {
  props: {
    key: {
      type: Number,
      required: true,
    },
    author: {
      type: [Object, String],
      required: true,
      default: () => ({ affilliations }),
    },
    last: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    commaOrEmpty() {
      return this.last ? '' : ',';
    },
    affilliations() {
      return this.author?.affilliations?.length ? `(${this.author?.affilliations?.join(", ")})` : '';
    },
    name() {
      if (typeof this.author === 'string') return this.author;
      if (!this.author?.nameLast) return 'No nameLast set';
      return `${this.author.nameFirst} ${this.author.nameLast}`;
    },
  },
}
</script>