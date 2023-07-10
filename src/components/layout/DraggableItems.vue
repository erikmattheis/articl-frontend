<template>
  <div id="app">
    <div
      v-for="(item, index) in items"
      :key="item.id">draggable

      <categories-list-item v-if="item.oldId" :category="item"></categories-list-item>
      <articls-list-item v-else-if="item.oldId" :articl="item"></articls-list-item>
    </div>
  </div>
</template>

<script>
import CategoriesListItem from '@/components/layout/CategoriesListItem.vue';

export default {
  name: 'DraggableItems',
  components: {
    CategoriesListItem,
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