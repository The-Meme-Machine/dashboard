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
        <transition>
          <stat :componentName="item.i" :index="index" v-if="hardware"></stat>
          <p v-else>Loading...</p>
        </transition>
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
  computed: {
    hardware() {
      return this.$store.state.staticHardware;
    }
  },
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
      this.$store.dispatch("resetHardware");
      this.getHardwareInfo();
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
  scrollbar-color: var(--foreground-secondary) var(--background-secondary);
}
.vue-grid-item:hover {
  /* overflow-y: scroll; */
  scrollbar-width: thin;
}
.vue-grid-item::-webkit-scrollbar {
  width: 0rem;
}
.vue-grid-item:hover::-webkit-scrollbar {
  width: 0.3rem;
}
.vue-grid-item::-webkit-scrollbar-track {
  /* width: 0.25rem; */
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0),
    var(--background-secondary)
  );
}
.vue-grid-item::-webkit-scrollbar-thumb {
  /* width: 0.25rem; */
  background: var(--foreground-secondary);
}

.vue-grid-item.vue-grid-placeholder {
  background: var(--background-secondary) !important;
}

.vue-grid-item > .vue-resizable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSIKCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiCgl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiCj4KCTxnIG9wYWNpdHk9IjAuOCI+CgkJPHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiNkZWI5OTIiLz4KCTwvZz4KPC9zdmc+");
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: se-resize;
}

.vue-grid-item > .vue-rtl-resizable-handle {
  bottom: 0;
  left: 0;
  background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAuMDAwMDAwMDAwMDAwMDAyIiBoZWlnaHQ9IjEwLjAwMDAwMDAwMDAwMDAwMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KIDwhLS0gQ3JlYXRlZCB3aXRoIE1ldGhvZCBEcmF3IC0gaHR0cDovL2dpdGh1Yi5jb20vZHVvcGl4ZWwvTWV0aG9kLURyYXcvIC0tPgogPGc+CiAgPHRpdGxlPmJhY2tncm91bmQ8L3RpdGxlPgogIDxyZWN0IGZpbGw9Im5vbmUiIGlkPSJjYW52YXNfYmFja2dyb3VuZCIgaGVpZ2h0PSIxMiIgd2lkdGg9IjEyIiB5PSItMSIgeD0iLTEiLz4KICA8ZyBkaXNwbGF5PSJub25lIiBvdmVyZmxvdz0idmlzaWJsZSIgeT0iMCIgeD0iMCIgaGVpZ2h0PSIxMDAlIiB3aWR0aD0iMTAwJSIgaWQ9ImNhbnZhc0dyaWQiPgogICA8cmVjdCBmaWxsPSJ1cmwoI2dyaWRwYXR0ZXJuKSIgc3Ryb2tlLXdpZHRoPSIwIiB5PSIwIiB4PSIwIiBoZWlnaHQ9IjEwMCUiIHdpZHRoPSIxMDAlIi8+CiAgPC9nPgogPC9nPgogPGc+CiAgPHRpdGxlPkxheWVyIDE8L3RpdGxlPgogIDxsaW5lIGNhbnZhcz0iI2ZmZmZmZiIgY2FudmFzLW9wYWNpdHk9IjEiIHN0cm9rZS1saW5lY2FwPSJ1bmRlZmluZWQiIHN0cm9rZS1saW5lam9pbj0idW5kZWZpbmVkIiBpZD0ic3ZnXzEiIHkyPSItNzAuMTc4NDA3IiB4Mj0iMTI0LjQ2NDE3NSIgeTE9Ii0zOC4zOTI3MzciIHgxPSIxNDQuODIxMjg5IiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlPSIjMDAwIiBmaWxsPSJub25lIi8+CiAgPGxpbmUgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z181IiB5Mj0iOS4xMDY5NTciIHgyPSIwLjk0NzI0NyIgeTE9Ii0wLjAxODEyOCIgeDE9IjAuOTQ3MjQ3IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz4KICA8bGluZSBzdHJva2UtbGluZWNhcD0idW5kZWZpbmVkIiBzdHJva2UtbGluZWpvaW49InVuZGVmaW5lZCIgaWQ9InN2Z183IiB5Mj0iOSIgeDI9IjEwLjA3MzUyOSIgeTE9IjkiIHgxPSItMC42NTU2NCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiM2NjY2NjYiIGZpbGw9Im5vbmUiLz4KIDwvZz4KPC9zdmc+);
  background-position: bottom left;
  padding-left: 3px;
  background-repeat: no-repeat;
  background-origin: content-box;
  cursor: sw-resize;
  right: auto;
}
</style>