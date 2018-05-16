import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse, HttpEvent } from '@angular/common/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-front-display',
  templateUrl: './front-display.component.html',
  styleUrls: ['./front-display.component.css']
})
export class FrontDisplayComponent implements OnInit {
  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.setCurrentStockPrices();
  }
  /**
   * Makeing API calls to the Quandl to get the stocks data
   * Getting data for Boeing and Pfizer stocks
   * Uses https://www.quandl.com/data/EOD-End-of-Day-US-Stock-Prices
   * Storing the data in the localStorage */
  setCurrentStockPrices() {
    // set the date for today
    let today = new Date();
    let dd = today.getDate() - 1; // to get yesterdays price, becasue the latest price available is a day before
    let mm = today.getMonth() + 1; // January is 0!
    let yyyy = today.getFullYear();
    let dateString = yyyy + '-' + mm + '-' + dd;
    let apiTocken = 'Wzssee7oejgiqC3HBrCF';
    let quandlUrlBoeing = 'https://www.quandl.com/api/v3/datasets/EOD/BA.json?start_date=' + dateString + '&api_key=' + apiTocken;
    let quandlUrlPfizer = 'https://www.quandl.com/api/v3/datasets/EOD/PFE.json?start_date=' + dateString + '&api_key=' + apiTocken;
    // The Boeing Company (BA) Stock Prices
    this
      .http
      .get(quandlUrlBoeing,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
        }
      ).subscribe(data => {
      const apiData: any = data;
      localStorage.setItem('boeingPrice', JSON.stringify(apiData.dataset.data[0][4] ));
      localStorage.setItem('boeingName', JSON.stringify(apiData.dataset.name ));
    });
    // Pfizer Inc. (PFE) Stock Price
    this
      .http
      .get(quandlUrlPfizer,
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
        }
      ).subscribe(data => {
      const apiData: any = data;
      localStorage.setItem('pfizerPrice', JSON.stringify(apiData.dataset.data[0][4]) );
      localStorage.setItem('pfizerName', JSON.stringify(apiData.dataset.name ));
    });
  }
}
