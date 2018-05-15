import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksInMarketComponent } from './stocks-in-market.component';

describe('StocksInMarketComponent', () => {
  let component: StocksInMarketComponent;
  let fixture: ComponentFixture<StocksInMarketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksInMarketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksInMarketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
