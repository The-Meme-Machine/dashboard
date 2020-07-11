<template>
  <div id="app">
    <div id="nav">
      <transition>
        <div id="openMenu" @click="toggleMenu">
          <p v-if="!menu">Open Menu</p>
          <p v-else>Close Menu</p>
        </div>
      </transition>
      <transition name>
        <div class="navmenu" v-if="menu">
          <router-link to="/">Home</router-link>
          <router-link to="/hardware">Hardware</router-link>
          <router-link to="/dynamic">Clocks & Temperatures</router-link>
          <router-link to="/custom">Dashboard</router-link>
          <router-link to="/networks">Wifi Networks</router-link>
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
@import url("https://fonts.googleapis.com/css2?family=Quicksand&display=swap");

:root {
  /* background: linear-gradient(76deg, #0f4c81, #051622); */
  background: var(--background-primary);
  --background-primary: #051622;
  --background-secondary: #0f4c81;
  --foreground-primary: #1ba098;
  --foreground-secondary: #deb992;
}

#app {
  color: var(--foreground-secondary);
  font-family: "Quicksand";
}

#openMenu {
  cursor: pointer;
}

.navmenu {
  color: var(--foreground-secondary);
  display: flex;
  flex-direction: row;
}

.navmenu > * {
  flex: 1;
  text-align: center;
}

#nav a,
#nav a:visited {
  color: var(--foreground-secondary);
}

#nav a.router-link-exact-active {
  color: var(--foreground-primary);
}

div {
  color: var(--foreground-secondary);
}

h2 {
  color: var(--foreground-primary);
}

button {
  color: var(--foreground-secondary);
  background: var(--background-secondary);
  border: 1px solid var(--foreground-primary);
  border-radius: 3px;
  margin: 0.3rem;
}

hr {
  color: var(--foreground-primary);
  background-color: var(--foreground-primary);
  border-color: var(--foreground-primary);
}
</style>
