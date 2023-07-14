<template>
  <the-breadcrumbs />
  <categories-list v-if="results.categories?.length" />
  <articls-list />
</template>
<script>
import { groupBy } from "lodash";
import axiosInstance from "@/services/axiosService";

import TheBreadcrumbs from "@/components/layout/TheBreadcrumbs.vue";
import CategoriesList from "@/components/layout/CategoriesList.vue";
import ArticlsList from "@/components/layout/ArticlsList.vue";
export default {
  components: {
    TheBreadcrumbs,
    CategoriesList,
    ArticlsList,
  },
  data() {
    return {
      isLoading: true,
      results: {},
      title: "",
      slug: "",
    };
  },
  watch: {
    "$route.params.slug": {
      handler() {
        this.updateData(this.$route.params.slug);
      },
      'immediate': true,
    },
  },

  methods: {

    async updateData(slug) {
      try {
        this.isLoading = true;
        const results = await this.fetchData(slug);
        this.updateValues(results)
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
      finally {
        this.isLoading = false;
      }
    },
    updateValues(results) {
      this.results = results;

      try {
        if (results.categories?.length) {
          this.$store.dispatch("resources/categories", results.categories);
        } else {
          this.$store.dispatch("resources/categories", []);
        }

        if (results.breadcrumbs?.length) {
          this.$store.dispatch("resources/breadcrumbs", results.breadcrumbs);
        } else {
          this.$store.dispatch("resources/breadcrumbs", []);
        }
        console.log('results.articls.length', results.articls);
        console.log(results.categories.length);
        if (results.articls?.length) {
          console.log(results.articls.length);
          this.$store.dispatch("resources/articls", results.articls);
          this.$store.dispatch("resources/articlTypes", results.articlTypes);
        } else {
          this.$store.dispatch("resources/articls", []);
          this.$store.dispatch("resources/articlTypes", []);
        }

        if (results.notes?.length) {
          this.$store.dispatch("resources/notes", results.notes);
        }
        else {
          this.$store.dispatch("resources/notes", []);
        }

        this.title = results.category[0]?.title;


        this.titleHtml = results.category[0]?.titleHtml;

        const description = results.category[0]?.description;

        this.setTitleAndDescriptionMixin({
          titleHtml: this.titleHtml,
          description,
        });
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },


    async fetchData(slug) {
      const result = await axiosInstance({
        method: "GET",
        url: `/resource/${slug || ""}`,
      });

      return {
        breadcrumbs: result.data.breadcrumbs,
        categories: result.data.categories,
        category: result.data.category,
        articlTypes: result.data.articls?.length ? [...new Set(result.data.articls.map((item) => item?.type))] : [],
        articls: groupBy(result.data.articls, (articl) => articl?.type),
        notes: result.data.notes,
      };
    },
  },

}
</script>