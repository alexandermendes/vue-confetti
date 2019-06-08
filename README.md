# vue-confetti

[![npm version](https://badge.fury.io/js/vue-confetti.svg)](https://badge.fury.io/js/vue-confetti)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

:tada: A Vue component for dropping confetti :tada:

![Example animation](example.gif)

[View the demo](https://alexandermendes.github.io/vue-confetti/)

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
    <button @click="love">Show some love</button>
  </main>
</template>

<script>
  import Vue from 'vue'
  import VueConfetti from 'vue-confetti'

  Vue.use(VueConfetti)

  export default {
    methods: {
      start() {
        this.$confetti.start();
      },

      stop() {
        this.$confetti.stop();
      }

      love() {
        this.$confetti.update({
          shape: 'heart',
          colors: [
            'red',
            'pink',
            '#ba0000'
          ],
        });
      }
    }
  }
</script>
```

## Configuration

The following options can be passed to `$confetti.start()` or `$confetti.update()`:

| Property | Type              | Description                                                               | Default   |
|----------|-------------------|---------------------------------------------------------------------------|-----------|
| shape    | String            | The shape of the confetti (`'circle'`, `'rect'`, `'heart'` or `'image'`). | 'circle'  |
| size     | Number            | The size of the particles (should be a positive number).                  | 10        |
| dropRate | Number            | The speed at which the particles fall.                                    | 10        |
| colors   | Array             | The confetti colors.                                                      | ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson'] |
| image    | [CanvasImageSource](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) | A custom image, SVG or video element to be used as the particle. Note that `shape` must be set to `image`. | null        |

### Examples

#### Red and pink hearts:

``` js
$confetti.start({
  shape: 'heart',
  colors: [
    'red',
    'pink',
    '#ba0000',
  ],
});
```

#### Custom image:

``` js
const image = document.createElement('img');
image.setAttribute('src', 'http://placekitten.com/50/50');

$confetti.start({
  shape: 'image',
  image,
});
```

## Development

The following scripts are available for local development:

```bash
# test
npm run test

# run with webpack watch
npm run dev

# build for production
npm run build
```

Note that vue-confetti enforces
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)
to help automate the release process. Whenever code is merged into master the next
[semantic version](https://semver.org/) number is automatically determined, a
changelog generated and the release published.
