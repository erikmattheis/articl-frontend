<template>
  <div>
    <router-link
      v-if="treeLevel !== 4"
      :to="{ name: 'CreateCategoryPage', query: { parentSlug: $route.params.slug || '0' } }">
      <button class="bright-button">
        New Category Here<vue-feather
          size=" 1rem"
          type="new"
          aria-label="New" />
      </button>
    </router-link>

    <router-link
      v-else
      :to="{ name: 'CreateArticlPage', query: { articlType: $route.params.articlType || '', slug: $route.params.slug || '0' } }">
      <button class="bright-button">New Articl Here</button>
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
button {
  font-size: 0.7rem;
}
</style>
