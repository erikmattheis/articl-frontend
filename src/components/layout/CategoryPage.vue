<template>
  DraggableItems {{ items.length }}

  <div v-for="(item, index) in categories"
    :key="item.id">
    <categories-list-item :category="item"></categories-list-item>
  </div>

  <articls-list /
    </template>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import CategoriesListItem from '@/components/layout/CategoriesListItem.vue';
import ArticlsList from '@/components/layout/ArticlsList.vue';

import ArticlsListItem from '@/components/layout/ArticlsListItem.vue';

export default {
  name: 'DraggableItems',
  components: {
    CategoriesListItem,
    ArticlsList,
  },

  data() {
    return {
      draggingIndex: null,
    };
  },
  props: {
    items: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    ...mapGetters({
      categories: 'resources/categories',
      articls: 'resources/articls',
      treeLevel: 'resources/treeLevel',
    }),
  },
  methods: {
    handleDragStart(index) {
      this.draggingIndex = index;
    },
    handleDragEnd() {
      this.draggingIndex = null;
    },
    handleDragOver(event) {
      event.preventDefault();
    },
    handleDrop(targetIndex) {
      if (this.draggingIndex !== null) {
        const draggedItem = this.items[this.draggingIndex];
        this.items.splice(this.draggingIndex, 1);
        this.items.splice(targetIndex, 0, draggedItem);
      }
    },
  },
};
</script>