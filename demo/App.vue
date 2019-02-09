<template>
  <main style="display: flex; justify-content: center; align-items: center;">
    <button @click="start" style="margin: 5px;">Start</button>
    <button @click="stop" style="margin: 5px;">Stop</button>
    <select ref="shape" style="margin: 5px;">
      <option value="heart">Heart</option>
      <option value="rect">Rectangle</option>
      <option value="circle">Circle</option>
    </select>
    <a
      href="https://badge.fury.io/js/vue-confetti"
      style="display: flex; margin: 5px;">
      <img
        src="https://badge.fury.io/js/vue-confetti.svg"
        alt="npm version"
        height="18">
    </a>
  </main>
</template>

<script>
  export default {
    methods: {
      start () {
        this.$confetti.start({
          shape: this.$refs.shape.value
        })
      },

      stop () {
        this.$confetti.stop()
      }
    }
  }
</script>
