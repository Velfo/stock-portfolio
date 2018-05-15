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

  quandlCall() {
    this
      .http.get('https://www.quandl.com/api/v3/datasets/EOD/HD.json?start_date=2018-05-14&api_key=Wzssee7oejgiqC3HBrCF').subscribe(data => {

      const apiData: any = data;

      console.log(apiData.dataset.column_names[7]);
    });
  }

  setCurrentStockPrices() {
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

  getBoeingApi() {
    console.log(JSON.parse( localStorage.getItem('boeingApi')  ) );
  }
  getPfizerApi() {
    console.log(  JSON.parse(   localStorage.getItem('pfizerApi')  ) );
  }
}
