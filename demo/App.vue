<template>
  <main style="display: flex; flex-direction: column; justify-content: center; align-items: center;">

    <div style="margin: 5px;">
      <button @click="start" style="margin: 5px;">Start</button>
      <button @click="stop" style="margin: 5px;">Stop</button>
    </div>

    <div style="margin: 5px;">
      <label for="size" style="margin-right: 5px;">
        <small>Size:</small>
      </label>
      <input v-model="size" id="size" type="number" min="1" max="100" step="1">
    </div>

    <div style="margin: 5px;">
      <label for="drop-rate" style="margin-right: 5px;">
        <small>Drop Rate:</small>
      </label>
      <input v-model="dropRate" id="drop-rate" type="number" min="1" max="20" step="1">
    </div>

    <div style="margin: 5px;">
      <label for="shape" style="margin-right: 5px;">
        <small>Shape:</small>
      </label>
      <select v-model="shape" id="shape">
        <option value="rect">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="heart">Heart</option>
        <option value="image">Custom Image</option>
      </select>
    </div>

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
    data() {
      return {
        shape: 'rect',
        size: 10,
        dropRate: 10,
      };
    },

    computed: {
      options() {
        return {
          shape: this.shape,
          size: this.size,
          dropRate: this.dropRate,
          image: this.getImageElement(),
        }
      },
    },

    methods: {
      start () {
        this.$confetti.start(this.options);
      },

      stop () {
        this.$confetti.stop();
      },

      getImageElement() {
        const img = document.createElement('img');
        img.setAttribute('src', 'http://placekitten.com/50/50');
        return img;
      }
    },

    watch: {
      options() {
        this.$confetti.update(this.options);
      }
    }
  }
</script>
