<template>
  <div class="custom">
    <grid-layout
      :layout.sync="layout"
      :is-resizable="true"
      :is-draggable="true"
      :vertical-compact="true"
      v-on:layout-updated="updateLayout"
    >
      <grid-item
        v-for="item in layout"
        :key="item.i"
        :i="item.i"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
      >{{item.i}}</grid-item>
    </grid-layout>
    <button @click="resetLayout">Reset Layout</button>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
// Hardware static components
import cpu from "@/components/static/cpu";

export default {
  name: "customDashboard",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    cpuStatic: cpu
  },
  data() {
    return {
      layout: this.$store.state.customLayout
    };
  },
  computed: {
    hardware() {
      return this.$store.state.staticHardware;
    }
    // layout() {
    //   return this.$store.state.customLayout;
    // }
  },
  methods: {
    resetLayout() {
      this.$store.dispatch("resetLayout");
      this.layout = this.$store.state.customLayout;
    },
    updateLayout() {
      console.log("updated");
      this.$store.dispatch("setLayout", { layout: this.layout });
    }
  }
};
</script>

<style>
</style>