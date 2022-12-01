class Button{
  constructor(pos){
    this.pos = pos;
    this.size = 120;
    this.clicked = false;
  }

  onTrigger(){
    fill(100);
    circle(this.pos[0], this.pos[1], this.size);
  }
  
  onClicked(){
    fill(0);
    circle(this.pos[0], this.pos[1], this.size);
  }
  
  onDefault(){
    fill(255);
    circle(this.pos[0], this.pos[1], this.size);
  }

  display(){
    if(this.clicked){
      this.onClicked();
    }
    else if(dist(mouseX, mouseY, this.pos[0], this.pos[1]) < this.size/2){
      this.onTrigger();
    }
    else{
      this.onDefault();
    }

    if(mouseIsPressed && dist(mouseX, mouseY, this.pos[0], this.pos[1]) < this.size/2){
      this.clicked = !this.clicked;
    }
  }
}