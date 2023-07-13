<template>
  <div>CategoriesList
    <draggable-items :categories="categories" />
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import DraggableItems from "@/components/layout/DraggableItems.vue";
import axiosInstance from "@/services/axiosService";

export default {
  name: "CategoriesList",
  components: {
    DraggableItems,
  },
  data() {
    return {
      TabName: "",
    };
  },
  computed: {
    categoriesLocal: {
      get() {
        return this.categories.map((a) => a);
      },
      set(newValue) {
        this.$store.dispatch("resources/categories", newValue);
      },
    },
    ...mapGetters({
      categories: "resources/categories",
      treeLevel: "resources/treeLevel",
    }),
  },
  mounted() {
    this.TabName = this.treeLevel > 3 ? "ArticlsList" : "ResourceIndex";
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
