<template>
  <div class="row-admin-box actions-column">
    <router-link
      v-if="treeLevel !== 4"
      :to="{ name: 'CreateCategoryPage', query: { parentSlug: $route.params.slug || '0' } }"
      role="button">
      <small>New Category Here</small>
    </router-link>

    <router-link
      v-else
      :to="{ name: 'CreateArticlPage', query: { articlType: $route.params.articlType || '', slug: $route.params.slug || '0' } }"
      role="button">
      <small>New Articl Here</small>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {

  name: "DirectoryActions",
  computed: {
    ...mapGetters({
      treeLevel: "resources/treeLevel",
    }),
  },

};
</script>

<style scoped>
.actions-column {
  margin-top: var(--nav-element-spacing-vertical);
  grid-template-columns: max-content max-content;
}
</style>
