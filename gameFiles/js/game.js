var myItems = []; //the inventory items that the user has bought

var lastPick; // used for making sure the same large item doesn't spawn consecutively


//The below are variables stored in local storage so the users progress can be saved after closing or refreshing
if (!localStorage.moneySave) {localStorage.moneySave = 1500;}

if (!localStorage.woodSave) {localStorage.woodSave = 0;}
if (!localStorage.brickSave) {localStorage.brickSave = 0;}
if (!localStorage.steelSave) {localStorage.steelSave = 0;}
if (!localStorage.silverSave) {localStorage.silverSave = 0;}
if (!localStorage.goldSave) {localStorage.goldSave = 0;}
if (!localStorage.platinumSave) {localStorage.platinumSave = 0;}
if (!localStorage.cellPhoneSave) {localStorage.cellPhoneSave = 0;}
if (!localStorage.computerSave) {localStorage.computerSave = 0;}
if (!localStorage.electronicsStoreSave) {localStorage.electronicsStoreSave = 0;}
if (!localStorage.computerStoreSave) {localStorage.computerStoreSave = 0;}
if (!localStorage.cafeSave) {localStorage.cafeSave = 0;}
if (!localStorage.restaurantSave) {localStorage.restaurantSave = 0;}

document.getElementById('moneyP').innerHTML = `Money: $${localStorage.moneySave}`; //display money

marketTime(); //start timers
mSlotGen(); //generate light market items
mSlotGenBig(); //generate large market items
myMarket(); //if the user has items in their market they will display

//for counting down and calling the market generation
function marketTime() {
  var t0 = 15000;
  var t1 = 75000;
  var rawTime0 = t0 / 1000;
  var rawTime1 = t1 / 1000;

  setInterval(mSlotGen, t0);
  setInterval(mSlotGenBig, t1);

  document.getElementById('mRefreshT').innerHTML = `${mCountDwn0()}`;
  setInterval(function() {
    document.getElementById('mRefreshT').innerHTML = `${mCountDwn0()}`;
  }, 1000);

  document.getElementById('mBRefreshT').innerHTML = `${mCountDwn1()}`;
  setInterval(function() {
    document.getElementById('mBRefreshT').innerHTML = `${mCountDwn1()}`;
  }, 1000);

  function mCountDwn0() { //light market countdown function
    if (rawTime0 === 0) {
      rawTime0 = t0 / 1000;
    }
    return `${rawTime0--} secs`;
  }

  function mCountDwn1() { //large market countdown function
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
}

//for generating large market Items
function mSlotGenBig() {
  var mBigItems = ['Electronics Store', 'Computer Store', 'Café', 'Restaurant'];
  var mBRand = Math.random() * 10;

  genLogic();

  //genLogic generates more typically less expensive items and makes sure the same item is generated consecutively
  function genLogic() {
    if (mBRand < 4) { //electronics store
      if (lastPick === mBigItems[0]) {
	    noRepeat(0);
      } else {
        var bigPrice0 = mBigPriceGen(0);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[0]} for $${bigPrice0}`;
        document.getElementById('bMSlot0').value = `1~Electronics Store~${bigPrice0}`;
	    lastPick = mBigItems[0];
      }
    } else if (mBRand < 7) { //computer store
      if (lastPick === mBigItems[1]) {
        noRepeat(1);
      } else {
        var bigPrice1 = mBigPriceGen(1);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[1]} for $${bigPrice1}`;
        document.getElementById('bMSlot0').value = `1~Computer Store~${bigPrice1}`;
	    lastPick = mBigItems[1];
      }
    } else if (mBRand < 9) { //cafe
      if (lastPick === mBigItems[2]) {
        noRepeat(2);
      } else {
        var bigPrice2 = mBigPriceGen(2);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[2]} for $${bigPrice2}`;
        document.getElementById('bMSlot0').value = `1~Cafe~${bigPrice2}`;
	    lastPick = mBigItems[2];
      }
    } else if (mBRand >= 9) { //restaurant
      if (lastPick === mBigItems[3]) {
        noRepeat(3);
     } else {
        var bigPrice3 = mBigPriceGen(3);
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[3]} for $${bigPrice3}`;
        document.getElementById('bMSlot0').value = `1~Restaurant~${bigPrice3}`;
	    lastPick = mBigItems[3];
      }
    }
  }
  function noRepeat(index) {
	mBRand = Math.random() * 10;
	lastPick = mBigItems[index];
    genLogic();
  }
}

//for generating market slot items
function mSlotGen() {
  var c = 0;
  var mSlotItems = ['Wood', 'Brick', 'Steel', 'Silver', 'Gold', 'Platinum', 'Cell Phone', 'Computer']; //market slot item
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

//gets the light market prices
function mPriceGen(index, amount, i) {
  var mItemPrice = [10, 15, 25, 50, 100, 150, 1000, 1500];
  if (Math.random()>.5) {
    return ((mItemPrice[index] + (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed()) * amount;
  } else {
    var rawPrice = (mItemPrice[index] - (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed();

    setTimeout(botBuy, (rawPrice / mItemPrice[index] * 10000),'mSlot', i); //for buying the items
    return (rawPrice * amount);
  }
}

//gets the large market prices
function mBigPriceGen(index) {
  var mItemPrice = [10000, 20000, 25000, 75000];

  if (Math.random()>.5) {
    return ((mItemPrice[index] + (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed());
  } else {
    var rawPrice1 = (mItemPrice[index] - (mItemPrice[index] * 0.9 / (Math.random() + 0.1)) / 10).toFixed();
    setTimeout(botBuy, (rawPrice1 / mItemPrice[index] * 10000), 'bMSlot', 0);
    return rawPrice1
  }
}

//sets the maximum number of items that will spawn so cheaper items spawn in greater quantities
function numOfItem(a) {
  if (a < 4) {
    return (Math.random() * 9 + 1).toFixed();
  } else if (a < 6) {
    return (Math.random() * 4 + 1).toFixed();
  } else {
    return (Math.random() * 2 + 1).toFixed();
  }
}

//for when a bot buys an item it crosses it out and makes it impossible to buy
function botBuy(id, index) {
  var content = document.getElementById(id + index).innerHTML.strike();
  document.getElementById(id + index).innerHTML = content;
  document.getElementById(id + index).value = false;
}

//when buying items, makes sure the item can't be bought again, crosses it out, subtract the item price from the users money, and adds the items to the inventory
function buy(id, index) {
    var content = document.getElementById(id + index).value;
    if (content) {
      var moneyBool = moneyFn(parseInt(content.split('~')[2]));
      var moneyRewrite = parseInt(moneyBool[0]);
      localStorage.setItem('moneySave', moneyRewrite);
      if (moneyBool[1]) {
        myItems.push(content);
        botBuy(id, index);
      }
    }
  document.getElementById('inventory').innerHTML = invenCopy();
  document.getElementById('moneyP').innerHTML = `Money: $${localStorage.moneySave}`;
  myMarket();
}

//adds all the repeating items together and organizes them from cheapest to most expensive, displaying only the items that have a quantity greater than 0
function invenCopy() {
  var finalInven = [];

  for (var i = 0; i < myItems.length; i++) {
	itemType(myItems[i].split('~')[1], parseInt(myItems[i].split('~')[0]));
    myItems = [];
  }
  var amountArr = [`${localStorage.woodSave} Wood`, `${localStorage.brickSave} Brick`, `${localStorage.steelSave} Steel`, `${localStorage.silverSave} Silver`, `${localStorage.goldSave} Gold`, `${localStorage.platinumSave} Platinum`, `${localStorage.cellPhoneSave} Cell Phone`, `${localStorage.computerSave} Computer`, `${localStorage.electronicsStoreSave} Electronics Store`, `${localStorage.computerStoreSave} Computer Store`, `${localStorage.cafeSave} Cafe`, `${localStorage.restaurantSave} Restaurant`];
  for (var a = 0; a < amountArr.length; a++) {
    if (parseInt(amountArr[a].slice(0, 1)) > 0) {
      finalInven.push(amountArr[a]);
    }
  }
  return finalInven;
}

//subtracts price if user money doesn't go negative, also returns a flag that will be used later to decide to push the item to inventory or not
function moneyFn(price) {
  var money = parseInt(localStorage.moneySave);
  if (money - price >= 0) {
    localStorage.moneySave = Number(localStorage.moneySave) - price;
    return [localStorage.moneySave, true];
  }
  return [localStorage.moneySave, false];
}

//for everything about the users market: adding items to the users live market, selecting the amount of items to add, selecting the price of the items, the option to delete live items
function myMarket() {
  var itemArr = invenCopy();
  var maxQuant = []; //used so you can't add more items than you have to your market
  var parent = document.getElementById('container');

  while (parent.hasChildNodes()) { //deletes anything currently in the users "add to market"
    parent.removeChild(parent.firstChild);
  }

  if (maxQuant.length === 0) { //sets maxQuant if not already
    for (var a = 0; a < itemArr.length; a++) {
      maxQuant.push(parseInt(itemArr[a].split(' ')[0]));
    }
  }

  for (var b = 0; b < itemArr.length; b++) { //loop that dynamically generates html via javascript and gives these elements unique id's
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


  for (var c = 0; c < itemArr.length; c++) { //a simular for loop is needed to reference different id's to add listeners
      document.getElementById('upID~' + c).addEventListener('click', function() { //up button to increment quantity by + 1
      var itemOrderNum0 = parseInt(this.id.split('~')[1]);
      var amountOrig = parseInt(itemArr[itemOrderNum0].split(' ')[0]);

      if (amountOrig < maxQuant[itemOrderNum0]) {
        itemArr[itemOrderNum0] = `${amountOrig+1}/${maxQuant[itemOrderNum0]} ${itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('input~' + itemOrderNum0).value = itemType(itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim())*(amountOrig+1);
      } else {
        itemArr[itemOrderNum0] = `${amountOrig}/${maxQuant[itemOrderNum0]} ${itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('input~' + itemOrderNum0).value = itemType(itemArr[itemOrderNum0].replace(/[0-9]|\/|/g, '').trim())*amountOrig;
      }
	    document.getElementById('typeID' + itemOrderNum0).innerHTML = itemArr[itemOrderNum0];
    })

    document.getElementById('downID~' + c).addEventListener('click', function() { //down button to increment quantity by - 1
      var itemOrderNum1 = parseInt(this.id.split('~')[1]);
      var amountOrig1 = parseInt(itemArr[itemOrderNum1].split(' ')[0]);

      if (amountOrig1 > 1) {
        itemArr[itemOrderNum1] = `${amountOrig1-1}/${maxQuant[itemOrderNum1]} ${itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('input~' + itemOrderNum1).value = itemType(itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim())*(amountOrig1 - 1);
      } else {
        itemArr[itemOrderNum1] = `${amountOrig1}/${maxQuant[itemOrderNum1]} ${itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim()}`;
        document.getElementById('input~' + itemOrderNum1).value = itemType(itemArr[itemOrderNum1].replace(/[0-9]|\/|/g, '').trim())*(amountOrig1);
      }
	    document.getElementById('typeID' + itemOrderNum1).innerHTML = itemArr[itemOrderNum1];
    })
    //------------------------------------------------------------------------------
    document.getElementById('confirm~' + c).addEventListener('click', function() { //advertise button to put on the users live market
      var itemOrderNum0 = parseInt(this.id.split('~')[1]);
      var value = document.getElementById('input~' + itemOrderNum0).value;
      var div = document.getElementById("myLiveItems");
      var nodeList = div.getElementsByTagName("div").length;

      if (value < 0) {
        document.getElementById('input~' + itemOrderNum0).value = 0;
      } else if (nodeList < 6) {
        var type = document.getElementById('typeID' + itemOrderNum0).innerHTML;
        switch (type.replace(/[0-9]|\/|/g, '').trim()) {
          case 'Wood':
            hostAppend(itemOrderNum0, type, 'Wood', value);
            localStorage.woodSave = Number(localStorage.woodSave) - parseInt(type.split('/')[0]);
            break;
          case 'Brick':
            hostAppend(itemOrderNum0, type, 'Brick', value);
            localStorage.brickSave = Number(localStorage.brickSave) - parseInt(type.split('/')[0]);
            break;
          case 'Steel':
            hostAppend(itemOrderNum0, type, 'Steel', value);
            localStorage.steelSave =  Number(localStorage.steelSave) - parseInt(type.split('/')[0]);
            break;
          case 'Silver':
            hostAppend(itemOrderNum0, type, 'Silver', value);
            localStorage.silverSave = Number(localStorage.silverSave) - parseInt(type.split('/')[0]);
            break;
          case 'Gold':
            hostAppend(itemOrderNum0, type, 'Gold', value);
            localStorage.goldSave = Number(localStorage.goldSave) - parseInt(type.split('/')[0]);
            break;
          case 'Platinum':
            hostAppend(itemOrderNum0, type, 'Platinum', value);
            localStorage.platinumSave = Number(localStorage.platinumSave) - parseInt(type.split('/')[0]);
            break;
          case 'Cell Phone':
            hostAppend(itemOrderNum0, type, 'Cell Phone', value);
            localStorage.cellPhoneSave = Number(localStorage.cellPhoneSave) - parseInt(type.split('/')[0]);
            break;
          case 'Computer':
            hostAppend(itemOrderNum0, type, 'Computer', value);
            localStorage.computerSave = Number(localStorage.computerSave) - parseInt(type.split('/')[0]);
            break;
          case 'Electronics Store':
            hostAppend(itemOrderNum0, type, 'Electronics Store', value);
            localStorage.electronicsStoreSave = Number(localStorage.electronicsStoreSave) - parseInt(type.split('/')[0]);
            break;
          case 'Computer Store':
            hostAppend(itemOrderNum0, type, 'Computer Store', value);
            localStorage.computerStoreSave = Number(localStorage.computerStoreSave) - parseInt(type.split('/')[0]);
            break;
          case 'Cafe':
            hostAppend(itemOrderNum0, type, 'Café', value);
            localStorage.cafeSave = Number(localStorage.cafeSave) - parseInt(type.split('/')[0]);
            break;
          case 'Restaurant':
            hostAppend(itemOrderNum0, type, 'Restaurant', value);
            localStorage.restaurantSave = Number(localStorage.restaurantSave) - parseInt(type.split('/')[0]);
            break;
        }
        myMarket();
        document.getElementById('inventory').innerHTML = invenCopy();
      } else {
        alert("You don't have enough slots"); //the user must now wait for more slots or delete items without any money gained
      }
    })
  }
}

//for adding items to the users live market, this includes the number of which type of item, the price, and a delete button. The funtion also starts a timer for which the item will be bought out
function hostAppend(index, content, type, price) {
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
  itemPrice.setAttribute('id', 'itemPrice' + nodeList);
  var deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'delete';
  deleteBtn.onclick = function() {newDiv.remove();}
  newDiv.appendChild(newItem);
  newDiv.appendChild(itemPrice);
  newDiv.appendChild(deleteBtn);
  document.getElementById('myLiveItems').appendChild(newDiv);
  setTimeout(botBuyMM, Math.pow(price / (itemType(type)*amount),3) * 20000, nodeList, newDiv); //exponential function where price is x and time is y, if x is the average price, it will take 20 secs to buy out
}

//used to reference what type of item it is and then dealing with it based on a ternary condition to either increase the amount of an item, or return the average price
function itemType(type, amount) {
  switch (type) {
    case 'Wood':
	  return ((amount) ? (localStorage.woodSave = Number(localStorage.woodSave) + amount) : 10);
      break;
    case 'Brick':
	  return ((amount) ? (localStorage.brickSave = Number(localStorage.brickSave) + amount) : 15);
      break;
    case 'Steel':
	  return ((amount) ? (localStorage.steelSave = Number(localStorage.steelSave) + amount) : 25);
      break;
    case 'Silver':
	  return ((amount) ? (localStorage.silverSave = Number(localStorage.silverSave) + amount) : 50);
      break;
    case 'Gold':
	  return ((amount) ? (localStorage.goldSave = Number(localStorage.goldSave) + amount) : 100);
      break;
    case 'Platinum':
	  return ((amount) ? (localStorage.platinumSave = Number(localStorage.platinumSave) + amount) : 150);
      break;
    case 'Cell Phone':
	  return ((amount) ? (localStorage.cellPhoneSave = Number(localStorage.cellPhoneSave) + amount) : 1000);
      break;
    case 'Computer':
	  return ((amount) ? (localStorage.computerSave = Number(localStorage.computerSave) + amount) : 1500);
      break;
    case 'Electronics Store':
	  return ((amount) ? (localStorage.electronicsStoreSave = Number(localStorage.electronicsStoreSave) + amount) : 10000);
      break;
    case 'Computer Store':
	  return ((amount) ? (localStorage.computerStoreSave = Number(localStorage.computerStoreSave) + amount) : 20000);
      break;
    case 'Cafe':
	  return ((amount) ? (localStorage.cafeSave = Number(localStorage.cafeSave) + amount) : 25000);
      break;
    case 'Restaurant':
	  return ((amount) ? (localStorage.restaurantSave = Number(localStorage.restaurantSave) + amount) : 75000);
      break;
  }
}

//the bot buying function for the users market which buys the item, crosses it out, adds the money to the users total amount, and removes it after 2 seconds
function botBuyMM(index, deleteSlot) {
  var content = document.getElementById('MMhost' + index).innerHTML.strike();
  document.getElementById('MMhost' + index).innerHTML = content;
  setTimeout(function(){
    localStorage.moneySave = parseInt(document.getElementById('itemPrice' + index).innerHTML.replace('$','')) + Number(localStorage.moneySave);
    document.getElementById('moneyP').innerHTML = `Money: $${localStorage.moneySave}`;
    deleteSlot.remove();
  }, 2000);
}
