<template>
  <div id="app">
    <div
      v-for="(item, index) in draggableItems"
      :key="item.id">
      <categories-list-item :item="item"></categories-list-item>
    </div>
  </div>
</template>

<script>
import CategoriesListItem from '@/components/layout/CategoriesListItem.vue';

export default {
  name: 'DraggableItems',

  data() {
    return {
      draggableItems: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' },
      ],
      draggingIndex: null,
    };
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
        const draggedItem = this.draggableItems[this.draggingIndex];
        this.draggableItems.splice(this.draggingIndex, 1);
        this.draggableItems.splice(targetIndex, 0, draggedItem);
      }
    },
  },
};
</script>