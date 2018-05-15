import { Component, OnInit } from '@angular/core';
import { StocksHoldingService } from '../shared/stocks/index';


@Component({
  selector: 'app-stocks-holding',
  templateUrl: './stocks-holding.component.html',
  styleUrls: ['./stocks-holding.component.css']
})
export class StocksHoldingComponent implements OnInit {

  constructor(
    private stocksHoldingService: StocksHoldingService
  ) { }

  ngOnInit() {
  }

  displayStocks(){

  }
}
