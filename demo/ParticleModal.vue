<template>
  <div class="modal" v-if="show">
    <div class="modal__content">
      <span class="modal__close" @click="close">&times;</span>
      <h3 class="subheading">Particle Options</h3>
      <particle-options
        showUrl
        v-model="options"
      />
      <div class="modal__footer">
        <button class="button" @click="add">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
  import ParticleOptions from './ParticleOptions.vue';

  export default {
    data() {
      return {
        options: {
          type: 'rect',
          size: 10,
          dropRate: 10,
        },
      };
    },

    props: {
      show: Boolean,
    },

    components: {
      ParticleOptions,
    },

    methods: {
      close() {
        this.$emit('close');
      },

      add() {
        console.log(this.options);
        this.$emit('add', this.options);
        this.close();
      }
    },
  }
</script>
