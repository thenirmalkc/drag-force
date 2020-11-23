class Ball {

  constructor(x, y) {
    this.position = new Vector2D(x, y)
    this.velocity = new Vector2D(0, 0)
    this.acceleration = new Vector2D(0, 0)

    this.mass = 1
  }

  set_mass(mass) {
    this.mass = mass
  }

  apply_force(force) {
    // calculating acceleration

    // force = mass * acceleration
    // acceleration = force / mass

    force = force.copy()
    this.acceleration.add(force.div(this.mass))
  }

  update() {
    // calculating velocity
    this.velocity.add(this.acceleration)

    // calculating position
    this.position.add(this.velocity)

    // reset acceleration
    this.acceleration.mult(0)

  }

  check_edges() {
    if(this.position.x < 0) {
      this.position.x = 0
      this.velocity.x *= -1
    }
    else if(this.position > width - 1) {
      this.position.x = width - 1
      this.velocity.x *= -1
    }

    if(this.position.y < 0) {
      this.position.y = 0
      this.velocity.y *= -1
    }
    else if(this.position.y > height - 1) {
      this.position.y = height - 1
      this.velocity.y *= -1
    }
  }


  display() {
    noStroke()
    fill(100)
    circle(this.position.x, this.position.y, this.mass * 20)
  }

}