import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MoneyBalanceService } from './shared/money/index';
import { StocksHoldingService } from './shared/stocks/index';
import { StocksInMarketService } from './shared/stocks/index';


import { AppComponent } from './app.component';
import { FrontDisplayComponent } from './front-display/front-display.component';
import { MoneyBalanceComponent } from './money-balance/money-balance.component';
import { StocksInMarketComponent } from './stocks-in-market/stocks-in-market.component';
import { StocksHoldingComponent } from './stocks-holding/stocks-holding.component';


@NgModule({
  declarations: [
    AppComponent,
    FrontDisplayComponent,
    MoneyBalanceComponent,
    StocksInMarketComponent,
    StocksHoldingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    MoneyBalanceService,
    StocksHoldingService,
    StocksInMarketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
