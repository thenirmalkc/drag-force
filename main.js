const width = 600
const height = 600

let balls

function setup() {
  const canvas = createCanvas(width, height)
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)

  balls = []

  for(let i = 1; i <= 5; i ++) {
    balls.push(new Ball(i * 100, 25))
    balls[i - 1].set_mass(Math.random() * 2 + 1)
  }
}

function draw() {
  background(240)

  fill(200)
  rect(0, 300, width, height)

  for(let i = 0; i < balls.length; i ++) {

    // gravity force
    const force_gravity = new Vector2D(0, 0.08)

    // applying gravity to ball
    balls[i].apply_force(force_gravity.mult(balls[i].mass))
    balls[i].update()

    if(balls[i].position.y >= 300) {
      // drag force
      const drag_force = new Vector2D(0, 0)
      drag_force.add(balls[i].velocity)
      drag_force.normalize()
      drag_force.mult(-1)
      const c = 0.1 // all constants
      const speed = balls[i].velocity.mag()
      drag_force.mult(c * speed * speed)

      // applying drag to ball
      balls[i].apply_force(drag_force)
      balls[i].update()
    }

    balls[i].check_edges()
    balls[i].display()
  }
}

function mousePressed() {
  if(mouseX < 0 || mouseY < 0 || mouseX > width - 1 || mouseY > height - 1) return
  setup()
}
