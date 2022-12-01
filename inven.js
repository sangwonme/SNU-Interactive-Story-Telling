class Inven{
  constructor(){
    this.items = [];
    this.col = 11;
    this.row = 6;
    this.size = 100;
    this.startpos = [50, 200];
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

  addItem(item){
    let num = this.items.length;
    let posX = this.startpos[0] + (num%this.col)*this.size + this.size/2;
    let posY = this.startpos[1] + floor(num/this.col)*this.size + this.size/2;
    item.setPos([posX, posY]);
    this.items.push(item);
  }

  display(){
    // show box
    fill(255);
    rect(this.startpos[0], this.startpos[1], this.col*this.size, this.row*this.size);
    
    // show items
    for(let i = 0 ; i < this.items.length; i++){
      this.items[i].gridDisplay();
    }

  }
}