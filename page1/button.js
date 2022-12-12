class Button{
  constructor(pos, text, img0, img1){
    this.pos = pos;
    this.size = 80;
    this.clicked = false;
    this.text = text;
    this.img0 = img0;
    this.img1 = img1;
  }

  onTrigger(){
    return (
      dist(mouseX, mouseY, this.pos[0], this.pos[1]) < this.size/2
    );
  }

  display(){
    imageMode(CENTER);
    if(this.onTrigger()){
      image(this.img1, this.pos[0], this.pos[1]);
    }else{
      image(this.img0, this.pos[0], this.pos[1]);
    }

    textAlign(CENTER);
    fill(0);
    textSize(20);
    text(this.text, this.pos[0], this.pos[1]+10);
  }
}