function checkCashRegister(price, cash, cid) {
  var change = cash - price,
    cashRegister = [],
    newCid = [],
    changeAvailable;

  //array with values of each denomination
  const denominations = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100]

  //adds available change to register change array
  cid.forEach(val => { cashRegister.push(val[1]) })

  //adds up total change available in cash register
  changeAvailable = cashRegister.reduce((total, val) => total + val)

  //function to round change to avoid precision error
  function round(num) {
    return Math.round(num * 100) / 100
  }

  changeAvailable = round(changeAvailable);


  //compare with change required
  //checks for each scenario
  if (changeAvailable < change) {
    //no change values required for insufficient funds
    return { status: "INSUFFICIENT_FUNDS", change: [] };
  } else if (changeAvailable == change) {
    //close the register if available change equals needed change and return input change
    return { status: "CLOSED", change: cid };
  } else {
    var restChange = change;
    //start with highest change demonination and subtract  
    for (let i = cashRegister.length - 1; i >= 0; i--) {
      //add highest availale denomination if remaining change bigger or equal
      if (restChange >= cashRegister[i]) {
        //add denomination and value of change to change array
        newCid.push(cid[i]);
        //redrease remaining change outstanding by amount added to array
        restChange -= cashRegister[i];
        restChange = round(restChange);
      } else if (restChange < cashRegister[i]) {
        //if available change is higher than required change, calculate how much needed
        let amount = Math.floor(restChange / denominations[i]);
        if (amount != 0) {
          newCid.push([cid[i][0], amount * denominations[i]])
          restChange -= amount * denominations[i];
          restChange = round(restChange);
        }
      }
    }
    //if outstanding change not zero after subtracting available register change: register value doesnt fit change required
    if (restChange != 0) {
      return { status: "INSUFFICIENT_FUNDS", change: [] };
    } else {
      return { status: "OPEN", change: newCid };
    }

  }
}
//test function 
checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]);