import { Component, OnInit } from '@angular/core';
import { MoneyBalanceService } from '../shared/money/index';

@Component({
  selector: 'app-money-balance',
  templateUrl: './money-balance.component.html',
  styleUrls: ['./money-balance.component.css']
})
export class MoneyBalanceComponent implements OnInit {

  money: number;

  constructor(
    private moneyBalanceService: MoneyBalanceService
  ) { }

  ngOnInit() {
    this.money = this.moneyBalanceService.getMoneyBalance();
  }

}
