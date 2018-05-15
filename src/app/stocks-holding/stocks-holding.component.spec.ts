import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksHoldingComponent } from './stocks-holding.component';

describe('StocksHoldingComponent', () => {
  let component: StocksHoldingComponent;
  let fixture: ComponentFixture<StocksHoldingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksHoldingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksHoldingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
