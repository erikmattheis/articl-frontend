<template>
  <div
    v-for="(item, index) in categories"
    :key="item.id">
    <categories-list-item :category="item" :tree-level="treeLevel"></categories-list-item>
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import CategoriesListItem from "@/components/layout/CategoriesListItem.vue";
import axiosInstance from "@/services/axiosService";

export default {
  name: "CategoriesList",
  components: {
    CategoriesListItem,
  },
  data() {
    return {
      TabName: "",
    };
  },
  computed: {
    ...mapGetters({
      categories: "resources/categories",
      treeLevel: "resources/treeLevel",
    }),
  },
  methods: {
    updateOrderValues() {
      try {
        this.categories.forEach((obj, index) => {
          const objRef = obj;

          objRef.order = index;
        });
        this.$store.dispatch("resources/categories", this.categories);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveOrderValues() {
      try {
        const order = this.categories.map((obj) => ({
          id: obj.id,
          order: obj.order,
        }));

        await this.saveOrder(order);
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveOrder(order) {
      this.isLoading = true;

      const result = await axiosInstance({
        method: "POST",
        url: "/categories/order",
        data: {
          order,
        },
      });

      this.isLoading = false;

      return result.data;
    },

    onUpdateOrderValues() {
      this.updateOrderValues();

      this.saveOrderValues();
    },

  },
};

</script>

<style scoped>
li {
  overflow-x: hidden;
}

a {
  cursor: pointer;
}
</style>
