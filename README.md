# vue-confetti

[![npm version](https://badge.fury.io/js/vue-confetti.svg)](https://badge.fury.io/js/vue-confetti)

:tada: A Vue component for dropping confetti :tada:

![Example animation](example.gif)

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

The following options can be passed to `$confetti.start()`:

| Property | Type   | Description                                                     | Default |
|----------|--------|-----------------------------------------------------------------|---------|
| colors   | Array  | The confetti colors.                                            | ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson']
| shape    | String | The shape of the confetti (`'circle'`, `'rect'`, or `'heart'`). | 'circle'|

### Example

``` js
$confetti.start({
  shape: 'heart',
  colors: ['red', 'pink', '#ba0000']
})
```
