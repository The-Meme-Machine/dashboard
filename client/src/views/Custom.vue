<template>
  <div class="custom">
    <grid-layout
      :layout.sync="layout"
      :is-resizable="true"
      :is-draggable="true"
      :vertical-compact="true"
      @layout-updated="updateLayout"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="item.i"
        :i="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :dragIgnoreFrom="'select'"
      >
        <stat :componentName="item.i" :index="index"></stat>
      </grid-item>
    </grid-layout>
    <button @click="resetLayout">Reset Layout</button>
    <button @click="updateStaticInfo">Refresh Hardware</button>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
// Hardware static components
import stat from "@/components/static/component";

export default {
  name: "customDashboard",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    stat
  },
  data() {
    return {
      layout: this.$store.state.customLayout,
      error: null
    };
  },
  computed: {},
  methods: {
    resetLayout() {
      this.$store.dispatch("resetLayout");
      this.layout = this.$store.state.customLayout;
    },
    updateLayout() {
      console.log("updated");
      this.$store.dispatch("setLayout", { layout: this.layout });
    },
    getHardwareInfo() {
      this.$axios({
        method: "GET",
        url: "/hardware/static",
        headers: {}
      })
        .then(res => {
          console.log(res);
          this.$store.dispatch("setHardware", { data: res.data });
        })
        .catch(err => {
          console.error(
            `Error ${err.response.status}. Could not retrieve system details.`
          );
          this.error = err.response.data;
        });
    },
    updateStaticInfo() {
      this.getHardwareInfo();
      this.$store.dispatch("resetHardware");
    }
  },
  mounted() {
    if (this.$store.state.staticHardware) {
      console.log("Using cached version");
    } else {
      this.getHardwareInfo();
    }
  }
};
</script>

<style>
.vue-grid-item {
  /* overflow-y: hidden; */
  overflow-x: hidden;
  transition: ease-in-out;
  scrollbar-width: none;
  scrollbar-color: #42b983 lightgray;
}
.vue-grid-item:hover {
  /* overflow-y: scroll; */
  scrollbar-width: thin;
}
.vue-grid-item::-webkit-scrollbar {
  width: 0rem;
}
.vue-grid-item:hover::-webkit-scrollbar {
  width: 0.25rem;
}
.vue-grid-item::-webkit-scrollbar-track {
  /* width: 0.25rem; */
  background: lightgray;
}
.vue-grid-item::-webkit-scrollbar-thumb {
  /* width: 0.25rem; */
  background: #42b983;
}
</style>