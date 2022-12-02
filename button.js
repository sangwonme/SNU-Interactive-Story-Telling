class Button{
  constructor(pos){
    this.pos = pos;
    this.size = 120;
    this.clicked = false;
  }

  onTrigger(){
    return (
      dist(mouseX, mouseY, this.pos[0], this.pos[1]) < this.size/2
    );
  }

  display(){
    fill(255);
    circle(this.pos[0], this.pos[1], this.size);
  }
}