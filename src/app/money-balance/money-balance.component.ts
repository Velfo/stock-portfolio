import { Component, OnInit } from '@angular/core';
import { MoneyBalanceService } from '../shared/money/index';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-money-balance',
  templateUrl: './money-balance.component.html',
  styleUrls: ['./money-balance.component.css']
})
export class MoneyBalanceComponent implements OnInit {

  filter: Observable<number>;
  money: number;

  constructor(
    private moneyBalanceService: MoneyBalanceService
  ) { }

  ngOnInit() {

    // this.initialiseMoneyBalance().then(() => this.money = this.moneyBalanceService.getMoneyBalance());
    // this.initialiseMoneyBalance();
    // this.money = this.moneyBalanceService.getMoneyBalance();
  }

  initialiseMoneyBalance() {
    let promise = new Promise((resolve, reject) => {
      if ( JSON.parse( localStorage.getItem('moneyBalance')  )) {
        this.moneyBalanceService.setMoneyBalance(JSON.parse( localStorage.getItem('moneyBalance')  ));
      } else {
        this.moneyBalanceService.setMoneyBalance(100);
      }
    });
    return promise;
  }

}
