mSlotGen();
marketTime();

function marketTime(){
  var mTime = setInterval(mSlotGen, 15000); //set to 3 secs rn... but that will change to 30... maybe 15??
}

function mSlotGen(){ //function for generating market slot items
  var c = 0;
  var mSlotItems = ['wood', 'brick', 'steel', 'silver', 'gold', 'platinum', 'cell phone', 'computer']; //market slot item
  var mItemNum = (document.getElementById('mSlots').childNodes.length-1)/2; //get how many items

//-- this the the logic for getting rarity on the items. No they werent picked at random, this is MANY minutes of balancing
  for(i=0;i<mItemNum;i++){

    var randItem = Math.random()*100;

    if(randItem<25){ //wood
      var numItems0 = numOfItem(0);
      document.getElementById("mSlot"+i).innerHTML = `${numItems0} ${mSlotItems[0]} for $${mPriceGen(0,numItems0,i)}`;
    }
      else if (randItem>=25&&randItem<45) { //brick
        var numItems1 = numOfItem(1);
        document.getElementById("mSlot"+i).innerHTML = `${numItems1} ${mSlotItems[1]} for $${mPriceGen(1,numItems1,i)}`;
      }
        else if (randItem>=45&&randItem<65) { //steel
          var numItems2 = numOfItem(2);
          document.getElementById("mSlot"+i).innerHTML = `${numItems2} ${mSlotItems[2]} for $${mPriceGen(2,numItems2,i)}`;
        }
          else if (randItem>=65&&randItem<80) { //silver
            var numItems3 = numOfItem(3);
            document.getElementById("mSlot"+i).innerHTML = `${numItems3} ${mSlotItems[3]} for $${mPriceGen(3,numItems3,i)}`;
          }
            else if (randItem>=80&&randItem<87) { //gold
              var numItems4 = numOfItem(4);
              document.getElementById("mSlot"+i).innerHTML = `${numItems4} ${mSlotItems[4]} for $${mPriceGen(4,numItems4,i)}`;
            }
              else if (randItem>=87&&randItem<93) { //platinum
                var numItems5 = numOfItem(5);
                document.getElementById("mSlot"+i).innerHTML = `${numItems5} ${mSlotItems[5]} for $${mPriceGen(5,numItems5,i)}`;
              }
                else if (randItem>=93&&randItem<97) { //cell phone
                  var numItems6 = numOfItem(6);
                  document.getElementById("mSlot"+i).innerHTML = `${numItems6} ${mSlotItems[6]} for $${mPriceGen(6,numItems6,i)}`;
                }
                  else if (randItem>=97&&randItem<=100) { //computer
                    var numItems7 = numOfItem(7);
                    document.getElementById("mSlot"+i).innerHTML = `${numItems7} ${mSlotItems[7]} for $${mPriceGen(7,numItems7,i)}`;
                  }
  }
}

function mPriceGen(a,b,i){ //a is a number 0-7, for the array reference of the product; b is the amount of item; i is for the id call
  var mItemPrice = [10,15,25,50,100,150,1000,1500];
  //(medium +- (medium*.9/rand(+.1))/10 --> round)*number of items
  if (plusMinFn()) {
    return ((mItemPrice[a] + (mItemPrice[a]*0.9/(Math.random()+0.1))/10).toFixed())*b;
  } else {
      var rawPrice = (mItemPrice[a] - (mItemPrice[a]*0.9/(Math.random()+0.1))/10).toFixed();

      setTimeout(botBuy,(rawPrice/mItemPrice[a]*10000-Math.random()*3),i);
      return (rawPrice)*b;
    }
}

function numOfItem(a){
  if (a<4) {
    return (Math.random()*9+1).toFixed();
  }
    else if (a>=4&&a<6) {
      return (Math.random()*4+1).toFixed();
    } else {
        return (Math.random()*2+1).toFixed();
      }
}

function plusMinFn(){
  if (Math.random()<0.5) {
    return true;
  } else {
      return false;
  }
}

function botBuy(a){
  var content = document.getElementById('mSlot'+a).innerHTML.strike();
  document.getElementById('mSlot'+a).innerHTML = content; //is this the best way to do this lol idk maybe not
}

function mmAddFn(){

}
