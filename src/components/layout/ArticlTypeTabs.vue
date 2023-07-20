<template>
  articlType:{{ articlType }}
  <ul class="nav-tabs nav-tabs-inner-margin">
    <li v-for="type in articlTypes" :key="type" :class="{ active: type === articlType }">
      <a
        href="#"
        @click.prevent="$router.push({ name: 'ArticlsList', params: { slug, type } })"
        @keyup.enter.prevent="$router.push({ name: 'ArticlsList', params: { slug, type } })">
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
};

</script>
