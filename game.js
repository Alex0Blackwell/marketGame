var money = 500;
mSlotGen();
marketTime();
mSlotGenBig();

function marketTime() {
  var t0 = 15000;
  var t1 = 75000;
  var rawTime0 = t0/1000;
  var rawTime1 = t1/1000;
  var mTime = setInterval(mSlotGen, t0);

  var mBigTime = setInterval(mSlotGenBig, t1);

  document.getElementById('mRefreshT').innerHTML = `${mCountDwn0()}`;
  setInterval(function(){document.getElementById('mRefreshT').innerHTML = `${mCountDwn0()}`;}, 1000);

  document.getElementById('mBRefreshT').innerHTML = `${mCountDwn1()}`;
  setInterval(function(){document.getElementById('mBRefreshT').innerHTML = `${mCountDwn1()}`;}, 1000);

  function mCountDwn0() {
    if (rawTime0===0) {
      rawTime0 = t0/1000;
    }
    return `${rawTime0--} secs`;
  }

  function mCountDwn1() {
    var m = Math.floor(rawTime1/60);
    var s = rawTime1%60;

    rawTime1--;

    if (rawTime1===0) {
      rawTime1 = t1/1000;
      return `${s} secs`;
    }
      else if (m===0) {
        return `${s} secs`;
      } else {
        return `${m} min ${s} secs`;
        }
  }
  document.getElementById('moneyP').innerHTML = `$${money}`;
}

var lastPick;
function mSlotGenBig() {
  var mBigItems = ['Electronics Store', 'Computer Store', 'Café', 'Restaurant'];
  var mBRand = Math.random()*10;


  if (mBRand<4) { //electronics store
    if (lastPick===mBigItems[0]) {
      mSlotGenBig();
    } else {
        var bigPrice0 = mBigPriceGen(0);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[0]} for $${bigPrice0}`;
        document.getElementById('bMSlot0').value = `1~electronics store~${bigPrice0}`;
      }
    lastPick = mBigItems[0];
  }
    else if (mBRand>=4&&mBRand<7) { //computer store
      if (lastPick===mBigItems[1]) {
        mSlotGenBig();
      } else {
          var bigPrice1 = mBigPriceGen(1);
          document.getElementById('bMSlot0').innerHTML = `${mBigItems[1]} for $${bigPrice1}`;
          document.getElementById('bMSlot0').value = `1~computer store~${bigPrice1}`;
        }
      lastPick = mBigItems[1];
    }
      else if (mBRand>=7&&mBRand<9) { //cafe
        if (lastPick===mBigItems[2]) {
          mSlotGenBig();
        } else {
            var bigPrice2 = mBigPriceGen(2);
            document.getElementById('bMSlot0').innerHTML = `${mBigItems[2]} for $${bigPrice2}`;
            document.getElementById('bMSlot0').value = `1~cafe~${bigPrice2}`;
          }
        lastPick = mBigItems[2];
      }
        else if (mBRand>=9) { //restaurant
          if (lastPick===mBigItems[3]) {
            mSlotGenBig();
          } else {
              var bigPrice3 = mBigPriceGen(3);
              document.getElementById('bMSlot0').innerHTML = `${mBigItems[3]} for $${bigPrice3}`;
              document.getElementById('bMSlot0').value = `1~restaurant~${bigPrice3}`;
            }
          lastPick = mBigItems[3];
        }
}

function mSlotGen() { //function for generating market slot items
  var c = 0;
  var mSlotItems = ['wood', 'brick', 'steel', 'silver', 'gold', 'platinum', 'cell phone', 'computer']; //market slot item
  var mItemNum = (document.getElementById('mSlots').childNodes.length-1)/2; //get how many items
  numItems = [];

//-- this the the logic for getting rarity on the items. No they werent picked at random, this is MANY minutes of balancing
  for(i=0;i<mItemNum;i++) {

    var randItem = Math.random()*100;

    if(randItem<25){ //wood
      var numItems0 = numOfItem(0);
      var price0 = mPriceGen(0,numItems0,i);
      document.getElementById("mSlot"+i).innerHTML = `${numItems0} ${mSlotItems[0]} for $${price0}`;
      document.getElementById("mSlot"+i).value = `${numItems0}~wood~${price0}`;
    }
      else if (randItem>=25&&randItem<45) { //brick
        var numItems1 = numOfItem(1);
        var price1 = mPriceGen(1,numItems1,i);
        document.getElementById("mSlot"+i).innerHTML = `${numItems1} ${mSlotItems[1]} for $${price1}`;
        document.getElementById("mSlot"+i).value = `${numItems1}~brick~${price1}`;
      }
        else if (randItem>=45&&randItem<65) { //steel
          var numItems2 = numOfItem(2);
          var price2 = mPriceGen(2,numItems2,i);
          document.getElementById("mSlot"+i).innerHTML = `${numItems2} ${mSlotItems[2]} for $${price2}`;
          document.getElementById("mSlot"+i).value = `${numItems2}~steel~${price2}`;
        }
          else if (randItem>=65&&randItem<80) { //silver
            var numItems3 = numOfItem(3);
            var price3 = mPriceGen(3,numItems3,i);
            document.getElementById("mSlot"+i).innerHTML = `${numItems3} ${mSlotItems[3]} for $${price3}`;
            document.getElementById("mSlot"+i).value = `${numItems3}~silver~${price3}`;
          }
            else if (randItem>=80&&randItem<87) { //gold
              var numItems4 = numOfItem(4);
              var price4 = mPriceGen(4,numItems4,i);
              document.getElementById("mSlot"+i).innerHTML = `${numItems4} ${mSlotItems[4]} for $${price4}`;
              document.getElementById("mSlot"+i).value = `${numItems4}~gold~${price4}`;
            }
              else if (randItem>=87&&randItem<93) { //platinum
                var numItems5 = numOfItem(5);
                var price5 = mPriceGen(5,numItems5,i);
                document.getElementById("mSlot"+i).innerHTML = `${numItems5} ${mSlotItems[5]} for $${price5}`;
                document.getElementById("mSlot"+i).value = `${numItems5}~platinum~${price5}`;
              }
                else if (randItem>=93&&randItem<97) { //cell phone
                  var numItems6 = numOfItem(6);
                  var price6 = mPriceGen(6,numItems6,i);
                  document.getElementById("mSlot"+i).innerHTML = `${numItems6} ${mSlotItems[6]} for $${price6}`;
                  document.getElementById("mSlot"+i).value = `${numItems6}~cellphone~${price6}`;
                }
                  else if (randItem>=97&&randItem<=100) { //computer
                    var numItems7 = numOfItem(7);
                    var price7 = mPriceGen(7,numItems7,i);
                    document.getElementById("mSlot"+i).innerHTML = `${numItems7} ${mSlotItems[7]} for $${price7}`;
                    document.getElementById("mSlot"+i).value = `${numItems7}~computer~${price7}`;
                  }
  }
}

function mPriceGen(a,b,i) { //a is a number 0-7, for the array reference of the product; b is the amount of item; i is for the id call
  var mItemPrice = [10,15,25,50,100,150,1000,1500];
  //(medium +- (medium*.9/rand(+.1))/10 --> round)*number of items
  if (plusMinFn()) {
    return ((mItemPrice[a] + (mItemPrice[a]*0.9/(Math.random()+0.1))/10).toFixed())*b;
  } else {
      var rawPrice = (mItemPrice[a] - (mItemPrice[a]*0.9/(Math.random()+0.1))/10).toFixed();

      setTimeout(botBuy,(rawPrice/mItemPrice[a]*10000 - Math.random()*2),i);
      return (rawPrice)*b;
    }
}

function mBigPriceGen(a) { //a is a number 0-3
  var mItemPrice = [10000,20000,25000,75000];
  //(medium +- (medium*.9/rand(+.1))/10 --> round)*number of items
  if (plusMinFn()) {
    return ((mItemPrice[a] + (mItemPrice[a]*0.9/(Math.random()+0.1))/10).toFixed());
  } else {
      var rawPrice1 = (mItemPrice[a] - (mItemPrice[a]*0.9/(Math.random()+0.1))/10).toFixed();
      setTimeout(botBuy1,(rawPrice1/mItemPrice[a]*10000 - Math.random()*2));
      return rawPrice1
    }
}

function numOfItem(a) {
  if (a<4) {
    return (Math.random()*9+1).toFixed();
  }
    else if (a>=4&&a<6) {
      return (Math.random()*4+1).toFixed();
    } else {
        return (Math.random()*2+1).toFixed();
      }
}

function plusMinFn() {
  if (Math.random()<0.5) {
    return true;
  } else {
      return false;
  }
}

function botBuy(a) {
  var content = document.getElementById('mSlot'+a).innerHTML.strike();
  document.getElementById('mSlot'+a).innerHTML = content; //is this the best way to do this lol idk maybe not
  document.getElementById('mSlot'+a).value = false;
}

function botBuy1() {
  var content = document.getElementById('bMSlot0').innerHTML.strike();
  document.getElementById('bMSlot0').innerHTML = content;
  document.getElementById('bMSlot0').value = false;
}

var myItems = [];
function buy(a,b) {
	if(a===false) {
    var content0 = document.getElementById('mSlot'+b).value;
    if (content0) {
      var moneyBool0 = moneyFn(parseInt(content0.split('~')[2]));
      money = moneyBool0[0];
      if(moneyBool0[1]) {
        myItems.push(content0);
        botBuy(b);
      }
    }
	}

	if(a===true) {
    var content1 = document.getElementById('bMSlot0').value;
    if (content1) {
      var moneyBool1 = moneyFn(parseInt(content1.split('~')[2]));
      money = moneyBool1[0];
      if(moneyBool1[1]) {
        myItems.push(content1);
        botBuy1();
      }
    }
	}

  document.getElementById('inventory').innerHTML = invenCopy();
  document.getElementById('moneyP').innerHTML = `$${money}`;
}

var wood = 0;
var brick = 0;
var steel = 0;
var silver = 0;
var gold = 0;
var platinum = 0;
var cellPhone = 0;
var computer = 0;
var electronicsStore = 0;
var computerStore = 0;
var cafe = 0;
var restaurant = 0;
function invenCopy() {
  var finalInven = [];

  for (var i=0; i<myItems.length; i++) {
    switch (myItems[i].split('~')[1]) {
      case 'wood':
        wood += parseInt(myItems[i].split('~')[0]);
        break;
      case 'brick':
        brick += parseInt(myItems[i].split('~')[0]);
        break;
      case 'steel':
        steel += parseInt(myItems[i].split('~')[0]);
        break;
      case 'silver':
        silver += parseInt(myItems[i].split('~')[0]);
        break;
      case 'gold':
        gold += parseInt(myItems[i].split('~')[0]);
        break;
      case 'platinum':
        platinum += parseInt(myItems[i].split('~')[0]);
        break;
      case 'cellphone':
        cellPhone += parseInt(myItems[i].split('~')[0]);
        break;
      case 'computer':
        computer += parseInt(myItems[i].split('~')[0]);
        break;
      case 'electronics store':
        electronicsStore += parseInt(myItems[i].split('~')[0]);
        break;
      case 'computer store':
        computerStore += parseInt(myItems[i].split('~')[0]);
        break;
      case 'cafe':
        cafe += parseInt(myItems[i].split('~')[0]);
        break;
      case 'restaurant':
        restaurant += parseInt(myItems[i].split('~')[0]);
        break;
    }
      myItems = [];
  }
  var amountArr = [`${wood} wood`, `${brick} brick`, `${steel} steel`, `${silver} silver`, `${gold} gold`, `${platinum} platinum`, `${cellPhone} cell phone`, `${computer} computer`, `${electronicsStore} electronics store`, `${computerStore} computer store`, `${cafe} cafe`, `${restaurant} restaurant`];
  for (var a=0; a<amountArr.length; a++) {
    if (parseInt(amountArr[a].slice(0, 1))>0) {
      finalInven.push(amountArr[a]);
    }
  }
  return finalInven;
}

function moneyFn(price) {
  if (money-price>=0) {
    money -= price;
    return [money, true];
  }
  return [money, false];
}

function myMarket() {
  var itemArr = invenCopy();
  var parent = document.getElementById('container');
  console.log(parent.firstChild);

  while (parent.hasChildNodes()) { //this isnt going to work, just use a for i think
    parent.removeChild(parent.firstChild);
  }

  for (var a=0; a<itemArr.length; a++) {
    var newDiv = document.createElement('div');
    newDiv.className = 'gridItem';
    var newContent = document.createTextNode(itemArr[a]);
    newDiv.appendChild(newContent);
    document.getElementById('container').appendChild(newDiv);
  }
}
