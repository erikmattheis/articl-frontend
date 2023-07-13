<!--

<template>
  <div>DragableItems
    <div
      v-for="(item, index) in items"
      :key="item.id">

      <categories-list-item v-if="1 === 1" :category="item"></categories-list-item>
      <articls-list-item v-else :articl="item"></articls-list-item>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: 'DraggableItems',
  components: {
    CategoriesListItem,
    ArticlsListItem,
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
-->

<template>
  <div>
    <draggable v-model="items" @start="handleDragStart" @end="handleDragEnd" @add="handleDrop">
      <template #item="{ element, index }">
        <component :is="getItemComponent(element)" :item="element"
          :class="{ dragging: isDragging && index === dragIndex, 'drop-target': isDropTarget && index === dropIndex }">
        </component>
      </template>
    </draggable>
  </div>
</template>

<script>

import { VueDraggableNext } from 'vue-draggable-next';
import CategoriesListItem from '@/components/layout/CategoriesListItem.vue';
import ArticlsListItem from '@/components/layout/ArticlsListItem.vue';
import axios from 'axios';

export default {
  components: {
    draggable: VueDraggableNext
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    articles: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      items: [],
      isDragging: false,
      dragIndex: null,
      isDropTarget: false,
      dropIndex: null
    };
  },
  methods: {
    getItemComponent(item) {
      return item.category ? 'CategoriesListItem' : 'ArticlListItem';
    },
    handleDragStart(event) {
      this.isDragging = true;
      this.dragIndex = event.oldIndex;
    },
    handleDragEnd() {
      this.isDragging = false;
      this.dragIndex = null;
      this.isDropTarget = false;
      this.dropIndex = null;
    },
    handleDrop(event) {
      this.isDropTarget = true;
      this.dropIndex = event.newIndex;
      this.updateArray();
    },
    updateArray() {
      const updatedArray = this.items.map((item, index) => {
        return { ...item, order: index };
      });

      // Example Axios POST request to send the updated array
      axios.post('/api/updateArray', updatedArray)
        .then(response => {
          // Handle the response
        })
        .catch(error => {
          // Handle the error
        });
    }
  },
  watch: {
    categories: {
      immediate: true,
      handler(newVal) {
        this.items = newVal;
      }
    },
    articles: {
      immediate: true,
      handler(newVal) {
        this.items = newVal;
      }
    }
  }
};
</script>
