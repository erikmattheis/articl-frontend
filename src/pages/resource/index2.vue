<template>
  <article v-if="!isLoading">
    resource/index


    <h2>{{ title }}</h2>

    <router-view :class="{ 'nav-content': treeLevel > 3 }" />

    <directory-actions
      v-if="isLoggedInMixin"
      :tree-level="treeLevel" />
  </article>
</template>

<script>
import { groupBy } from "lodash";
import { mapGetters } from "vuex";

import ResourcesTabs from "@/components/layout/ResourcesTabs.vue";
import CategoriesList from "@/components/layout/CategoriesList.vue";
import ArticlsList from "@/components/layout/ArticlsList.vue";
import DirectoryActions from "@/components/layout/DirectoryActions.vue";
import TheBreadcrumbs from "@/components/layout/TheBreadcrumbs.vue";
import axiosInstance from "@/services/axiosService";

export default {
  name: "ResourceIndex",
  components: {
    ResourcesTabs,
    CategoriesList,
    ArticlsList,
    DirectoryActions,
    TheBreadcrumbs,
  },
  data() {
    return {
      isLoading: true,
      title: "",
      slug: "",
    };
  },
  computed: {
    ...mapGetters({
      treeLevel: "resources/treeLevel",
      articls: "resources/articls",
      articlTypes: "resources/articlTypes",
      categories: "resources/categories",
      notes: "resources/notes",
    }),
  },
  watch: {
    "$route.params.slug": {
      handler() {
        this.updateData();
      },
      'immediate': true,
    },
  },
  created() {
    this.setTitleAndDescriptionMixin({
      titleHtml: "Resource",
    });
  },

};
</script>
