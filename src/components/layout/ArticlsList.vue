<template>
  <div>
    <articl-type-tabs />
    <div class="sort-container">
      <label for="sort-select">Sort By:</label>
      <select id="sort-select" v-model="sortBy" @change="sortArticlsBy">
        <option value="title">Title</option>
        <option value="year">Year Published</option>
        <option value="createdAt">Date Added</option>
      </select>
    </div>
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
      isLoading: false,
      sortBy: 'createdAt'
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
      return this.filteredArticls(this.articlType, this.sortBy);
    }
  },
  methods: {
 sortArticlsBy(e) {
    this.sortBy = e.target.value;
    this.$store.dispatch('resources/sortArticlsByAnyKey', { articlType: this.articlType, key: e.target.value });
    this.$router.push({ query: { sortBy: e.target.value } });
  },
  sortArticlsByAnyKey(articlType, sortBy) {
    console.log('Sorting By:', sortBy); // Debug log
    this.$store.dispatch("resources/sortArticlsByAnyKey", { articlType, sortBy });
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

<style scoped>
.sort-container {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
  font-weight: bold;
  color: #333;
}

select {
  max-width: 250px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
  font-size: 1rem;
  color: #333;
  transition: all 0.3s ease;
}

select:focus {
  border-color: #007BFF;
  outline: none;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
