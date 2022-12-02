let db;

// scene
let scene;

// inven
let imgs = [];
let inven;

// buttons
let btn_search;
let btn_craft;
let btn_x;

// search
let inp;
let alert;
let prevSearch;

// show
let showitem;

// craft
let selected;
let copiedPw;

function preload(){
  db = loadTable('./assets/itemDB.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1200, 900);

  // scene set
  scene = 'main';

  // img assets
  for(let i = 0; i <= 2; i ++){
    imgs[i] = loadImage('./assets/items/' + i + '.png');
  }

  // items
  inven = new Inven();

  // button
  btn_search = new Button([110, 100], '찾기');
  btn_craft = new Button([250, 100], '조합');
  btn_x = new Button([1090, 100], 'X');

  // search
  inp = createInput('');
  inp.hide();
  alert = 'none';

  // craft
  selected = Array.from({length: 100}, () => false);
}

function drawMain(){
  inp.hide();
  btn_search.display();
  btn_craft.display();
  inven.display();
}

// return item's idx from it's name
function searchInDB(key){
  for(let i = 0; i < db.getRowCount(); i++){
    if(db.getRow(i).arr[1] == key){
      return db.getRow(i).arr[0];
    }
  }
  return false;
}

// draw Seach scene
function drawSearch(){
  drawMain();
  background(0, 0, 0, 240);

  // text
  textAlign(CENTER);
  textSize(80);
  fill(255);
  text("무엇을 찾으셨나요?", width/2, 320);

  // input
  inp.position(width/2-250, 400);
  inp.size(500, 100);
  inp.show();

  // btn
  btn_x.display();

  // search
  if(keyIsPressed && keyCode === ENTER && prevSearch != inp.value()){
    let key = inp.value();
    prevSearch = key;
    if(searchInDB(key)){
      let idx = searchInDB(key);
      if(!inven.isExist(idx)){
        if(db.getRow(idx).arr[3] == -99){
          inven.addItem(new Item(idx, imgs[idx], db.getRow(idx).arr));
          alert = 'none';
          // go to search
          scene = 'show';
          showitem = inven.getLastItem();
          showitem.setCopied();
        }else{
          alert = 'not found';
        }
      }else{
        alert = 'already exist'
      }
    }else{
      alert = 'not found';
    }
  }

  // alert
  fill(255, 0, 0);
  textSize(20);
  switch(alert){
    case 'none':
      break;
    case 'already exist':
      text('이미 찾은 물건입니다.', width/2, 600);
      break;
    case 'not found':
      text('존재하지 않는 물건입니다.', width/2, 600);
      break;
  }

}

// draw Show scene
function drawShow(){
  // background
  inp.hide();
  drawMain();
  background(0, 0, 0, 240);

  // btn
  btn_x.display();

  // show Item
  showitem.zoomDisplay()
}

function getAllSelected() {
  let indexes = [], i;
  for(i = 0; i < selected.length; i++)
      if (selected[i] === true)
          indexes.push(i);
  return indexes;
}

// return craft output's idx given idx1, dix2
function craft(idx1, idx2){
  for(let i = 0; i < db.getRowCount(); i++){
    print(db.getRow(i).arr[3], db.getRow(i).arr[4]);
    if(
      (int(db.getRow(i).arr[3]) == idx1 && int(db.getRow(i).arr[4]) == idx2) ||
      (int(db.getRow(i).arr[3]) == idx2 && int(db.getRow(i).arr[4]) == idx1)
    ){
      return db.getRow(i).arr[0];
    }
  }
  return false;
}

// draw Craft scene
function drawCraft(){
  // background
  inp.hide();
  background(0, 0, 0, 240);
  inven.display();

  // btn
  btn_x.display();

  // check selected
  if(getAllSelected().length == 2){
    let idx = craft(getAllSelected()[0], getAllSelected()[1]);
    print(idx);
    if(idx && !inven.isExist(idx)){
      // select off
      selected[getAllSelected()[0]] = false;
      selected[getAllSelected()[1]] = false;
      for(let i=0; i < inven.getLength(); i++){
        inven.getItem(i).setSelectOff();
      }
      // add craft item
      inven.addItem(new Item(idx, imgs[idx], db.getRow(idx).arr));
      scene = 'show';
      showitem = inven.getLastItem();
      showitem.setCopied();
    }
  }
}

function mousePressed(){
  switch(scene){
    case 'main':
      // search btn
      if(btn_search.onTrigger()){
        scene = 'search';
        prevSearch = '';
        inp.value('');
      }
      // craft btn
      if(btn_craft.onTrigger()){
        scene = 'craft';
      }
      // show item
      for(let i = 0; i < inven.getLength(); i++){
        if(inven.getItem(i).onTrigger('grid')){
          scene = 'show';
          showitem = inven.getItem(i);
          showitem.setCopied();
          break;
        }
      }
      break;
    case 'search':
      // x btn
      if(btn_x.onTrigger()){
        scene = 'main';
      }
      break;

    case 'show':
      // x btn
      if(btn_x.onTrigger()){
        scene = 'main';
      }
      // go to main if item pressed
      if(showitem.onTrigger('show')){
        scene = 'main';
      }
      // copy text
      if(showitem.onTrigger('pw')){
        copiedPw = showitem.CopyToClipboard();
      }
      break;
    case 'craft':
      // x btn
      if(btn_x.onTrigger()){
        scene = 'main';
      }
      // select
      for(let i=0; i < inven.getLength(); i++){
        let item = inven.getItem(i);
        if(item.onTrigger('grid')){
          selected[item.getIdx()] = item.setSelected();
        }
      }
      break;
  }
}

function draw() {
  background(220);

  switch(scene){
    case 'main':
      drawMain();
      break;
    
    case 'search':
      drawSearch();
      break;

    case 'show':
      drawShow();
      break;

    case 'craft':
      drawCraft();
      break;
  }
}
