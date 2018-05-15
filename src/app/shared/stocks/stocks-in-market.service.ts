import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class StocksInMarketService {

  constructor(
    private http: HttpClient
  ) { }
  getStocks() {
    // The Boeing Company (BA) Stock Prices
    this
      .http
      .get('https://www.quandl.com/api/v3/datasets/EOD/BA.json?start_date=2018-05-14&api_key=Wzssee7oejgiqC3HBrCF',
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
        }
      ).subscribe(data => {

      const apiData: any = data;

      localStorage.setItem('boeingApi', JSON.stringify(apiData.dataset.data[0][4] ));

      console.log(apiData.dataset.data[0][4]);
    });

    // Pfizer Inc. (PFE) Stock Prices
    this
      .http
      .get('https://www.quandl.com/api/v3/datasets/EOD/PFE.json?start_date=2018-05-14&api_key=Wzssee7oejgiqC3HBrCF',
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
        }
      ).subscribe(data => {

      const apiData: any = data;

      localStorage.setItem('pfizerApi', JSON.stringify(apiData.dataset.data[0][4]) );

      console.log(apiData.dataset.data[0][4]);
    });
  }

}
