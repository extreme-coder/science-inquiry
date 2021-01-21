let simPlaying
let backgroundVal = 0

class Projectile{
  constructor(){
    this.xPos = 20
    this.yPos = 750
    this.objType = 'ball'
    this.objWidth = 75
    this.vel = 1000
    this.angle = 30
    this.grav = 980
    this.cor = 1
    this.dragCoef = 0.5
    this.area = PI * (this.objWidth / 2) ^ 2 //referring to cross-sectional area
    this.fluidDensity = 1.2 / 1000000
    this.isLaunched = false
  }

  setVarsToDefault() {
    this.xPos = 20
    this.yPos = 750
    this.objType = 'ball'
    this.objWidth = 75
    this.vel = velSlider.value()
    this.angle = angleSlider.value()
    this.grav = 980
    this.cor = corSlider.value()
    this.dragCoef = 0.5
    this.area = PI * (this.objWidth / 2) ^ 2 //referring to cross-sectional area
    this.fluidDensity = 1.2 / 1000000
    this.isLaunched = false
  }

  airResistance(xVel, yVel) {
    let dragForce = this.dragCoef * this.fluidDensity * (abs(this.vel) ^ 2) * this.area / 2 //determine drag force
    let newXVel = xVel - dragForce * cos(radians(this.angle)) / 60 //apply drag to x velocity
    let newYVel = yVel
    if (yVel > 0) { //apply drag to y velocity
      newYVel -= dragForce * sin(radians(this.angle))/60
    } else if (yVel < 0) {
      newYVel += dragForce * sin(radians(this.angle))/60
    }
  }
  
  updateVars() { //updates the velocities and positions every draw
    let xVel = this.vel*cos(radians(this.angle)) //x-component of velocity
    let yVel = this.vel * sin(radians(this.angle)) //y-component of velocity
    if (this.yPos >= 750 && this.isLaunched) { //checks if ball makes contact with ground
      yVel = -yVel * this.cor //applies conservation of momentum to bounce ball upward
      xVel = xVel * this.cor
    } else {
      yVel -= this.grav / 60 //continues gravitation acceleration
      this.isLaunched = true
    }
    this.xPos += xVel/60 //updates positions
    this.yPos -= yVel/60
    this.vel = sqrt(xVel**2+yVel**2) //rejoins updated velocity components into one magnitude and direction variable
    this.angle = degrees(atan2(yVel, xVel))
  }
  
  draw() {
    //draw object
    colorMode(RGB)
    fill(0)
    stroke(0)
    strokeWeight(1)
    circle(this.xPos + (this.objWidth / 2), this.yPos - (this.objWidth / 2), this.objWidth)
    if (simPlaying) {
      this.updateVars()
    } else {
      this.setVarsToDefault()
    }
    //draw velocity vector
    if (simPlaying == false) {
      let centerX = this.xPos + (this.objWidth / 2)
      let centerY = this.yPos - (this.objWidth / 2)
      let arrowX = this.vel/5 * cos(radians(this.angle))
      let arrowY = this.vel / 5 * sin(radians(this.angle))
      let tipX = centerX + arrowX
      let tipY = centerY - arrowY
      let leftTipX = 30 * sin(radians(this.angle - 45))
      let leftTipY = 30 * cos(radians(this.angle - 45))
      let rightTipX = 30 * sin(radians(this.angle - 135))
      let rightTipY = 30 * cos(radians(this.angle - 135))
      strokeWeight(8)
      line(centerX, centerY, tipX, tipY)
      line(tipX, tipY, tipX+leftTipX, tipY+leftTipY)
      line(tipX, tipY, tipX+rightTipX, tipY+rightTipY)
    }
  }
}

function setup() {
  createCanvas(1200, 800);
  p = new Projectile()
  simPlaying = false
  //create sliders:
  velSlider = createSlider(500, 1500, 1000, 50)
  velSlider.position(80, 40)
  angleSlider = createSlider(0, 90, 30, 5)
  angleSlider.position(80, 65)
  corSlider = createSlider(0, 1, 1, 0.05)
  corSlider.position(350, 40)
}

function draw() {
  colorMode(HSB)
  background(backgroundVal%360,100,100,1);
  rect(0,750,1200,50)
  p.draw()
  backgroundVal += 1
  //draw sliders:
  strokeWeight(1)
  textSize(24)
  text('Launch Values', 10, 30)
  text('Projectile Values', 275, 30)
  textSize(18)
  text('Velocity:', 10, 55)
  text(velSlider.value()/100 + ' m/s', 215, 55)
  text('Angle:', 10, 80)
  text(angleSlider.value() + ' deg', 215, 80)
  text('Elasticity:', 275, 55)
  text(p.cor*100 + '%', 480, 55)
}

function keyPressed() {
  if (key == ' ') {
    if (simPlaying) {
      simPlaying = false
    } else {
      simPlaying = true
    }
  }
}
