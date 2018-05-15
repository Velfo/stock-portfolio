import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyBalanceService } from './shared/money/index';


import { AppComponent } from './app.component';
import { FrontDisplayComponent } from './front-display/front-display.component';
import { MoneyBalanceComponent } from './money-balance/money-balance.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontDisplayComponent,
    MoneyBalanceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    MoneyBalanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
