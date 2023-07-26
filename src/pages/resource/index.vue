<template>
  <section>
    <the-breadcrumbs />
    <h1>{{ title }}</h1>
    <categories-list />
    <articls-list v-if="treeLevel === 4" />
  </section>
</template>
<script>
import { mapGetters } from 'vuex';
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
  computed: {
    ...mapGetters({
      treeLevel: "resources/treeLevel",
    }),
  },
  created() {
    this.getCategoryResources(this.$route.params.slug);
    this.$store.dispatch("resources/slug", this.$route.params.slug);
    this.$store.dispatch("resources/articlType", this.$route.params.articlType);
  },
  beforeRouteUpdate(to, from) {
    if (to.params.articlType !== from.params.articlType) {
      this.$store.dispatch("resources/articlType", to.params.articlType);
    }
    if (to.params.slug !== from.params.slug) {
      this.$store.dispatch("resources/slug", to.params.slug);
      this.getCategoryResources(to.params.slug);
    }
  },
  methods: {

    async getCategoryResources(slug) {
      try {
        this.isLoading = true;
        const results = await this.fetchData(slug);
        this.updateValues(results);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
      finally {
        this.isLoading = false;
      }
    },

    updateValues(results) {

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

        if (results.articls?.length) {
          this.$store.dispatch("resources/articls", results.articls);
        } else {
          this.$store.dispatch("resources/articls", []);
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
      const articlTypes = result.articls ? Object.keys(result.data.articls) : [];
      return {
        breadcrumbs: result.data.breadcrumbs,
        categories: result.data.categories,
        category: result.data.category,
        articlTypes,
        articls: result.data.articls,
        notes: result.data.notes,
      };
    },
  },

}
</script>