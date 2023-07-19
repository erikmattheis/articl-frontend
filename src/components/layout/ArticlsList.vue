<template>
  slug: {{ slug }}<br>
  type: {{ type }}<br>
  <articl-type-tabs />

  <ul
    v-for="articl in articls"
    :key="articl.id"
    class="nav-inner-content">
    <articls-list-item :articl="articl" />
  </ul>

  <div v-if="(articls?.length === 0)">
    No entries yet.
  </div>
</template>

<script>
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";
import ArticlTypeTabs from "@/components/layout/ArticlTypeTabs.vue";

import { mapGetters } from "vuex";

import axiosInstance from "@/services/axiosService";

export default {
  name: "ArticlsList",
  components: {
    ArticlsListItem,
    ArticlTypeTabs,
  },
  data() {
    return {
      slug: this.$route.params.slug,
      type: this.$route.params.type,
    };
  },
  computed: {
    ...mapGetters({
      filteredArticls: "resources/filteredArticls",
      articlTypes: "resources/articlTypes",
      initialArticlType: "resources/initialArticlType",
    }),
    articls() {
      return this.filteredArticls(this.type)
    }
  },
  methods: {

    updateArticlsOrderValues(articlType) {
      try {
        this.articls.forEach((obj, index) => {
          const objRef = obj;

          objRef.order = index;
        });
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveArticlsOrderValues(articlType) {
      try {
        const order = this.articls.map((obj) => ({
          id: obj.id,
          order: obj.order,
        }));

        await this.saveArticlsOrder(order);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveArticlsOrder(order) {
      this.isLoading = true;

      const result = await axiosInstance({
        method: "POST",
        url: "/articls/order",
        data: {
          order,
        },
      });

      this.isLoading = false;

      return result.data;
    },

    onUpdateArticlsOrderValues() {
      this.updateArticlsOrderValues(this.type);

      this.saveArticlsOrderValues(this.type);
    },
  },
};

</script>
