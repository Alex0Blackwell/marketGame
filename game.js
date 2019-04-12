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

  genLogic();

  function genLogic() {
    if (mBRand < 4) { //electronics store
      if (lastPick === mBigItems[0]) {
	    mBRand = Math.random() * 10;
	    lastPick = mBigItems[0];
        genLogic();
      } else {
        var bigPrice0 = mBigPriceGen(0);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[0]} for $${bigPrice0}`;
        document.getElementById('bMSlot0').value = `1~Electronics Store~${bigPrice0}`;
	    lastPick = mBigItems[0];
      }
    } else if (mBRand < 7) { //computer store
      if (lastPick === mBigItems[1]) {
        mBRand = Math.random() * 10;
	    lastPick = mBigItems[1];
        genLogic();
      } else {
        var bigPrice1 = mBigPriceGen(1);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[1]} for $${bigPrice1}`;
        document.getElementById('bMSlot0').value = `1~Computer Store~${bigPrice1}`;
	    lastPick = mBigItems[1];
      }
    } else if (mBRand < 9) { //cafe
      if (lastPick === mBigItems[2]) {
        mBRand = Math.random() * 10;
	    lastPick = mBigItems[2];
        genLogic();
      } else {
        var bigPrice2 = mBigPriceGen(2);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[2]} for $${bigPrice2}`;
        document.getElementById('bMSlot0').value = `1~Cafe~${bigPrice2}`;
	    lastPick = mBigItems[2];
      }
    } else if (mBRand >= 9) { //restaurant
      if (lastPick === mBigItems[3]) {
        mBRand = Math.random() * 10;
	    lastPick = mBigItems[3];
        genLogic();
     } else {
        var bigPrice3 = mBigPriceGen(3);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[3]} for $${bigPrice3}`;
        document.getElementById('bMSlot0').value = `1~Restaurant~${bigPrice3}`;
	    lastPick = mBigItems[3];
      }
    }
  }
}

function mSlotGen() { //function for generating market slot items
  var c = 0;
  var mSlotItems = ['Wood', 'Brick', 'Steel', 'Silver', 'Gold', 'Platinum', 'Cell Phone', 'Computer']; //market slot item
  //var mItemNum = (document.getElementById('mSlots').childNodes.length - 1) / 2; //get how many items
  numItems = [];

  //this the the logic for getting rarity on the items. No they werent picked at random, this is MANY minutes of balancing
  for (i = 0; i < mSlotItems.length; i++) {
    var randItem = Math.random() * 100;

    if (randItem < 25) { //wood
      itemInput(0, 'Wood', i);
    } else if (randItem < 45) { //brick
      itemInput(1, 'Brick', i);
    } else if (randItem < 65) { //steel
      itemInput(2, 'Steel', i);
    } else if (randItem < 80) { //silver
      itemInput(3, 'Silver', i);
    } else if (randItem < 87) { //gold
      itemInput(4, 'Gold', i);
    } else if (randItem < 93) { //platinum
      itemInput(5, 'Platinum', i);
    } else if (randItem < 97) { //cell phone
      itemInput(6, 'Cell Phone', i);
    } else if (randItem <= 100) { //computer
      itemInput(7, 'Computer', i);
    }
  }
  function itemInput(index, type, i) { //index = number 0-7; type = wood, brick, ect...; i = num for id calls
    var numItems = numOfItem(index);
    var price = mPriceGen(index, numItems, i);
    document.getElementById("mSlot" + i).innerHTML = `${numItems} ${mSlotItems[index]} for $${price}`;
    document.getElementById("mSlot" + i).value = `${numItems}~${type}~${price}`;
  }
}

function mPriceGen(index, amount, i) { //a is a number 0-7 for the array index of the product; b is the amount of item; i is for the id call
  var mItemPrice = [10, 15, 25, 50, 100, 150, 1000, 1500];
  //(medium +- (medium*.9/rand(+.1))/10 --> round)*number of items
  if (Math.random()>.5) {
    return ((mItemPrice[index] + (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed()) * amount;
  } else {
    var rawPrice = (mItemPrice[index] - (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed();

    setTimeout(botBuy, (rawPrice / mItemPrice[index] * 10000),'mSlot', i); //for buying the items
    return (rawPrice * amount);
  }
}

function mBigPriceGen(index) { //a is a number 0-3
  var mItemPrice = [10000, 20000, 25000, 75000];

  if (Math.random()>.5) {
    return ((mItemPrice[index] + (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed());
  } else {
    var rawPrice1 = (mItemPrice[index] - (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed();
    setTimeout(botBuy, (rawPrice1 / mItemPrice[index] * 10000), 'bMSlot', 0);
    return rawPrice1
  }
}

function numOfItem(a) {
  if (a < 4) {
    return (Math.random() * 9 + 1).toFixed();
  } else if (a < 6) {
    return (Math.random() * 4 + 1).toFixed();
  } else {
    return (Math.random() * 2 + 1).toFixed();
  }
}

function botBuy(id, index) {
  var content = document.getElementById(id + index).innerHTML.strike();
  document.getElementById(id + index).innerHTML = content;
  document.getElementById(id + index).value = false;
}

var myItems = [];
function buy(id, index) {
    var content = document.getElementById(id + index).value;
    if (content) {
      var moneyBool = moneyFn(parseInt(content.split('~')[2]));
      money = moneyBool[0];
      if (moneyBool[1]) {
        myItems.push(content);
        botBuy(id, index);
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
	itemType(myItems[i].split('~')[1], parseInt(myItems[i].split('~')[0]));
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
  var maxQuant = [];
  var parent = document.getElementById('container');

  while (parent.hasChildNodes()) {
    parent.removeChild(parent.firstChild);
  }

  if (maxQuant.length === 0) {
    for (var a = 0; a < itemArr.length; a++) {
      maxQuant.push(parseInt(itemArr[a].split(' ')[0]));
    }
  }

  for (var b = 0; b < itemArr.length; b++) {
    var newDiv = document.createElement('div');
    newDiv.className = 'gridItem';

    var amountType = document.createElement('p');
    amountType.innerText = `${itemArr[b].split(' ')[0]}/${maxQuant[b]} ${itemArr[b].replace(/[0-9]|\/|/g, '').trim()}`;
    amountType.setAttribute('id', 'typeID' + b);

    var up = document.createElement('p');
    up.innerText = '▲';
    up.setAttribute('id', 'upID~' + b);

    var down = document.createElement('p');
    down.innerText = '▼';
    down.setAttribute('id', 'downID~' + b);

    var input = document.createElement('input');
    input.type = 'number';
    input.setAttribute('id', 'input~' + b);
    input.value = itemType(itemArr[b].replace(/[0-9]|\/|/g, '').trim())*itemArr[b].split(' ')[0];

    var confirm = document.createElement('button');
    confirm.innerText = 'Advertise';
    confirm.setAttribute('id', 'confirm~' + b);

    newDiv.appendChild(up);
    newDiv.appendChild(amountType);
    newDiv.appendChild(down);
    newDiv.appendChild(input);
    newDiv.appendChild(confirm);
    document.getElementById('container').appendChild(newDiv);
  }


  for (var c = 0; c < itemArr.length; c++) { //need to reference different id's to add listeners
    document.getElementById('upID~' + c).addEventListener('click', function() { //up stuff
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
    document.getElementById('downID~' + c).addEventListener('click', function() { //down stuff
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
    document.getElementById('confirm~' + c).addEventListener('click', function() { //advertise stuff
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
        alert("You don't have enough slots");
      }
    })
  }
}

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


function itemType(type, amount) {
  switch (type) {
    case 'Wood':
	  return ((amount) ? (wood += amount) : 10);
      break;
    case 'Brick':
	  return ((amount) ? (brick += amount) : 15);
      break;
    case 'Steel':
	  return ((amount) ? (steel += amount) : 25);
      break;
    case 'Silver':
	  return ((amount) ? (silver += amount) : 50);
      break;
    case 'Gold':
	  return ((amount) ? (gold += amount) : 100);
      break;
    case 'Platinum':
	  return ((amount) ? (platinum += amount) : 150);
      break;
    case 'Cell Phone':
	  return ((amount) ? (cellPhone += amount) : 1000);
      break;
    case 'Computer':
	  return ((amount) ? (computer += amount) : 1500);
      break;
    case 'Electronics Store':
	  return ((amount) ? (electronicsStore += amount) : 10000);
      break;
    case 'Computer Store':
	  return ((amount) ? (computerStore += amount) : 20000);
      break;
    case 'Cafe':
	  return ((amount) ? (cafe += amount) : 25000);
      break;
    case 'Restaurant':
	  return ((amount) ? (restaurant += amount) : 75000);
      break;
  }
}

function botBuyMM(index, deleteSlot) {
  var content = document.getElementById('MMhost' + index).innerHTML.strike();
  document.getElementById('MMhost' + index).innerHTML = content;
  setTimeout(function(){deleteSlot.remove();}, 2000);
}
