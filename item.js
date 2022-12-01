class Item{
  constructor(idx, img, data){
    this.idx = idx;
    this.img = img;
    this.title = data[1];
    this.desc = data[2];
    this.pw = data[5];
    this.pos = [0, 0];
    this.smallSize = 80;
    this.bigSize = 400;
    this.selected = false;
  }

  getIdx(){
    return this.idx;
  }

  setPos(pos){
    this.pos = pos;
  }

  setSelected(){
    this.selected = !this.selected;
    return this.selected;
  }

  setSelectOff(){
    this.selected = false;
  }

  onTrigger(mode){
    if(mode == 'grid'){
      return (
        this.pos[0] - (this.smallSize/2) < mouseX &&
        mouseX < this.pos[0] + (this.smallSize/2) &&
        this.pos[1] - (this.smallSize/2) < mouseY &&
        mouseY < this.pos[1] + (this.smallSize/2)
      )
    }else if(mode == 'show'){
      return (
        width/2 - (this.bigSize/2) < mouseX &&
        mouseX < width/2 + (this.bigSize/2) &&
        height/2 - (this.bigSize/2) < mouseY &&
        mouseY < height/2 + (this.bigSize/2)
      )
    }
  }

  gridDisplay(){
    imageMode(CENTER);
    if(this.onTrigger('grid') || this.selected){
      image(this.img, this.pos[0], this.pos[1], this.smallSize*1.2, this.smallSize*1.2);
    }else{
      image(this.img, this.pos[0], this.pos[1], this.smallSize, this.smallSize);
    }
  }
    
  zoomDisplay(){
    // img
    imageMode(CENTER);
    if(this.onTrigger('show')){
      image(this.img, width/2, height/2, this.bigSize*1.2, this.bigSize*1.2);
    }else{
      image(this.img, width/2, height/2, this.bigSize, this.bigSize);
    }

    // text
    textAlign(CENTER);
    fill(255);
    // title
    textSize(80);
    text(this.title, width/2, 200);
    // desc
    textSize(40);
    text(this.desc, width/2, 700);
  }
}