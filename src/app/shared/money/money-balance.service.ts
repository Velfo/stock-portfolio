import { Injectable } from '@angular/core';

@Injectable()
export class MoneyBalanceService {

  private moneyBalance = 100;
  constructor() { }

  getMoneyBalance() {
    return this.moneyBalance;
  }

  setMoneyBalance(money:number) {
    this.moneyBalance = money;
  }
}
