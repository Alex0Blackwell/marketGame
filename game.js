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
}

var lastPick;
function mSlotGenBig() {
  var mBigItems = ['Electronics Store', 'Computer Store', 'Café', 'Restaurant'];
  var mBRand = Math.random()*10;


  if (mBRand<4) { //electronics store
    if (lastPick===mBigItems[0]) {
      mSlotGenBig();
    } else {
        document.getElementById('bMSlot0').innerHTML = `${mBigItems[0]} for $${mBigPriceGen(0)}`;
        document.getElementById('bMSlot0').value = 'electronics store';
      }
    lastPick = mBigItems[0];
  }
    else if (mBRand>=4&&mBRand<7) { //computer store
      if (lastPick===mBigItems[1]) {
        mSlotGenBig();
      } else {
          document.getElementById('bMSlot0').innerHTML = `${mBigItems[1]} for $${mBigPriceGen(1)}`;
          document.getElementById('bMSlot0').value = 'computer store';
        }
      lastPick = mBigItems[1];
    }
      else if (mBRand>=7&&mBRand<9) { //cafe
        if (lastPick===mBigItems[2]) {
          mSlotGenBig();
        } else {
            document.getElementById('bMSlot0').innerHTML = `${mBigItems[2]} for $${mBigPriceGen(2)}`;
            document.getElementById('bMSlot0').value = 'cafe';
          }
        lastPick = mBigItems[2];
      }
        else if (mBRand>=9) { //restaurant
          if (lastPick===mBigItems[3]) {
            mSlotGenBig();
          } else {
              document.getElementById('bMSlot0').innerHTML = `${mBigItems[3]} for $${mBigPriceGen(3)}`;
              document.getElementById('bMSlot0').value = 'restaurant';
            }
          lastPick = mBigItems[3];
        }
}

function mSlotGen() { //function for generating market slot items
  var c = 0;
  var mSlotItems = ['wood', 'brick', 'steel', 'silver', 'gold', 'platinum', 'cell phone', 'computer']; //market slot item
  var mItemNum = (document.getElementById('mSlots').childNodes.length-1)/2; //get how many items

//-- this the the logic for getting rarity on the items. No they werent picked at random, this is MANY minutes of balancing
  for(i=0;i<mItemNum;i++) {

    var randItem = Math.random()*100;

    if(randItem<25){ //wood
      var numItems0 = numOfItem(0);
      document.getElementById("mSlot"+i).innerHTML = `${numItems0} ${mSlotItems[0]} for $${mPriceGen(0,numItems0,i)}`;
      document.getElementById("mSlot"+i).value = 'wood';
    }
      else if (randItem>=25&&randItem<45) { //brick
        var numItems1 = numOfItem(1);
        document.getElementById("mSlot"+i).innerHTML = `${numItems1} ${mSlotItems[1]} for $${mPriceGen(1,numItems1,i)}`;
        document.getElementById("mSlot"+i).value = 'brick';
      }
        else if (randItem>=45&&randItem<65) { //steel
          var numItems2 = numOfItem(2);
          document.getElementById("mSlot"+i).innerHTML = `${numItems2} ${mSlotItems[2]} for $${mPriceGen(2,numItems2,i)}`;
          document.getElementById("mSlot"+i).value = 'steel';
        }
          else if (randItem>=65&&randItem<80) { //silver
            var numItems3 = numOfItem(3);
            document.getElementById("mSlot"+i).innerHTML = `${numItems3} ${mSlotItems[3]} for $${mPriceGen(3,numItems3,i)}`;
            document.getElementById("mSlot"+i).value = 'silver';
          }
            else if (randItem>=80&&randItem<87) { //gold
              var numItems4 = numOfItem(4);
              document.getElementById("mSlot"+i).innerHTML = `${numItems4} ${mSlotItems[4]} for $${mPriceGen(4,numItems4,i)}`;
              document.getElementById("mSlot"+i).value = 'gold';
            }
              else if (randItem>=87&&randItem<93) { //platinum
                var numItems5 = numOfItem(5);
                document.getElementById("mSlot"+i).innerHTML = `${numItems5} ${mSlotItems[5]} for $${mPriceGen(5,numItems5,i)}`;
                document.getElementById("mSlot"+i).value = 'platinum';
              }
                else if (randItem>=93&&randItem<97) { //cell phone
                  var numItems6 = numOfItem(6);
                  document.getElementById("mSlot"+i).innerHTML = `${numItems6} ${mSlotItems[6]} for $${mPriceGen(6,numItems6,i)}`;
                  document.getElementById("mSlot"+i).value = 'cell phone';
                }
                  else if (randItem>=97&&randItem<=100) { //computer
                    var numItems7 = numOfItem(7);
                    document.getElementById("mSlot"+i).innerHTML = `${numItems7} ${mSlotItems[7]} for $${mPriceGen(7,numItems7,i)}`;
                    document.getElementById("mSlot"+i).value = 'computer';
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

		if(content0!=false) {
			myItems.push(content0);
			botBuy(b);
		}
	}

	if(a===true) {
		var content1 = document.getElementById('bMSlot0').value;

		if(content1!=false) {
			myItems.push(content1);
			botBuy1();
		}
	}

  // for (var i=0; i<myItems.length; i++) {
  //   var wood = [];
  //   var brick = [];
  //   var steel = [];
  //   var silver = [];
  //   var gold = [];
  //   var platinum = [];
  //   var cellPhone = [];
  //   var computer = [];
  //   var electronicsStore = [];
  //   var computerStore = [];
  //   var cafe = [];
  //   var restaurant = [];
  //
  // }

  invenCopy();
  //console.log(myItems.toString());
  document.getElementById('inventory').innerHTML = invenCopy();
}

function invenCopy() {
  var tempDup = [];
  var finalDups = [];

//--for getting how many times an item repeats
  for (var a=0; a<myItems.length; a++) {
    for (var b=0; b<myItems.length; b++) {
      if (myItems[a]===myItems[b]) {
        tempDup.push(myItems[b]);
      }
      if (b===(myItems.length-1)) {
        finalDups.push(`${tempDup.length} ${myItems[a]}`);
        tempDup = [];
      }
    }
  }
  //console.log(finalDups);
//--now we need to get rid of the duplicates, eg ['2 wood', '2 wood']
  for (var c=0; c<finalDups.length; c++) {
    for (var d=0; d<finalDups.length; d++) {
      //console.log('1 '+finalDups[c].split(' ')[1]);
      //console.log('2 '+finalDups[d].split(' ')[1]);

      console.log(finalDups);

      if (c>0&&finalDups[c].split(' ')[1]===finalDups[d].split(' ')[1]) {
        console.log('entered');
        //&&finalDups[c].split(' ')[0]!=1

        //console.log('before'+finalDups);
        //finalDups.splice((c-lenSub), 1);
        //lenSub++;
        //console.log('after'+finalDups);
        //left side + right side
        //finalDups = finalDups.splice((c+1), )

        //-----------------------------------------
        // var rs = finalDups;
        // var ls = finalDups;
        // var finRs = [];
        // var finLs = [];
        // //console.log(finalDups);
        //
        // for (var f = 0; f < c; f++) {
        //   //console.log(rs);
        //   var rsString = rs.shift();
        //   finRs.push(rsString);
        //   console.log(rsString);
        // }
        // console.log(finRs);
        //
        //
        // for (var e=0;e<c;e++) {
        //   var lsString = ls.pop();
        //   finLs.push(lsString);
        // }
        // finalDups = finRs.concat(finLs);

        //shift everything to the left and pop the last one if undefined
        var setLength = finalDups.length;
        if (finalDups[setLength-1]===undefined) {
          finalDups.pop();
        } else {
          for (var e=c; e<=setLength-c; e++) {
            finalDups[e] = finalDups[e+1];
            console.log(finalDups);
          }
          finalDups.pop();
        }
      }
    }
    //finalDups = finRs.concat(finLs);
  }
  //console.log(finalDups);
  return finalDups.toString();
}

//APARENTLY THE FINALDUPS ARRAY IS AT 1 LOL UGGHHH REEEE!
