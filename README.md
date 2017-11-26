# vue-confetti

A Vue component for dropping confetti :tada:

## Installation

```
npm install vue-confetti --save
```

## Usage

``` vue
<template>
  <main>
    <button @click="start">Start</button>
    <button @click="stop">Stop</button>
  </main>
</template>

<script>
  import Vue from 'vue'
  import VueConfetti from 'vue-confetti'

  Vue.use(VueConfetti)

  export default {
    methods: {
      start () {
        this.$confetti.start()
      },

      stop () {
        this.$confetti.stop()
      }
    }
  }
</script>
```

## Configuration

| Property | type  | description          |
|----------|-------|----------------------|
| colors   | Array | The confetti colors. |
