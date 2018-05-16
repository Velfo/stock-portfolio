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
      // setTimeout(() => {
      //   console.log('Async Work Complete');
      //   let moneyLeft = moneyInBalance - moneyToSpend;
      //   this.moneyBalanceService.setMoneyBalance(moneyLeft);
      //   console.log('Now new balance is ', this.moneyBalanceService.getMoneyBalance());
      //   resolve();
      //   // if (Error) {
      //   //   reject();
      //   // } else {
      //   //   resolve();
      //   // }
      // }, 1000);

      if ( JSON.parse( localStorage.getItem('moneyBalance')  )) {
        this.moneyBalanceService.setMoneyBalance(JSON.parse( localStorage.getItem('moneyBalance')  ));
      } else {
        this.moneyBalanceService.setMoneyBalance(100);
      }
    });
    return promise;
  }

}
