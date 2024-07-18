<template>
  <span> {{ author }} {{ name }}{{ commaOrEmpty }} </span>
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
      console.log('last:', this.last);
      return this.last ? '' : ', ';
    },
    name() {
      console.log('author:', this.author);
      if (typeof this.author === 'string') return this.author;
      if (!this.author?.nameLast) return 'No nameLast set';
      return `${this.author.nameFirst} ${this.author.nameLast}${this.commaOrEmpty}`;
    },
  },
}
</script>