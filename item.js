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
    this.zoom = false;
  }

  getIdx(){
    return this.idx;
  }

  setPos(pos){
    this.pos = pos;
  }

  setZoom(zoom){
    this.zoom = zoom
  }

  gridDisplay(){
    imageMode(CENTER);
    image(this.img, this.pos[0], this.pos[1], this.smallSize, this.smallSize);
  }

  zoomDisplay(){
    // img
    imageMode(CENTER);
    if(
      width/2 - (this.bigSize/2) < mouseX &&
      mouseX < width/2 + (this.bigSize/2) &&
      height/2 - (this.bigSize/2) < mouseY &&
      mouseY < height/2 + (this.bigSize/2)
    ){
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