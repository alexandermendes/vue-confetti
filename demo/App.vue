<template>
  <main>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
    <select ref="shape">
      <option value="heart">Heart</option>
      <option value="rect">Rectangle</option>
      <option value="circle">Circle</option>
    </select>
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
