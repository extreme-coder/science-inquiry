let simPlaying
let backgroundVal = 0

class Projectile{
  constructor(){
    this.xPos = 20
    this.yPos = 750
    this.objType = 'ball'
    this.objWidth = 75
    this.vel = 1000
    this.angle = 60
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
    this.vel = 1000
    this.angle = 60
    this.grav = 980
    this.cor = 1
    this.dragCoef = 0.5
    this.area = PI * (this.objWidth / 2) ^ 2 //referring to cross-sectional area
    this.fluidDensity = 1.2 / 1000000
    this.isLaunched = false
  }

  setVel(vel){
    this.vel = vel*100
  }
  
  setAngle(a){
    this.angle = a
  }
  
  setGravity(g){
    this.grav = g*100
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
    if(this.yPos>=750&&this.isLaunched){ //checks if ball makes contact with ground
      yVel = -yVel*this.cor //applies conservation of momentum to bounce ball upward
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
    colorMode(RGB)
    fill(0)
    stroke(0)
    circle(this.xPos + (this.objWidth / 2), this.yPos - (this.objWidth / 2), this.objWidth)
    if (simPlaying) {
      this.updateVars()
    } else {
      this.setVarsToDefault()
    }
  }
}

function setup() {
  createCanvas(1200, 800);
  p = new Projectile()
  simPlaying = false
}

function draw() {
  console.log(backgroundVal)
  colorMode(HSB)
  background(backgroundVal%360,100,100,1);
  rect(0,750,1200,50)
  p.draw()
  backgroundVal+=1
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