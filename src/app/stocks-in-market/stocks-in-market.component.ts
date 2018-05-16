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
  orderHasBeenPlaced: boolean;
  noEnoughMoney: boolean;
  priceTooLow: boolean;
  money: number;
  sharesBalance: Share[] = [
    { name: 'Pfizer', quantity: 0 },
    { name: 'Boeing', quantity: 0 },
  ];
  addedShare: Share;
  numberOfShares: number;
  constructor(
    private stocksInMarketService: StocksInMarketService,
    private moneyBalanceService: MoneyBalanceService
  ) { }

  ngOnInit() {
    // this.getStocksAndPriceInMarket();
    this.initialiseMoneyBalance().then(() => this.money = this.moneyBalanceService.getMoneyBalance());
    if (!JSON.parse( localStorage.getItem('shares')  )) {
      localStorage.setItem('shares', JSON.stringify(this.sharesBalance));
    }
  }

  getStocksAndPriceInMarket() {
      // this.stocksInMarketService.getStocks();
  }
  displayStocksInMarket() {
    // this.stocksInMarketService.getStocks();

  }
  displayStocks() {

    this.stockName1 = JSON.parse(   localStorage.getItem('pfizerName')  );
    this.stockName2 = JSON.parse( localStorage.getItem('boeingName')  );

    this.stockPrice2 = JSON.parse( localStorage.getItem('boeingPrice')  );
    this.stockPrice1 = JSON.parse( localStorage.getItem('pfizerPrice')  );

    // let sharesFromLocalStore: any = JSON.parse( localStorage.getItem('shares')  );
    // this.sharesBalance[0].quantity = sharesFromLocalStore[0].quantity;
    // this.sharesBalance[1].quantity = sharesFromLocalStore[1].quantity;
  }

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
  placeSellOrder(stockName: string, orderPrice: number, orderQuantity: number) {
    let moneyToReceive = orderPrice * orderQuantity;
    let moneyInBalance =  this.moneyBalanceService.getMoneyBalance();
    switch (stockName) {
      case 'Pfizer':
          this.removeFromSharesArray(stockName, orderQuantity);
          this.doMoneyTransactionSell(moneyToReceive, moneyInBalance);
        break;
      case 'Boeing':
          this.removeFromSharesArray(stockName, orderQuantity);
          this.doMoneyTransactionSell(moneyToReceive, moneyInBalance);
        break;
    }
  }
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

  displayOrderPlacedNotification() {
    this.orderHasBeenPlaced = true;
    setTimeout(() => {
      this.orderHasBeenPlaced = false;
      this.money = this.moneyBalanceService.getMoneyBalance();
    }, 1000);
  }
  displayPriceTooLowNotification() {
    this.priceTooLow = true;
    setTimeout(() => {
      this.priceTooLow = false;
    }, 1000);
  }
  displayNotEnoughtMoneyNotification() {
    this.noEnoughMoney = true;
    setTimeout(() => {
      this.noEnoughMoney = false;
    }, 1000);
  }
  setNewMoneyBalance(moneyToSpend: number, moneyInBalance: number) {
    let promise = new Promise((resolve, reject) => {
        let moneyLeft = moneyInBalance - moneyToSpend;
        this.moneyBalanceService.setMoneyBalance(moneyLeft);
        console.log('Now new balance is ', this.moneyBalanceService.getMoneyBalance());
        resolve();
    });
    return promise;
  }
  setNewMoneyBalanceSell(moneyToReceive: number, moneyInBalance: number) {
    let promise = new Promise((resolve, reject) => {
      let newMoneyBalance = moneyInBalance + moneyToReceive;
      this.moneyBalanceService.setMoneyBalance(newMoneyBalance);
      console.log('Now new balance is ', this.moneyBalanceService.getMoneyBalance());
      resolve();
    });
    return promise;
  }
  doMoneyTransaction(moneyToSpend: number, moneyInBalance: number) {
    if (moneyToSpend <= moneyInBalance) {
      this.setNewMoneyBalance(moneyToSpend, moneyInBalance).then(() => this.displayOrderPlacedNotification());
    } else {
      this.displayNotEnoughtMoneyNotification();
    }
  }

  doMoneyTransactionSell(moneyToReceive: number, moneyInBalance: number) {
      this.setNewMoneyBalanceSell(moneyToReceive, moneyInBalance).then(() => this.displayOrderPlacedNotification());
  }

  initialiseMoneyBalance() {
    let promise = new Promise((resolve, reject) => {
      this.moneyBalanceService.setBalance();
    });
    return promise;
  }
}
