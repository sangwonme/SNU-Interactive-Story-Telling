class Star{
    constructor(idx, img, pos){
        this.idx = idx;
        this.img = img;
        this.smallSize = 60;
        this.ansList = ["상상력", "임시", "좌절", "인내심", "추억"];
        this.ans = this.ansList[idx-20];
        this.pos = pos;
        // wiggle
        this.ang = 0
        this.clockwise = true;
        this.wiggling = false;

        // 
        this.ansMode = false;
        this.inp = createInput('');
        this.inp.hide();
        this.alert = 'none';
        // input
        this.inp.position(width/2-250, 210);
        this.inp.size(500, 80);
        this.prevSearch = '';
        // correct
        this.correct = false;
        this.btn_x = new Button([700, 50], '', imageAsset['btn'][2], imageAsset['btn'][3]);
    }

    onAnsMode(){
        return this.ansMode;
    }

    getIdx(){
        return this.idx;
    }

    setCorrect(){
        this.correct = true;
    }

    isCorrect(){
        return this.correct;
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

    onTrigger(){
        return(
            this.pos[0] - this.smallSize/2 < mouseX &&
            mouseX < this.pos[0] + this.smallSize/2 &&
            this.pos[1] - this.smallSize/2 < mouseY &&
            mouseY < this.pos[1] + this.smallSize/2 
        )
    }

    display(){
        imageMode(CENTER);
        push();
        translate(this.pos[0], this.pos[1]);
        rotate(radians(this.ang));
        if(this.onTrigger()){
            this.setWiggle(true);
            image(this.img, 0, 0, this.smallSize*1.2, this.smallSize*1.2);
        }else{
            this.setWiggle(false);
            image(this.img, 0, 0, this.smallSize, this.smallSize);
        }
        pop();
        this.wiggle();

        // click
        if(this.onTrigger() && mouseIsPressed && !this.ansMode){
            this.ansMode = true;
        }
        if(this.ansMode){
            background(0, 0, 0, 220);
            // ui
            this.btn_x.display();
            if(this.btn_x.onTrigger() && mouseIsPressed){
                this.inp.hide();
                this.ansMode = false;
            }
            // type ans
            if(!this.correct && this.ansMode){
                // text
                this.inp.show();
                textAlign(CENTER);
                textSize(60);
                fill(255);
                text("어떤 마음조각을 얻으셨나요?", width/2, 170);
            }
            // show when correct
            if(this.correct && this.ansMode){
                if(dist(mouseX, mouseY, width/2, height/2) < 100){
                    image(this.img, width/2, height/2, 360, 360);
                    if(mouseIsPressed){
                        this.ansMode = false;
                    }
                }else{
                    image(this.img, width/2, height/2, 300, 300);
                }
                this.inp.hide();
                textAlign(CENTER);
                textSize(40);
                fill(255);
                text(this.ans + "이 환하게 반짝인다.", width/2, height-120);
            }
        }
        // search
        if(keyIsPressed && keyCode === ENTER && !this.correct){
            let key = this.inp.value();
            this.prevSearch = key;
            if(key == this.ans){
                this.correct = true;
            }
        }
        

    }


}