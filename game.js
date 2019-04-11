var money = 500000;
mSlotGen();
marketTime();
mSlotGenBig();

function marketTime() {
  var t0 = 15000;
  var t1 = 75000;
  var rawTime0 = t0 / 1000;
  var rawTime1 = t1 / 1000;
  var mTime = setInterval(mSlotGen, t0);

  var mBigTime = setInterval(mSlotGenBig, t1);

  document.getElementById('mRefreshT').innerHTML = `${mCountDwn0()}`;
  setInterval(function() {
    document.getElementById('mRefreshT').innerHTML = `${mCountDwn0()}`;
  }, 1000);

  document.getElementById('mBRefreshT').innerHTML = `${mCountDwn1()}`;
  setInterval(function() {
    document.getElementById('mBRefreshT').innerHTML = `${mCountDwn1()}`;
  }, 1000);

  function mCountDwn0() {
    if (rawTime0 === 0) {
      rawTime0 = t0 / 1000;
    }
    return `${rawTime0--} secs`;
  }

  function mCountDwn1() {
    var m = Math.floor(rawTime1 / 60);
    var s = rawTime1 % 60;

    rawTime1--;

    if (rawTime1 === 0) {
      rawTime1 = t1 / 1000;
      return `${s} secs`;
    } else if (m === 0) {
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
  var mBRand = Math.random() * 10;


  if (mBRand < 4) { //electronics store
    if (lastPick === mBigItems[0]) {
      mSlotGenBig();
    } else {
      var bigPrice0 = mBigPriceGen(0);
      document.getElementById('bMSlot0').innerHTML = `${mBigItems[0]} for $${bigPrice0}`;
      document.getElementById('bMSlot0').value = `1~Electronics Store~${bigPrice0}`;
    }
    lastPick = mBigItems[0];
  } else if (mBRand >= 4 && mBRand < 7) { //computer store
    if (lastPick === mBigItems[1]) {
      mSlotGenBig();
    } else {
      var bigPrice1 = mBigPriceGen(1);
      document.getElementById('bMSlot0').innerHTML = `${mBigItems[1]} for $${bigPrice1}`;
      document.getElementById('bMSlot0').value = `1~Computer Store~${bigPrice1}`;
    }
    lastPick = mBigItems[1];
  } else if (mBRand >= 7 && mBRand < 9) { //cafe
    if (lastPick === mBigItems[2]) {
      mSlotGenBig();
    } else {
      var bigPrice2 = mBigPriceGen(2);
      document.getElementById('bMSlot0').innerHTML = `${mBigItems[2]} for $${bigPrice2}`;
      document.getElementById('bMSlot0').value = `1~Cafe~${bigPrice2}`;
    }
    lastPick = mBigItems[2];
  } else if (mBRand >= 9) { //restaurant
    if (lastPick === mBigItems[3]) {
      mSlotGenBig();
    } else {
      var bigPrice3 = mBigPriceGen(3);
      document.getElementById('bMSlot0').innerHTML = `${mBigItems[3]} for $${bigPrice3}`;
      document.getElementById('bMSlot0').value = `1~Restaurant~${bigPrice3}`;
    }
    lastPick = mBigItems[3];
  }
}

function mSlotGen() { //function for generating market slot items
  var c = 0;
  var mSlotItems = ['Wood', 'Brick', 'Steel', 'Silver', 'Gold', 'Platinum', 'Cell Phone', 'Computer']; //market slot item
  var mItemNum = (document.getElementById('mSlots').childNodes.length - 1) / 2; //get how many items
  numItems = [];

  //-- this the the logic for getting rarity on the items. No they werent picked at random, this is MANY minutes of balancing
  for (i = 0; i < mItemNum; i++) {

    var randItem = Math.random() * 100;

    if (randItem < 25) { //wood
      var numItems0 = numOfItem(0);
      var price0 = mPriceGen(0, numItems0, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems0} ${mSlotItems[0]} for $${price0}`;
      document.getElementById("mSlot" + i).value = `${numItems0}~Wood~${price0}`;
    } else if (randItem >= 25 && randItem < 45) { //brick
      var numItems1 = numOfItem(1);
      var price1 = mPriceGen(1, numItems1, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems1} ${mSlotItems[1]} for $${price1}`;
      document.getElementById("mSlot" + i).value = `${numItems1}~Brick~${price1}`;
    } else if (randItem >= 45 && randItem < 65) { //steel
      var numItems2 = numOfItem(2);
      var price2 = mPriceGen(2, numItems2, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems2} ${mSlotItems[2]} for $${price2}`;
      document.getElementById("mSlot" + i).value = `${numItems2}~Steel~${price2}`;
    } else if (randItem >= 65 && randItem < 80) { //silver
      var numItems3 = numOfItem(3);
      var price3 = mPriceGen(3, numItems3, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems3} ${mSlotItems[3]} for $${price3}`;
      document.getElementById("mSlot" + i).value = `${numItems3}~Silver~${price3}`;
    } else if (randItem >= 80 && randItem < 87) { //gold
      var numItems4 = numOfItem(4);
      var price4 = mPriceGen(4, numItems4, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems4} ${mSlotItems[4]} for $${price4}`;
      document.getElementById("mSlot" + i).value = `${numItems4}~Gold~${price4}`;
    } else if (randItem >= 87 && randItem < 93) { //platinum
      var numItems5 = numOfItem(5);
      var price5 = mPriceGen(5, numItems5, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems5} ${mSlotItems[5]} for $${price5}`;
      document.getElementById("mSlot" + i).value = `${numItems5}~Platinum~${price5}`;
    } else if (randItem >= 93 && randItem < 97) { //cell phone
      var numItems6 = numOfItem(6);
      var price6 = mPriceGen(6, numItems6, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems6} ${mSlotItems[6]} for $${price6}`;
      document.getElementById("mSlot" + i).value = `${numItems6}~Cell Phone~${price6}`;
    } else if (randItem >= 97 && randItem <= 100) { //computer
      var numItems7 = numOfItem(7);
      var price7 = mPriceGen(7, numItems7, i);
      document.getElementById("mSlot" + i).innerHTML = `${numItems7} ${mSlotItems[7]} for $${price7}`;
      document.getElementById("mSlot" + i).value = `${numItems7}~Computer~${price7}`;
    }
  }
}

function mPriceGen(a, b, i) { //a is a number 0-7, for the array reference of the product; b is the amount of item; i is for the id call
  var mItemPrice = [10, 15, 25, 50, 100, 150, 1000, 1500];
  //(medium +- (medium*.9/rand(+.1))/10 --> round)*number of items
  if (plusMinFn()) {
    return ((mItemPrice[a] + (mItemPrice[a] * 0.9 / (Math.random() + 0.1)) / 10).toFixed()) * b;
  } else {
    var rawPrice = (mItemPrice[a] - (mItemPrice[a] * 0.9 / (Math.random() + 0.1)) / 10).toFixed();

    setTimeout(botBuy, (rawPrice / mItemPrice[a] * 10000 - Math.random() * 2), i); //for buying the items
    return (rawPrice) * b;
  }
}

function mBigPriceGen(a) { //a is a number 0-3
  var mItemPrice = [10000, 20000, 25000, 75000];
  //(medium +- (medium*.9/rand(+.1))/10 --> round)*number of items
  if (plusMinFn()) {
    return ((mItemPrice[a] + (mItemPrice[a] * 0.9 / (Math.random() + 0.1)) / 10).toFixed());
  } else {
    var rawPrice1 = (mItemPrice[a] - (mItemPrice[a] * 0.9 / (Math.random() + 0.1)) / 10).toFixed();
    setTimeout(botBuy1, (rawPrice1 / mItemPrice[a] * 10000 - Math.random() * 2));
    return rawPrice1
  }
}

function numOfItem(a) {
  if (a < 4) {
    return (Math.random() * 9 + 1).toFixed();
  } else if (a >= 4 && a < 6) {
    return (Math.random() * 4 + 1).toFixed();
  } else {
    return (Math.random() * 2 + 1).toFixed();
  }
}

function plusMinFn() {
  if (Math.random() < 0.5) {
    return true;
  } else {
    return false;
  }
}

function botBuy(a) {
  var content = document.getElementById('mSlot' + a).innerHTML.strike();
  document.getElementById('mSlot' + a).innerHTML = content; //is this the best way to do this lol idk maybe not
  document.getElementById('mSlot' + a).value = false;
}

function botBuy1() {
  var content = document.getElementById('bMSlot0').innerHTML.strike();
  document.getElementById('bMSlot0').innerHTML = content;
  document.getElementById('bMSlot0').value = false;
}

var myItems = [];
function buy(a, b) {
  if (a === false) {
    var content0 = document.getElementById('mSlot' + b).value;
    if (content0) {
      var moneyBool0 = moneyFn(parseInt(content0.split('~')[2]));
      money = moneyBool0[0];
      if (moneyBool0[1]) {
        myItems.push(content0);
        botBuy(b);
      }
    }
  }

  if (a === true) {
    var content1 = document.getElementById('bMSlot0').value;
    if (content1) {
      var moneyBool1 = moneyFn(parseInt(content1.split('~')[2]));
      money = moneyBool1[0];
      if (moneyBool1[1]) {
        myItems.push(content1);
        botBuy1();
      }
    }
  }

  document.getElementById('inventory').innerHTML = invenCopy();
  document.getElementById('moneyP').innerHTML = `$${money}`;
  myMarket();
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

  for (var i = 0; i < myItems.length; i++) {
    switch (myItems[i].split('~')[1]) {
      case 'Wood':
        wood += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Brick':
        brick += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Steel':
        steel += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Silver':
        silver += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Gold':
        gold += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Platinum':
        platinum += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Cell Phone':
        cellPhone += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Computer':
        computer += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Electronics Store':
        electronicsStore += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Computer Store':
        computerStore += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Cafe':
        cafe += parseInt(myItems[i].split('~')[0]);
        break;
      case 'Restaurant':
        restaurant += parseInt(myItems[i].split('~')[0]);
        break;
    }
    myItems = [];
  }
  var amountArr = [`${wood} Wood`, `${brick} Brick`, `${steel} Steel`, `${silver} Silver`, `${gold} Gold`, `${platinum} Platinum`, `${cellPhone} Cell Phone`, `${computer} Computer`, `${electronicsStore} Electronics Store`, `${computerStore} Computer Store`, `${cafe} Cafe`, `${restaurant} Restaurant`];
  for (var a = 0; a < amountArr.length; a++) {
    if (parseInt(amountArr[a].slice(0, 1)) > 0) {
      finalInven.push(amountArr[a]);
    }
  }
  return finalInven;
}

function moneyFn(price) {
  if (money - price >= 0) {
    money -= price;
    return [money, true];
  }
  return [money, false];
}

function myMarket() {
  var itemArr = invenCopy();
  var parent = document.getElementById('container');

  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }

  var maxQuant = [];
  if (maxQuant.length === 0) {
    for (var c = 0; c < itemArr.length; c++) {
      maxQuant.push(parseInt(itemArr[c].split(' ')[0]));
    }
  }

  for (var a = 0; a < itemArr.length; a++) {
    var newDiv = document.createElement('div');
    newDiv.className = 'gridItem';

    var amountType = document.createElement('p');
    amountType.innerText = `${itemArr[a].split(' ')[0]}/${maxQuant[a]} ${itemArr[a].replace(/[0-9]|\/|/g, '').trim()}`;
    amountType.setAttribute('id', 'typeID' + a);

    var up = document.createElement('p');
    up.innerText = '▲';
    up.setAttribute('id', 'upID~' + a);

    var down = document.createElement('p');
    down.innerText = '▼';
    down.setAttribute('id', 'downID~' + a);

    var input = document.createElement('input');
    input.type = 'number';
    input.setAttribute('id', 'input~' + a);
    input.value = itemType(itemArr[a].replace(/[0-9]|\/|/g, '').trim())*itemArr[a].split(' ')[0];

    var confirm = document.createElement('button');
    confirm.innerText = 'Advertise';
    confirm.setAttribute('id', 'confirm~' + a);

    newDiv.appendChild(up);
    newDiv.appendChild(amountType);
    newDiv.appendChild(down);
    newDiv.appendChild(input);
    newDiv.appendChild(confirm);
    document.getElementById('container').appendChild(newDiv);
  }


  for (var b = 0; b < itemArr.length; b++) { //need to reference different id's to add listeners
    document.getElementById('upID~' + b).addEventListener('click', function() { //up stuff
      var itemOrderNum0 = parseInt(this.id.split('~')[1]);
      var amountOrig = parseInt(itemArr[itemOrderNum0].split(' ')[0]);

      if (amountOrig < maxQuant[itemOrderNum0]) {
        itemArr[itemOrderNum0] = `${amountOrig+1}/${maxQuant[itemOrderNum0]} ${itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('typeID' + itemOrderNum0).innerHTML = itemArr[itemOrderNum0];
        document.getElementById('input~' + itemOrderNum0).value = itemType(itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim())*(amountOrig+1);
      } else {
        itemArr[itemOrderNum0] = `${amountOrig}/${maxQuant[itemOrderNum0]} ${itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('typeID' + itemOrderNum0).innerHTML = itemArr[itemOrderNum0];
        document.getElementById('input~' + itemOrderNum0).value = itemType(itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim())*amountOrig;
      }
    })
    var amountChange1;
    document.getElementById('downID~' + b).addEventListener('click', function() { //down stuff
      var itemOrderNum1 = parseInt(this.id.split('~')[1]);
      var amountOrig1 = parseInt(itemArr[itemOrderNum1].split(' ')[0]);

      if (amountOrig1 > 1) {
        itemArr[itemOrderNum1] = `${amountOrig1-1}/${maxQuant[itemOrderNum1]} ${itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('typeID' + itemOrderNum1).innerHTML = itemArr[itemOrderNum1];
        document.getElementById('input~' + itemOrderNum1).value = itemType(itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim())*(amountOrig1 - 1);
      } else {
        itemArr[itemOrderNum1] = `${amountOrig1}/${maxQuant[itemOrderNum1]} ${itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('typeID' + itemOrderNum1).innerHTML = itemArr[itemOrderNum1];
        document.getElementById('input~' + itemOrderNum1).value = itemType(itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim())*(amountOrig1);
      }
    })
    //------------------------------------------------------------------------------
    document.getElementById('confirm~' + b).addEventListener('click', function() { //advertise stuff
      var itemOrderNum0 = parseInt(this.id.split('~')[1]);
      var value = document.getElementById('input~' + itemOrderNum0).value;
      var div = document.getElementById("myLiveItems");
      var nodeList = div.getElementsByTagName("div").length;

      if (value < 0) {
        document.getElementById('input~' + itemOrderNum0).value = 0;
      } else if (nodeList < 6) {
        var type = document.getElementById('typeID' + itemOrderNum0).innerHTML; //typeID0
        switch (type.replace(/[0-9]|\/|/g, '').trim()) {
          case 'Wood':
            hostAppend(itemOrderNum0, type, 'Wood', value);
            wood -= parseInt(type.split('/')[0]);
            break;
          case 'Brick':
            hostAppend(itemOrderNum0, type, 'Brick', value);
            brick -= parseInt(type.split('/')[0]);
            break;
          case 'Steel':
            hostAppend(itemOrderNum0, type, 'Steel', value);
            steel -= parseInt(type.split('/')[0]);
            break;
          case 'Silver':
            hostAppend(itemOrderNum0, type, 'Silver', value);
            silver -= parseInt(type.split('/')[0]);
            break;
          case 'Gold':
            hostAppend(itemOrderNum0, type, 'Gold', value);
            gold -= parseInt(type.split('/')[0]);
            break;
          case 'Platinum':
            hostAppend(itemOrderNum0, type, 'Platinum', value);
            platinum -= parseInt(type.split('/')[0]);
            break;
          case 'Cell Phone':
            hostAppend(itemOrderNum0, type, 'Cell Phone', value);
            cellPhone -= parseInt(type.split('/')[0]);
            break;
          case 'Computer':
            hostAppend(itemOrderNum0, type, 'Computer', value);
            computer -= parseInt(type.split('/')[0]);
            break;
          case 'Electronics Store':
            hostAppend(itemOrderNum0, type, 'Electronics Store', value);
            electronicsStore -= parseInt(type.split('/')[0]);
            break;
          case 'Computer Store':
            hostAppend(itemOrderNum0, type, 'Computer Store', value);
            computerStore -= parseInt(type.split('/')[0]);
            break;
          case 'Cafe':
            hostAppend(itemOrderNum0, type, 'Café', value);
            cafe -= parseInt(type.split('/')[0]);
            break;
          case 'Restaurant':
            hostAppend(itemOrderNum0, type, 'Restaurant', value);
            restaurant -= parseInt(type.split('/')[0]);
            break;
        }
        myMarket();
        document.getElementById('inventory').innerHTML = invenCopy(); //are u screaming yet... ik ill get there, just making it work first
        money = moneyFn(value)[0];
        document.getElementById('moneyP').innerHTML = `$${money}`; //wait this is opposite lol
      } else {
        alert('you dont have enough slots');
      }
    })
  }
}
//hostAppend(itemOrderNum0, type, 'Electronics Store', value);

// var div = document.getElementById("myLiveItems");
// var nodeList = div.getElementsByTagName("div").length;


function hostAppend(index, content, type, price) { //maybe put this in the fn.^^ so dont have to have so many parameters
  var div = document.getElementById("myLiveItems");
  var nodeList = div.getElementsByTagName("div").length;

  var amount = document.getElementById('typeID' + index).innerHTML.split('/')[0];
  var newDiv = document.createElement('div');
  newDiv.className = 'gridItem';
  var newItem = document.createElement('p');
  newItem.innerText = `${amount} ${type}`;
  newItem.setAttribute('id', 'MMhost' + nodeList);
  var itemPrice = document.createElement('p');
  itemPrice.innerText = `$${price}`;
  var deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'delete';
  deleteBtn.onclick = function() {newDiv.remove();}
  newDiv.appendChild(newItem);
  newDiv.appendChild(itemPrice);
  newDiv.appendChild(deleteBtn);
  document.getElementById('myLiveItems').appendChild(newDiv);
  setTimeout(botBuyMM, Math.pow(price / (itemType(type)*amount),3) * 20000, nodeList, newDiv); //for buying my hosted items
}

function itemType(type) { //input autoprice
  switch (type) {
    case 'Wood':
      return 10;
      break;
    case 'Brick':
      return 15;
      break;
    case 'Steel':
      return 25;
      break;
    case 'Silver':
      return 50;
      break;
    case 'Gold':
      return 100;
      break;
    case 'Platinum':
      return 150;
      break;
    case 'Cell Phone':
      return 1000;
      break;
    case 'Computer':
      return 1500;
      break;
    case 'Electronics Store':
      return 10000;
      break;
    case 'Computer Store':
      return 20000;
      break;
    case 'Cafe':
      return 25000;
      break;
    case 'Restaurant':
      return 75000;
      break;
  }
}

function botBuyMM(index, deleteSlot) {
  var content = document.getElementById('MMhost' + index).innerHTML.strike();
  document.getElementById('MMhost' + index).innerHTML = content;
  setTimeout(function(){deleteSlot.remove();}, 2000);
}
