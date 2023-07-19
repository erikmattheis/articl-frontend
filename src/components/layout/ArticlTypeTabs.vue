<template>
  <ul class="nav-tabs nav-tabs-inner-margin">
    <li
      v-for="articlType in articlTypes"
      :key="articlType"
      :class="{ active: articlType === type }">
      <a
        href
        @click.prevent="$router.push({ name: 'ArticlsList', params: { slug, type: articlType } })"
        @keyup.enter.prevent="$router.push({ name: 'ArticlsList', params: { slug, type: articlType } })">
        {{ articlType }}</a>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ArticlTypeTabs",
  data() {
    return {
      type: this.$route.params.type,
      slug: this.$route.params.slug,
    };
  },
  computed: {
    ...mapGetters({
      articlTypes: "resources/articlTypes",
      initialArticlType: "resources/initialArticlType",
    }),
  },
};

</script>
