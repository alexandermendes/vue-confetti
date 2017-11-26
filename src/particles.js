import Particle from './particle'

class Particles {
  constructor (confettoOpts) {
    this.items = []
    this.pool = []
    this.confettoOpts = confettoOpts
  }

  update () {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].update() === true) {
        this.pool.push(this.items.splice(i--, 1)[0])
      }
    }
  }

  draw () {
    for (var i = 0; i < this.items.length; i++) {
      this.items[i].draw()
    }
  }

  add () {
    if (this.pool.length > 0) {
      this.items.push(this.pool.pop().setup(this.particleOpts))
    } else {
      this.items.push(new Particle().setup(this.particleOpts))
    }
  }
}

export default Particles
