# vue-confetti

[![npm version](https://badge.fury.io/js/vue-confetti.svg)](https://badge.fury.io/js/vue-confetti)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

:tada: A Vue component for dropping confetti :tada:

![Example animation](example.gif)

[View the demo](https://alexandermendes.github.io/vue-confetti/)

## Installation

```
yarn add vue-confetti
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
      },

      love() {
        this.$confetti.update({
          particles: [
            {
              type: 'heart',
            },
            {
              type: 'circle',
            },
          ],
          defaultColors: [
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

### Usage with Nuxt

As this plugin relies on browser globals, such as `window`, it will not work
when server-side rendered. The following example shows how to get this to
add as a client-side only plugin with [Nuxt](https://nuxtjs.org/).

Register vue-confetti in your [Nuxt plugins](https://nuxtjs.org/guide/plugins/) folder
(e.g. at `your-repo/plugins/vue-confetti`):

```js
import Vue from 'vue';
import VueConfetti from 'vue-confetti';

Vue.use(VueConfetti);
```

Register the plugin in your [Nuxt config](https://nuxtjs.org/guide/configuration):

```js
export default {
  plugins: [
    { src: '~/plugins/vue-confetti.js', mode: 'client' },
  ],
};
```

## Configuration

The following options can be passed to `$confetti.start()` or `$confetti.update()`:

| Property          | Type   | Description                                                               | Default   |
|-------------------|--------|---------------------------------------------------------------------------|-----------|
| particles         | Array  | The settings for each particle type (see below).                          | 10        |
| defaultType       | String | The default particle type.                                                | 'circle'  |
| defaultSize       | Number | The default size of all particles (should be a positive number).          | 10        |
| defaultDropRate   | Number | The default speed at which the particles fall.                            | 10        |
| defaultColors     | Array  | The default particle colors.                                              | ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson'] |
| canvasId          | String | The ID for a custom canvas element (the default is to append a canvas to the `<body>` element).     | null |
| canvasElement     | HTMLCanvasElement | A custom canvas element (the default is to append a canvas to the `<body>` element).     | null |
| particlesPerFrame | Number | The number of particles to drop per animation frame.                      | 2         |
| windSpeedMax      | Number | The maximum wind speed (disabling the wind by setting to 0 can be useful for slower drop rates). | 1         |

The following options can be passed to each item in `particles`:

| Property          | Type   | Description                                                               | Default   |
|-------------------|--------|---------------------------------------------------------------------------|-----------|
| type              | String | The type of particle (`'circle'`, `'rect'`, `'heart'` or `'image'`).      | 'circle'  |
| size              | Number | The size of the particles (should be a positive number).                  | 10        |
| dropRate          | Number | The speed at which the particles fall.                                    | 10        |
| colors            | Array  | The particle colors.                                                      | ['DodgerBlue', 'OliveDrab', 'Gold', 'pink', 'SlateBlue', 'lightblue', 'Violet', 'PaleGreen', 'SteelBlue', 'SandyBrown', 'Chocolate', 'Crimson'] |
| url               | String | The path to a custom image or SVG to use as the particle. Note that `type` must be set to `image`. | null |

### Examples

#### Red and pink hearts:

``` js
$confetti.start({
  particles: [
    {
      type: 'heart',
    }
  ],
  defaultColors: [
    'red',
    'pink',
    '#ba0000',
  ],
});
```

#### Custom image:

``` js
$confetti.start({
  particles: [
    {
      type: 'image',
      url: 'http://placekitten.com/50/50',
    },
  ],
});
```

#### Custom canvas:

##### By id:
``` js
$confetti.start({
  canvasId: 'my-custom-canvas',
});
```

##### By element reference:
``` js
$confetti.start({
  canvasElement: document.getElementById('my-custom-canvas'),
});
```

#### Less particles per frame:

``` js
$confetti.start({
  particlesPerFrame: 0.25,
});
```

#### Multiple particle types:

``` js
$confetti.start({
  particles: [
    {
      type: 'heart',
      colors: [
        'red',
        'pink',
      ],
    },
    {
      type: 'circle',
      colors: [
        '#ba0000',
      ],
    },
    {
      type: 'image',
      size: 15,
      url: 'http://example.org/my-icon.svg',
    },
  ],
  defaultDropRate: 5,
  defaultSize: 5,
});
```

## Development

The following scripts are available for local development:

```bash
# test
yarn run test

# run with webpack watch
yarn run dev

# build for production
yarn run build

# serve the demo page (watch for changes from another terminal)
yarn run demo
```

Note that vue-confetti enforces
[conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.3/)
to help automate the release process. Whenever code is merged into master the next
[semantic version](https://semver.org/) number is automatically determined, a
changelog generated and the release published.

