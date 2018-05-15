import { Component, OnInit } from '@angular/core';
import { StocksInMarketService } from '../shared/stocks/index';

@Component({
  selector: 'app-stocks-in-market',
  templateUrl: './stocks-in-market.component.html',
  styleUrls: ['./stocks-in-market.component.css']
})
export class StocksInMarketComponent implements OnInit {

  stocks: Object[];
  stockName1: string;
  stockName2: string;
  stockPrice1: number;
  stockPrice2: number;
  orderPrice1: number;
  orderQuantity1: number;
  orderPrice2: number;
  orderQuantity2: number;
  orderHasBeenPlaced: boolean;
  constructor(
    private stocksInMarketService: StocksInMarketService
  ) { }

  ngOnInit() {
    // this.getStocksAndPriceInMarket();
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
  placeBuyOrder(stockName: string, orderPrice: number, orderQuantity: number){
    switch (stockName) {
      case 'Pfizer':
        console.log('This is Pfizer');
        console.log('Order price ',  orderPrice);
        console.log('Order quantity ',  orderQuantity);
        this.displayOrderPlacedNotification()
        break;
      case 'Boeing':
        console.log('This is Boeing');
        console.log('Order price ',  orderPrice);
        console.log('Order quantity ',  orderQuantity);
        this.displayOrderPlacedNotification()
        break;
    }
  }
  displayOrderPlacedNotification() {
    this.orderHasBeenPlaced = true;
    setTimeout(() => {
      this.orderHasBeenPlaced = false;
    }, 1000);
  }
}
