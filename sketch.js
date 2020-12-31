function setup() {
  createCanvas(600, 400);
  p = new Projectile()
}

function draw() {
  background(94, 218, 255);
  rect(0,375,600,25)
  p.draw()
}

class Projectile{
  constructor(){
    this.xPos = 10
    this.yPos = 375
    this.objType = 'ball'
    this.objWidth = 37.5
    this.vel = 500
    this.angle = 60
    this.grav = 490
    this.cor = 1
  }
  
  setVel(vel){
    this.vel = vel*50
  }
  
  setAngle(a){
    this.angle = a
  }
  
  setGravity(g){
    this.grav = g*50
  }
  
  updateVars(){ //updates the velocities and positions every draw
    let xVel = this.vel*cos(radians(this.angle)) //x-component of velocity
    let yVel = this.vel*sin(radians(this.angle)) //y-component of velocity
    if(this.yPos>=375&&frameCount>5){ //checks if ball makes contact with ground
      yVel = -yVel*this.cor //applies conservation of momentum to bounce ball upward
    } else {
      yVel -= this.grav/60 //continues gravitation acceleration
    }
    this.xPos += xVel/60 //updates positions
    this.yPos -= yVel/60
    this.vel = sqrt(xVel**2+yVel**2) //rejoins updated velocity components into one magnitude and direction variable
    this.angle = degrees(atan2(yVel,xVel))
  }
  
  draw(){
    fill(0)
    stroke(0)
    circle(this.xPos+(this.objWidth/2),this.yPos-(this.objWidth/2),this.objWidth)
    this.updateVars()
  }
}