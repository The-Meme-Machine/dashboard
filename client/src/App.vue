<template>
  <div id="app">
    <div id="nav">
      <transition>
        <div id="openMenu" @click="toggleMenu">
          <p>Open Menu</p>
        </div>
      </transition>
      <transition name>
        <div class="menu" v-if="menu">
          <router-link to="/">Home</router-link>
          <router-link to="/hardware">Hardware</router-link>
          <router-link to="/dynamic">Dynamic</router-link>
          <router-link to="/custom">Custom Dashboard</router-link>
        </div>
      </transition>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: false
    };
  },
  methods: {
    toggleMenu() {
      this.menu = !this.menu;
    }
  }
};
</script>

<style>
#app {
}

#nav {
}

#openMenu {
  cursor: pointer;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
