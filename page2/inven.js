class Inven{
  constructor(imgAsset){
    this.items = [];
    this.spacesNum = 0;
    this.col = 6;
    this.size = 70;
    this.imgAsset = imgAsset;
    this.stars = [];
  }

  updateCorrectStars(){
    cnt = 0;
    for(let i = 0; i < this.stars; i++){
      if(this.stars[i].isCorrect){
        cnt += 1;
      }
    }
    localStorage.setItem('star_num', str(cnt));
  }

  isExist(idx){
    let exist = false;
    for(let i=0; i<this.items.length; i++){
      exist = exist || this.items[i].getIdx() == idx;
    }
    return exist;
  }

  getLastItem(){
    return this.items[this.items.length -1];
  }

  getLength(){
    return this.items.length;
  }

  getItem(i){
    return this.items[i];
  }

  getItemByName(index){
    for(let i=0; i < this.items.length; i++){
      if(this.items[i].idx == index){
        return this.items[i]
      }
    }
    return false;
  }

  saveItemList(){
    let code = ''
    for(let i = 0; i < this.items.length; i++){
      code += str(this.items[i].getIdx());
      code += ' ';
    }
    localStorage.setItem('inven_list', code);
  }

  addItem(item){
    if(item.isSpace()){
      // add space
      let posX = 620;
      let posY = 180 + this.spacesNum*this.size;
      item.setPos([posX, posY]);
      this.items.push(item);
      this.spacesNum += 1;
      this.saveItemList();
      // add star
      posX = 620 + 85;
      this.stars.push(new Star(item.getIdx(), this.imgAsset['star'], [posX, posY]));
    }else{
      let num = this.items.length - this.spacesNum;
      let posX = 150 + (num%this.col)*this.size;
      let posY = 180 + floor(num/this.col)*this.size;
      item.setPos([posX, posY]);
      this.items.push(item);
      this.saveItemList();
    }
  }

  display(){
    // show box
    // imageMode(CORNER);
    // image(this.imgAsset['back'], 0, 0);
    // image(this.imgAsset['note'], 0, 10);

    // for(let i = 0; i < 6; i++){
    //   for(let j = 0; j < 6; j++){
    //     rectMode(CENTER);
    //     fill(220);
    //     rect(140+i*this.size, 170+j*this.size, this.size, this.size);
    //   }
    // }
    // show items
    for(let i = 0 ; i < this.items.length; i++){
      this.items[i].gridDisplay();
    }

    // show stars
    for(let i = 0; i < this.stars.length; i++){
      this.stars[i].display();
    }
    
  }
  displayCraft(){
    // show box
    imageMode(CORNER);
    image(this.imgAsset['note'], 0, 10);

    // show items
    for(let i = 0 ; i < this.items.length; i++){
      this.items[i].gridDisplay();
    }


  }
}