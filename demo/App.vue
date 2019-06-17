<template>
  <div>
    <header class="header">
      <a
        class="button button--text button--small"
        href="https://github.com/alexandermendes/vue-confetti"
      >
        View on GitHub
      </a>
      <button class="button button--secondary button--small" @click="start">Start</button>
      <button class="button button--secondary button--small" @click="stop">Stop</button>
    </header>
    <main>
      <div class="masthead">
        <h1 class="masthead__title">Vue Confetti</h1>
        <a class="masthead__badge" href="https://badge.fury.io/js/vue-confetti">
          <img
            src="https://badge.fury.io/js/vue-confetti.svg"
            alt="npm version"
            height="18"
          >
        </a>
        <div class="masthead__buttons">
          <button class="button" @click="start">Start</button>
          <button class="button" @click="stop">Stop</button>
        </div>
      </div>

      <section>
        <h2 class="subheading">Defaults</h2>
        <p class="content">
          Define the default particle settings. These settings can be overridden
          by the associated particle settings in the table below.
        </p>
        <particle-options
          v-model="defaultOptions"
        />
      </section>

      <section>
        <h2 class="subheading">Particle Settings</h2>
        <p class="content">
          Define custom settings for multiple particle types.
        </p>

        <table class="table">
          <tr>
            <th class="table__cell table__cell--header">Type</th>
            <th class="table__cell table__cell--header">Size</th>
            <th class="table__cell table__cell--header">Drop Rate</th>
            <th class="table__cell table__cell--header">URL</th>
            <th class="table__cell table__cell--header">Actions</th>
          </tr>
          <tr
            v-for="(particle, index) in particles"
            :key="index"
          >
            <td class="table__cell">{{ particle.type || 'default'  }}</td>
            <td class="table__cell">{{ particle.size || 'default' }}</td>
            <td class="table__cell">{{ particle.dropRate || 'default'  }}</td>
            <td class="table__cell">{{ particle.url || 'none'  }}</td>
            <td class="table__cell">
              <button class="button button--text" @click="removeRow(index)">Remove</button>
            </td>
          </tr>
        </table>
        <div class="table__buttons">
          <button class="button button--secondary" @click="addRow">Add Row</button>
        </div>
      </section>

      <section>
        <h2 class="subheading">Global Settings</h2>
        <p class="content">
          The settings below apply to all particles.
        </p>

        <div class="input-group">
          <label for="particles-per-frame">
            <small>Particles per frame:</small>
          </label>
          <input
            v-model="particlesPerFrame"
            id="particles-per-frame"
            class="input"
            type="number"
            min="1"
            max="100"
            step="1"
          >
        </div>

      </section>

      <section>
        <h2 class="subheading">Custom Canvas</h2>
        <p class="content">
          The confetti can be attached to a custom canvas.
        </p>

        <div class="input-group">
          <label for="custom-canvas-cb">
            <small>Use custom canvas</small>
          </label>
          <input
            v-model="customCanvas"
            type="checkbox"
            class="input input--checkbox"
            id="custom-canvas-cb"
          />
        </div>

        <canvas
          id="custom-canvas"
          width="500"
          height="200"
          style="border:1px solid #000000;"
        />

      </section>

      <particle-modal
        :show="showParticleModal"
        @close="showParticleModal = false"
        @add="addParticle"
      />

    </main>
  </div>
</template>

<script>
  import ParticleOptions from './ParticleOptions.vue';
  import ParticleModal from './ParticleModal.vue';

  export default {
    data() {
      return {
        showParticleModal: false,
        particles:[
          {
            type: 'circle',
          },
          {
            type: 'rect',
          },
        ],

        customCanvas: false,
        particlesPerFrame: 2,
        defaultOptions: {},
      };
    },

    components: {
      ParticleOptions,
      ParticleModal,
    },

    computed: {
      options() {
        return {
          particles: this.particles,
          customCanvas: false,
          particlesPerFrame: 2,
          defaultType: this.defaultOptions.type,
          defaultSize: this.defaultOptions.size,
          defaultDropRate: this.defaultOptions.dropRate,
          canvasId: this.canvasId,
          particlesPerFrame: this.particlesPerFrame,
        }
      },

      canvasId() {
        return this.customCanvas ? 'custom-canvas' : null;
      },
    },

    methods: {
      start() {
        this.$confetti.start(this.options);
      },

      stop() {
        this.$confetti.stop();
      },

      addRow() {
        this.showParticleModal = true;
      },

      removeRow(index) {
        this.particles.splice(index, 1);
      },

      addParticle(options) {
        this.particles.push(options);
      },
    },

    watch: {
      options() {
        this.$confetti.update(this.options);
      }
    }
  }
</script>
