let db;

// scene
let scene;

// inven
let inven;

// assets
let icon = [];
let imageAsset = {};

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

// end
let endstage = 0;


function preload(){
  db = loadTable('./assets/itemDB.csv', 'csv', 'header');
  // item assets
  let icons = []
  for(let i = 0; i <= 39; i ++){
    icons[i] = loadImage('./assets/items/img_' + i + '.png');
  }
  imageAsset['icon'] = icons;
  // ui assets
  imageAsset['back'] = loadImage('./assets/ui/background.png');
  imageAsset['note'] = loadImage('./assets/ui/note.png');
  let btn = [];
  for(let i = 0; i <= 3 ; i++){
    btn.push(loadImage('./assets/ui/btn_' + i + '.png'));
  }
  imageAsset['btn'] = btn;
  imageAsset['star'] = loadImage('./assets/items/star.png');
  imageAsset['star_b'] = loadImage('./assets/items/star_b.png');

  // ending
  imageAsset['ending1'] = loadImage('./assets/ending1.png');
  imageAsset['ending2'] = loadImage('./assets/ending2.png');
}

function setup() {
  createCanvas(800, 600);

  // generate inven
  inven = new Inven(imageAsset);
  let code = localStorage.getItem('inven_list');
  if(code){
    let tmp = code.split(' ');
    for(let i = 0; i < tmp.length-1; i++){
      inven.addItem(new Item(tmp[i], imageAsset['icon'][tmp[i]], db.getRow(tmp[i]).arr));
      // inven.addItem(new Item(tmp[i], imageAsset['icon'][0], db.getRow(tmp[i]).arr));
    }
  }

  // init scene
  scene = 'main';

  // btns
  btn_search = new Button([90, 50], '검색', imageAsset['btn'][0], imageAsset['btn'][1]);
  btn_craft = new Button([180, 50], '조합', imageAsset['btn'][0], imageAsset['btn'][1]);
  btn_x = new Button([700, 50], '', imageAsset['btn'][2], imageAsset['btn'][3]);

  // search
  inp = createInput('');
  inp.hide();
  alert = 'none';

  // craft
  selected = Array.from({length: 100}, () => false);

}

function drawFunButton(){
  btn_craft.display();
  btn_search.display();
}

function drawXButtion(){
  btn_x.display();
}

function drawMain(){
  inp.hide();
  drawFunButton();
  inven.display();
}

// return item's idx from it's name
function searchInDB(item_name){
  for(let i = 0; i < db.getRowCount(); i++){
    if(db.getRow(i).arr[1] == item_name){
      return db.getRow(i).arr[0];
    }
  }
  return false;
}

function drawSearch(){
  drawMain();
  background(0, 0, 0, 240);

  // text
  textAlign(CENTER);
  textSize(60);
  fill(255);
  text("무엇을 찾으셨나요?", width/2, 170);

  // input
  inp.position(width/2-250, 210);
  inp.size(500, 80);
  inp.show();

  // x btn
  drawXButtion();

  // search
  if(keyIsPressed && keyCode === ENTER && prevSearch != inp.value()){
    let key = inp.value();
    prevSearch = key;
    if(searchInDB(key)){
      let idx = searchInDB(key);
      if(!inven.isExist(idx)){
        if(db.getRow(idx).arr[3] == -99){
          inven.addItem(new Item(idx, imageAsset['icon'][idx], db.getRow(idx).arr));
          // inven.addItem(new Item(idx, imageAsset['icon'][0], db.getRow(idx).arr));
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
      text('이미 찾은 물건입니다.', width/2, 360);
      break;
    case 'not found':
      text('존재하지 않는 물건입니다. 물건 이름을 "정확히" 알아오세요.', width/2, 360);
      break;
  }
  
}

function drawShow(){
  // background
  inp.hide();
  drawMain();
  background(0, 0, 0, 240);

  // btn x
  drawXButtion();

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
  inven.display();
  background(0, 0, 0, 240);
  inven.displayCraft();

  // btn
  btn_x.display();


  // check selected
  if(getAllSelected().length == 2){
    let idx = craft(getAllSelected()[0], getAllSelected()[1]);
    // craft succeed
    if(idx && !inven.isExist(idx)){
      // select off
      let first = getAllSelected()[0];
      let second = getAllSelected()[1];
      selected[first] = false;
      selected[second] = false;
      for(let i=0; i < inven.getLength(); i++){
        inven.getItem(i).setSelectOff();
      }
      // add craft item
      inven.addItem(new Item(idx, imageAsset['icon'][idx], db.getRow(idx).arr));
      // inven.addItem(new Item(idx, imageAsset['icon'][0], db.getRow(idx).arr));
      scene = 'show';
      showitem = inven.getLastItem();
      showitem.setCopied();
      alert = 'none';
    }
    else if(idx){
      // select off
      let first = getAllSelected()[0];
      let second = getAllSelected()[1];
      selected[first] = false;
      selected[second] = false;
      for(let i=0; i < inven.getLength(); i++){
        inven.getItem(i).setSelectOff();
      }
      // show
      scene = 'show';
      showitem = inven.getItemByName(idx);
      showitem.setCopied();
      alert = 'none'
    }else{
      // select off
      let first = getAllSelected()[0];
      let second = getAllSelected()[1];
      selected[first] = false;
      selected[second] = false;
      for(let i=0; i < inven.getLength(); i++){
        inven.getItem(i).setSelectOff();
      }
      alert = 'impossible';
    }
  }
  // alert
  if(alert == 'impossible'){
    // alert
    fill(255, 0, 0);
    textSize(20);
    textAlign(CENTER);
    text('조합할 수 없습니다.', width/2, 70);
  }
}


function draw() {
  background(220);
  imageMode(CORNER);
  image(imageAsset['back'], 0, 0);
  image(imageAsset['note'], 0, 10);

  // check stars
  let code = localStorage.getItem('star_num') + ' ';
  let tmp = code.split(' ');
  let cnt = 0;
  for(i = 20; i <= 24; i++){
    for(j = 0; j < tmp.length; j++){
      if(str(i) == tmp[j]){
        cnt += 1;
      }
    }
  }
  if(cnt == 5){
    scene = 'end';
  }

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

    case 'end':
      background(0);
      if(endstage == 0){
        imageMode(CORNER);
        image(imageAsset['ending1'], 0, 0);
      }else{
        imageMode(CORNER);
        image(imageAsset['ending2'], 0, 0);
      }

  }
  print(inven.onAnsMode());
}

function mousePressed(){
  if(!inven.onAnsMode()){
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
          // select off
          let first = getAllSelected()[0];
          let second = getAllSelected()[1];
          selected[first] = false;
          selected[second] = false;
          for(let i=0; i < inven.getLength(); i++){
            inven.getItem(i).setSelectOff();
          }
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
  if(scene == 'end'){
    endstage = 1;
  }
}
