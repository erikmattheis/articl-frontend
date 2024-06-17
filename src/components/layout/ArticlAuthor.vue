<template>
  <span> {{ name }}{{ commaOrEmpty }} </span>
</template>

<script>
export default {
  props: {
    key: {
      type: Number,
      required: true,
      default: () => 0,
    },
    author: {
      type: [Object, String],
      required: true,
      default: () => ({}),
    },
    last: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    commaOrEmpty() {
      return this.last ? '' : ', ';
    },
     name() {
      if (typeof this.author === 'string') return this.author;
      if (!this.author?.nameLast) return 'No nameLast set';
      return `${this.author.nameFirst} ${this.author.nameLast}${this.commaOrEmpty}`;
    },
  },
}
</script>
