class Item{
  constructor(idx, img, data){
    this.idx = idx;
    this.img = img;
    this.title = data[1];
    this.desc = data[2];
    this.pw = data[5];
    this.pos = [0, 0];
    this.smallSize = 60;
    this.bigSize = 250;
    this.selected = false;
    this.copied = false;
    // wiggle
    this.ang = 0;
    this.clockwise = true;
    this.wiggling = false;
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
    }else if(mode == 'pw'){
      return(
        width/2 - 60 < mouseX &&
        mouseX < width/2 + 60 &&
        485 - 30 < mouseY &&
        mouseY < 485 + 30
      );
    }
  }
  
  setWiggle(wiggling){
    if(!wiggling){
      this.ang = 0;
    }
    this.wiggling = wiggling;
  }

  wiggle(){
    if(this.wiggling){
      if(this.ang > 20){
        this.clockwise = false;
      }
      else if(this.ang < -20){
        this.clockwise = true;
      }
      if(this.clockwise){
        this.ang += 2;
      }else{
        this.ang -= 2;
      }
    }
  }

  setCopied(){
    this.copied = false;
  }

  CopyToClipboard() {
    this.copyStringToClipboard(this.pw);
    return this.pw;
  }
  
  copyStringToClipboard (str) {
    // Create new element
    let el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
  }

  gridDisplay(){
    imageMode(CENTER);
    // grid view
    push();
    translate(this.pos[0], this.pos[1]);
    rotate(radians(this.ang));
    if(this.onTrigger('grid') || this.selected){
      this.setWiggle(true);
      image(this.img, 0, 0, this.smallSize*1.2, this.smallSize*1.2);
    }else{
      this.setWiggle(false);
      image(this.img, 0, 0, this.smallSize, this.smallSize);
    }
    pop();
    // wiggle
    this.wiggle();
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
    textSize(60);
    text(this.title, width/2, 170);
    // desc
    textSize(25);
    text(this.desc, width/2, 450);
    // pw
    if(this.pw != '0'){
      // pw
      if(this.onTrigger('pw') && mouseIsPressed){
        fill(255, 200, 200);
        this.copied = true;
      }
      else if(this.onTrigger('pw')){
        fill(255, 0, 0);
      }
      else{
        fill(100, 0, 0);
      }
      textSize(20);
      text('비밀번호 : ' + this.pw, width/2, 485);
      // copied message
      textSize(20);
      fill(255);
      if(this.copied){
        text('비밀번호가 클립보드에 복사되었습니다.', width/2, 515);
      }else{
        text('비밀번호를 클릭하면 클립보드에 복사할 수 있습니다.', width/2, 515);
      }
    }
    
  }
}