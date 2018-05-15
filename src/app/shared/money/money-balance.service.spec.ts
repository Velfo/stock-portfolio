import { TestBed, inject } from '@angular/core/testing';

import { MoneyBalanceService } from './money-balance.service';

describe('MoneyBalanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MoneyBalanceService]
    });
  });

  it('should be created', inject([MoneyBalanceService], (service: MoneyBalanceService) => {
    expect(service).toBeTruthy();
  }));
});
