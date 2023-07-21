<template>
  <ul class="nav-tabs nav-tabs-inner-margin">slug:{{ slug }}<br>articlType:{{ articlType }}<br>articlTypes:{{ articlTypes
  }}
    <li :class="{ active: articlType === '' }">
      <a href="#" @click.prevent="changeArticlType('')"
        @keyup.enter.prevent="changeArticlType('')">
        All</a>
    </li>
    <li v-for="type in articlTypes" :key="type" :class="{ active: type === articlType }">
      <a
        href="#"
        @click.prevent="changeArticlType(type)"
        @keyup.enter.prevent="changeArticlType(type)">
        {{ type }}</a>
    </li>
  </ul>
</template>


<script>
import { mapGetters } from "vuex";

export default {
  name: "ArticlTypeTabs",
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      slug: "resources/slug",
      articlTypes: "resources/articlTypes",
      articlType: "resources/articlType",
    }),
  },
  methods: {
    changeArticlType(articlType) {
      this.$store.dispatch("resources/articlType", articlType);

      this.$router.push({ name: 'ArticlsList', params: { slug: this.slug, articlType } });


    },
  },
};

</script>
