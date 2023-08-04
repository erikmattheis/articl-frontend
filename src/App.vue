<template>
  <div class="vertical-container">
    <the-header />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <the-footer />
  </div>
  <modal-error />
  <modal-success />
</template>

<script>
/* VUE
 * 1939,1200, 1,244, 1983, 1883 .js
 *  538, 3250, 3,623, 3,910, 5,475, 6109 .vue
 *

 vue  49  6,109  440  767  7,316
JavaScript  18  1,098  56  269  1,423. 1098
SCSS  4  124  164  64  352
 *
 * NODE
 * 2706,2,487, 2,553, 3842 .js
 *
 * 4/15, 5/20, 6/1, 6
 * 5183,6937,7420, ,112
 * ==================
 *
 * proj, 4/15, 6/8
 * vue, 2556, 5223
 * node, 2094, 2593
 * total, 4650, 7816
 *** */

import { mapGetters } from "vuex";

import TheFooter from "@/components/layout/TheFooter.vue";
import TheHeader from "@/components/layout/TheHeader.vue";
import ModalError from "@/components/ui/ModalError.vue";
import ModalSuccess from "@/components/ui/ModalSuccess.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheFooter,
    ModalError,
    ModalSuccess,
  },
  data() {
    return {
      routeTransitionClass: "", // Initialize the class for the fade-in effect
    };
  },
  computed: {
    ...mapGetters({
      slug: "resources/slug",
      articlType: "resources/articlType",
    }),
  },

  mounted() {
    const user = this.$cookies.get("user");
    if (user) {
      this.$store.dispatch("users/setUser", user);
      /*
      this.$store.dispatch("resources/articlType", "salad");
      this.$store.dispatch("resources/slug", "salad");
      */
    }
  },
};
</script>


<style lang="scss">
@import "@/assets/global.scss";
</style>
