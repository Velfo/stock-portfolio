import { Injectable } from '@angular/core';

@Injectable()
export class MoneyBalanceService {

  private moneyBalance = 100;
  constructor() { }

  getMoneyBalance() {
    return this.moneyBalance;
  }

  setMoneyBalance(money: number) {
    this.moneyBalance = money;
    localStorage.setItem('moneyBalance', JSON.stringify(money));
  }
  setBalance() {
    if ( JSON.parse( localStorage.getItem('moneyBalance')  )) {
      this.moneyBalance = JSON.parse( localStorage.getItem('moneyBalance')  );
    } else {
      this.moneyBalance = 10000;
    }
  }
}
