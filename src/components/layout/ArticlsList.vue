<template>
  <div>ArticlsList articlTypes {{ articlTypes }}<br>
    articlTypeCurrent:{{ articlTypeCurrent }}<br>
    <ul class="nav-tabs nav-tabs-inner-margin">
      <li
        v-for="articlType in articlTypes"
        :key="articlType"
        :class="{ active: articlTypeCurrent === articlType }">
        <a
          href
          @click.prevent="articlTypeCurrent = articlType"
          @keyup.enter.prevent="articlTypeCurrent = articlType">
          {{ articlType }}</a>
      </li>
    </ul>

    <ul
      v-for="articl in articls[articlTypeCurrent]"
      :key="articl.id"
      class="nav-inner-content">
      <articls-list-item :articl="articl" />
    </ul>

    <div v-if="(articls[articlTypeCurrent]?.length === 0)">
      No entries yet.
    </div>

  </div>
</template>

<script>
import ArticlsListItem from "@/components/layout/ArticlsListItem.vue";
import { mapGetters } from "vuex";

import axiosInstance from "@/services/axiosService";

export default {
  name: "ArticlsList",
  components: {
    ArticlsListItem,
  },
  data() {
    return {
      articlType: "",
      articlTypeCurrent: "",
    };
  },
  computed: {
    ...mapGetters({
      articls: "resources/articls",
      articlTypes: "resources/articlTypes",
      initialArticlType: "resources/initialArticlType",
    }),
  },
  created() {
    this.articlTypeCurrent = this.initialArticlType;
  },
  methods: {

    updateArticlsOrderValues(articlType) {
      try {
        this.articls[articlType].forEach((obj, index) => {
          const objRef = obj;

          objRef.order = index;
        });
      } catch (error) {
        this.$store.dispatch("errors/setError", error);
      }
    },

    async saveArticlsOrderValues(articlType) {
      try {
        const order = this.articls[articlType].map((obj) => ({
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
      this.updateArticlsOrderValues(this.initialArticlType);

      this.saveArticlsOrderValues(this.initialArticlType);
    },
  },
};

</script>
