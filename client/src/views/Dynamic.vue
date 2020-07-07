<template>
  <div class="dynamic">
    <h1>System Stats</h1>
    <h5 v-if="lastPoll">{{lastPoll}}</h5>
  </div>
</template>

<script>
export default {
  name: "Dynamic",
  data() {
    return {
      lastPoll: null
    };
  },
  methods: {
    sendPoll() {
      // this.$axios()
    }
  },
  mounted() {}
};
</script>

<style>
</style>