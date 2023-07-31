<template>
  <div>
    <articl-type-tabs />
    <select
      class="form-control"
      v-model="sortBy"
      @change="sortArticlsBy">
      <option value="title">Title</option>
      <option value="year">Year Published</option>
      <option value="createdAt">Date Added</option>
    </select>
    <ul class="nav-inner-content">
      <articls-list-item :articl="articl" v-for="(articl, index) in articls" :key="index" />
    </ul>

    <div v-if="(articls?.length === 0)">
      No entries yet.
    </div>
  </div>
</template>

<script>
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";
import ArticlTypeTabs from "@/components/layout/ArticlTypeTabs.vue";

import { mapGetters } from "vuex";

import axiosInstance from "@/services/axiosService";

export default {
  name: "ArticlsList",
  data() {
    return {
      sortBy: "createdAt",
      isLoading: false,
    };
  },
  components: {
    ArticlsListItem,
    ArticlTypeTabs,
  },
  computed: {
    ...mapGetters({
      filteredArticls: "resources/filteredArticls",
      articlType: "resources/articlType",
    }),
    articls() {
      return this.filteredArticls(this.articlType)
    }
  },
  methods: {
    sortArticlsBy(e) {
      console.log(e);
      this.sortArticlsByAnyKey(this.sortBy);
    },
    sortArticlsByAnyKey(key) {
      this.$store.dispatch("resources/sortArticlsByAnyKey", key);
    },
    updateArticlsOrderValues() {
      try {
        this.articls.forEach((obj, index) => {
          const objRef = obj;

          objRef.order = index;
        });
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveArticlsOrderValues() {
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
      this.updateArticlsOrderValues(this.articlType);

      this.saveArticlsOrderValues(this.articlType);
    },
  },
};

</script>
