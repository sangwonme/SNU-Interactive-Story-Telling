let db;

// scene
let scene;

// inven
let imgs = [];
let inven;

// buttons
let btn_search;
let btn_craft;

// search
let inp;
let alert;
let prevSearch;

// show
let showitem;

function preload(){
  db = loadTable('./assets/itemDB.csv', 'csv', 'header');
}

function setup() {
  createCanvas(1200, 900);

  // scene set
  scene = 'search';

  // img assets
  for(let i = 0; i <= 2; i ++){
    imgs[i] = loadImage('./assets/items/' + i + '.png');
  }

  // items
  inven = new Inven();

  // button
  btn_search = new Button([110, 100]);
  btn_craft = new Button([250, 100]);

  // search
  inp = createInput('');
  inp.hide();
  alert = 'none';
}



function craft(idx1, idx2){

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
      print('find : ' + db.getRow(i).arr[0])
      return db.getRow(i).arr[0];
    }
  }
  return false;
}

// draw Seach scene
function drawSearch(){
  drawMain();
  background(0, 0, 0, 230);

  // text
  textAlign(CENTER);
  textSize(80);
  fill(255);
  text("무엇을 찾으셨나요?", width/2, 320);

  // input
  inp.position(width/2-250, 400);
  inp.size(500, 100);
  inp.show();
  print(inp)

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
          scene = 'show';
          showitem = inven.getLastItem();
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
  background(0, 0, 0, 230);

  // show Item
  showitem.zoomDisplay()

}

function drawCraft(){
  inp.hide();

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
