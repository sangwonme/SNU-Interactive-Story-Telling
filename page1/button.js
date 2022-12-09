class Button{
  constructor(pos, text){
    this.pos = pos;
    this.size = 80;
    this.clicked = false;
    this.text = text;
  }

  onTrigger(){
    return (
      dist(mouseX, mouseY, this.pos[0], this.pos[1]) < this.size/2
    );
  }

  display(){
    fill(255);
    circle(this.pos[0], this.pos[1], this.size);
    fill(0);
    textAlign(CENTER);
    textSize(20);
    text(this.text, this.pos[0], this.pos[1]+10);
  }
}