import { Component, OnInit } from '@angular/core';
import { StocksInMarketService } from '../shared/stocks/index';
import { MoneyBalanceService } from '../shared/money/index';
import { Share } from '../shared/shares';

@Component({
  selector: 'app-stocks-in-market',
  templateUrl: './stocks-in-market.component.html',
  styleUrls: ['./stocks-in-market.component.css']
})
export class StocksInMarketComponent implements OnInit {
  stockName1: string;
  stockName2: string;
  stockPrice1: number;
  stockPrice2: number;
  orderPrice1: number;
  orderQuantity1: number;
  orderPrice2: number;
  orderQuantity2: number;
  sellOrderPrice1: number;
  sellOrderQuantity1: number;
  sellOrderPrice2: number;
  sellOrderQuantity2: number;
  orderHasBeenPlaced: boolean;
  noEnoughMoney: boolean;
  priceTooLow: boolean;
  shareBalanceTooLow: boolean;
  money: number;
  sharesBalance: Share[] = [
    { name: 'Pfizer', quantity: 0 },
    { name: 'Boeing', quantity: 0 },
  ];
  constructor(
    private stocksInMarketService: StocksInMarketService,
    private moneyBalanceService: MoneyBalanceService
  ) { }
  ngOnInit() {
    this.initialiseMoneyBalance().then(() => this.money = this.moneyBalanceService.getMoneyBalance());
  }
  /**
   * Displays the dashboard with the stocks in the market, stock holding by the user and the money balance.
   * Uses the localStorage to initialise the variables */
  displayStocks() {
    this.stockName1 = JSON.parse(   localStorage.getItem('pfizerName')  );
    this.stockName2 = JSON.parse( localStorage.getItem('boeingName')  );
    this.stockPrice2 = JSON.parse( localStorage.getItem('boeingPrice')  );
    this.stockPrice1 = JSON.parse( localStorage.getItem('pfizerPrice')  );
    if (JSON.parse( localStorage.getItem('shares')  )) {
      const theSharesFromLocalStorage: any = JSON.parse( localStorage.getItem('shares')  );
      this.sharesBalance[0].quantity = theSharesFromLocalStorage[0].quantity;
      this.sharesBalance[1].quantity = theSharesFromLocalStorage[1].quantity;
    }
    if ( JSON.parse( localStorage.getItem('moneyBalance')) ) {
      this.money = JSON.parse( localStorage.getItem('moneyBalance'));
    } else {
      this.money = this.moneyBalanceService.getMoneyBalance();
    }
  }
  /**
   * Placing buy orders on the two stocks available in the market */
  placeBuyOrder(stockName: string, orderPrice: number, orderQuantity: number) {
    let moneyToSpend = orderPrice * orderQuantity;
    let moneyInBalance =  this.moneyBalanceService.getMoneyBalance();
    switch (stockName) {
      case 'Pfizer':
        if (this.stockPrice1 > orderPrice) {
            this.displayPriceTooLowNotification();
          } else {
           this.pushToSharesArray(stockName, orderQuantity);
           this.doMoneyTransaction(moneyToSpend, moneyInBalance);
          }
        break;
      case 'Boeing':
        if (this.stockPrice2 > orderPrice) {
          this.displayPriceTooLowNotification();
        } else {
          this.pushToSharesArray(stockName, orderQuantity);
          this.doMoneyTransaction(moneyToSpend, moneyInBalance);
        }
        break;
    }
  }
  /**
   * Placing sell orders on the two stocks that the user can have in the portfolio */
  placeSellOrder(stockName: string, orderPrice: number, orderQuantity: number) {
    let moneyToReceive = orderPrice * orderQuantity;
    let moneyInBalance =  this.moneyBalanceService.getMoneyBalance();
    switch (stockName) {
      case 'Pfizer':
        if (orderQuantity > this.sharesBalance[0].quantity){
          this.displayNotEnoughtSharesNotification();
        } else {
          this.removeFromSharesArray(stockName, orderQuantity);
          this.doMoneyTransactionSell(moneyToReceive, moneyInBalance);
        }
        break;
      case 'Boeing':
        if (orderQuantity > this.sharesBalance[1].quantity){
          this.displayNotEnoughtSharesNotification();
        } else {
          this.removeFromSharesArray(stockName, orderQuantity);
          this.doMoneyTransactionSell(moneyToReceive, moneyInBalance);
        }
        break;
    }
  }
  /**
   * Inrementing the shares quantity when new shares are bought */
  pushToSharesArray(stockName: string, orderQuantity: number){
    if ( this.sharesBalance.length > 0 ) {
      for (let i of this.sharesBalance) {
        switch (i.name) {
          case stockName:
            console.log('The name is ', i.name)
            let orderQuantityNumber = +orderQuantity;
            let iquantityNumber = +i.quantity;
            i.quantity = iquantityNumber + orderQuantityNumber;
            break;
          case 'other':
            break;
        }
        localStorage.setItem('shares', JSON.stringify(this.sharesBalance));
        console.log('this is our shares balance ', this.sharesBalance);
      }
    }
  }
  /**
   * Decrementing the shares from the array when tha shares are sold */
  removeFromSharesArray(stockName: string, orderQuantity: number){
    if ( this.sharesBalance.length > 0 ) {
      for (let i of this.sharesBalance) {
        switch (i.name) {
          case stockName:
            console.log('The name is ', i.name)
            let orderQuantityNumber = +orderQuantity;
            let iquantityNumber = +i.quantity;
            i.quantity = iquantityNumber - orderQuantityNumber;
            break;
          case 'other':
            break;
        }
        localStorage.setItem('shares', JSON.stringify(this.sharesBalance));
        console.log('this is our shares balance ', this.sharesBalance);
      }
    }
  }
  /**
   * Notification to display when the order (sell or buy) are placed */
  displayOrderPlacedNotification() {
    this.orderHasBeenPlaced = true;
    setTimeout(() => {
      this.orderHasBeenPlaced = false;
      this.money = this.moneyBalanceService.getMoneyBalance();
    }, 1000);
  }
  /**
   * Notification to display when there is not enough shares to be sold */
  displayNotEnoughtSharesNotification() {
    this.shareBalanceTooLow = true;
    setTimeout(() => {
      this.shareBalanceTooLow = false;
    }, 1000);
  }
  /**
   * Notification to display when the price set to buy a share is too low */
  displayPriceTooLowNotification() {
    this.priceTooLow = true;
    setTimeout(() => {
      this.priceTooLow = false;
    }, 1000);
  }
  /**
   * Notification to display when there is no enough money to buy shares */
  displayNotEnoughtMoneyNotification() {
    this.noEnoughMoney = true;
    setTimeout(() => {
      this.noEnoughMoney = false;
    }, 1000);
  }
  /**
   * Setting new money balance using Promise to avoid 'race condition'
   * Used with buy orders */
  setNewMoneyBalance(moneyToSpend: number, moneyInBalance: number) {
    let promise = new Promise((resolve, reject) => {
        let moneyLeft = moneyInBalance - moneyToSpend;
        this.moneyBalanceService.setMoneyBalance(moneyLeft);
        console.log('Now new balance is ', this.moneyBalanceService.getMoneyBalance());
        resolve();
    });
    return promise;
  }
  /**
   * Setting new money balance using Promise to avoid 'race condition'
   * Used with sell orders */
  setNewMoneyBalanceSell(moneyToReceive: number, moneyInBalance: number) {
    let promise = new Promise((resolve, reject) => {
      let newMoneyBalance = moneyInBalance + moneyToReceive;
      this.moneyBalanceService.setMoneyBalance(newMoneyBalance);
      console.log('Now new balance is ', this.moneyBalanceService.getMoneyBalance());
      resolve();
    });
    return promise;
  }
  /**
   * Money transaction for buy orders */
  doMoneyTransaction(moneyToSpend: number, moneyInBalance: number) {
    if (moneyToSpend <= moneyInBalance) {
      this.setNewMoneyBalance(moneyToSpend, moneyInBalance).then(() => this.displayOrderPlacedNotification());
    } else {
      this.displayNotEnoughtMoneyNotification();
    }
  }
  /**
   * Money transaction for sell orders */
  doMoneyTransactionSell(moneyToReceive: number, moneyInBalance: number) {
      this.setNewMoneyBalanceSell(moneyToReceive, moneyInBalance).then(() => this.displayOrderPlacedNotification());
  }
  /**
   * Inirialising money balance */
  initialiseMoneyBalance() {
    let promise = new Promise((resolve, reject) => {
      this.moneyBalanceService.setBalance();
    });
    return promise;
  }
}
