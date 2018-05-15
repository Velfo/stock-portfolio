import { TestBed, inject } from '@angular/core/testing';

import { StocksInMarketService } from './stocks-in-market.service';

describe('StocksInMarketService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocksInMarketService]
    });
  });

  it('should be created', inject([StocksInMarketService], (service: StocksInMarketService) => {
    expect(service).toBeTruthy();
  }));
});
