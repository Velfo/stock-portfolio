import { Component, OnInit } from '@angular/core';
import { StocksInMarketService } from '../shared/stocks/index';
import { MoneyBalanceService } from '../shared/money/index';

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
  money: number;
  constructor(
    private stocksInMarketService: StocksInMarketService,
    private moneyBalanceService: MoneyBalanceService
  ) { }

  ngOnInit() {
    // this.getStocksAndPriceInMarket();
    this.initialiseMoneyBalance().then(() => this.money = this.moneyBalanceService.getMoneyBalance());
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

    this.stockPrice1 = JSON.parse( localStorage.getItem('boeingPrice')  );
    this.stockPrice2 = JSON.parse( localStorage.getItem('pfizerPrice')  );
  }
  placeBuyOrder(stockName: string, orderPrice: number, orderQuantity: number) {
    let moneyToSpend = orderPrice * orderQuantity;
    let moneyInBalance =  this.moneyBalanceService.getMoneyBalance();
    switch (stockName) {
      case 'Pfizer':
        this.doMoneyTransaction(moneyToSpend, moneyInBalance);
        break;
      case 'Boeing':
        this.doMoneyTransaction(moneyToSpend, moneyInBalance);
        break;
    }
  }
  displayOrderPlacedNotification() {
    this.orderHasBeenPlaced = true;
    setTimeout(() => {
      this.orderHasBeenPlaced = false;
      this.money = this.moneyBalanceService.getMoneyBalance();
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
      setTimeout(() => {
        console.log('Async Work Complete');
        let moneyLeft = moneyInBalance - moneyToSpend;
        this.moneyBalanceService.setMoneyBalance(moneyLeft);
        console.log('Now new balance is ', this.moneyBalanceService.getMoneyBalance());
        resolve();
      }, 1000);
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

  initialiseMoneyBalance() {
    let promise = new Promise((resolve, reject) => {
      this.moneyBalanceService.setBalance();
    });
    return promise;
  }
}
