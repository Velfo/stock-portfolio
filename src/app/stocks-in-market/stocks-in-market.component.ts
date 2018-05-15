import { Component, OnInit } from '@angular/core';
import { StocksInMarketService } from '../shared/stocks/index';

@Component({
  selector: 'app-stocks-in-market',
  templateUrl: './stocks-in-market.component.html',
  styleUrls: ['./stocks-in-market.component.css']
})
export class StocksInMarketComponent implements OnInit {

  constructor(
    private stocksInMarketService: StocksInMarketService
  ) { }

  ngOnInit() {
  }

}
