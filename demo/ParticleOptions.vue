<template>
  <div>
    <div class="input-group">
      <label for="type">
        <small>Type:</small>
      </label>
      <select
        class="input"
        v-model="type"
        id="type"
      >
        <option value="rect">Rectangle</option>
        <option value="circle">Circle</option>
        <option value="heart">Heart</option>
        <option value="image">Custom Image</option>
      </select>
    </div>

    <div class="input-group">
      <label for="size">
        <small>Size:</small>
      </label>
      <input
        class="input"
        v-model="size"
        id="size"
        type="number"
        min="1"
        max="100"
        step="1"
      >
    </div>

    <div class="input-group">
      <label for="drop-rate">
        <small>Drop rate:</small>
      </label>
      <input
        v-model="dropRate"
        class="input"
        id="drop-rate"
        type="number"
        min="1"
        max="20"
        step="1"
      >
    </div>

    <div
      class="input-group"
      v-if="type === 'image'"
    >
      <label for="url">
        <small>URL:</small>
      </label>
      <select
        class="input"
        v-model="url"
        id="url"
      >
        <option value="">None</option>
        <option value="http://placekitten.com/50/50">http://placekitten.com/50/50</option>
        <option value="svgs/github-icon.svg">svgs/github-icon.svg</option>
      </select>
    </div>
  </div>
</template>


<script>
  export default {
    props: {
      value: Object,
      showUrl: Boolean,
    },

    data() {
      return {
        type: 'rect',
        size: 10,
        dropRate: 10,
        url: '',
      };
    },

    methods: {
      emitInput() {
        this.$emit('input', {
          type: this.type,
          size: this.size,
          dropRate: this.dropRate,
          url: this.url,
        });
      }
    },

    watch: {
      type: function () { this.emitInput() },
      size: function () { this.emitInput() },
      dropRate: function () { this.emitInput() },
      url: function () { this.emitInput() },
    },
  }
</script>
