import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrontDisplayComponent } from './front-display.component';

describe('FrontDisplayComponent', () => {
  let component: FrontDisplayComponent;
  let fixture: ComponentFixture<FrontDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrontDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrontDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
