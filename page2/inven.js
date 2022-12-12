class Inven{
  constructor(imgAsset){
    this.items = [];
    this.spacesNum = 0;
    this.col = 6;
    this.size = 70;
    this.imgAsset = imgAsset;
    this.stars = [];
  }

  onAnsMode(){
    let tmp = false;
    for(let i = 0; i < this.stars.length; i++){
      tmp = tmp || this.stars[i].onAnsMode();
    }
    return tmp;
  }

  updateCorrectStars(){
    let code = localStorage.getItem('star_num') + ' ';
    let tmp = code.split(' ');
    for(let i = 0; i < this.stars.length; i++){
      if(this.stars[i].isCorrect()){
        let exist = false;
        for(let j = 0; j < tmp.length-1; j++){
          if(tmp[j] == str(this.stars[i].getIdx())){
            exist = true;
          }
        }
        if(!exist){
          code += str(this.stars[i].getIdx());
          code += ' ';
        }
      }
    }
    localStorage.setItem('star_num', code);
  }

  setCorrectStars(){
    let code = localStorage.getItem('star_num');
    if(code){
      let tmp = code.split(' ');
      for(let i = 0; i < tmp.length-1; i++){
        for(let j = 0; j < this.stars.length; j++){
          if(str(this.stars[j].getIdx()) == tmp[i]){
            this.stars[j].setCorrect();
          }
        }  
      }
    }

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
      this.stars.push(new Star(item.getIdx(), this.imgAsset['star'], this.imgAsset['star_b'], [posX, posY]));
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
    this.updateCorrectStars();
    this.setCorrectStars();
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
    let ansStar = 0;
    for(let i = 0; i < this.stars.length; i++){
      if(this.stars[i].ansMode){
        ansStar = i;
      }else{
        this.stars[i].display();
      }
    }
    if(this.stars.length > 0){
      this.stars[ansStar].display();
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