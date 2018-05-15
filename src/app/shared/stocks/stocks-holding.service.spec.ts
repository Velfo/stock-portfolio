import { TestBed, inject } from '@angular/core/testing';

import { StocksHoldingService } from './stocks-holding.service';

describe('StocksHoldingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksHoldingService]
    });
  });

  it('should be created', inject([StocksHoldingService], (service: StocksHoldingService) => {
    expect(service).toBeTruthy();
  }));
});
