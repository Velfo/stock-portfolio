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

  setCurrentStockPrices() {
    //set the date for today
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

      console.log(apiData.dataset);
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

      console.log(apiData.dataset);
    });

  }

  getBoeingApi() {
    console.log(JSON.parse( localStorage.getItem('boeingPrice')  ) );
    console.log(JSON.parse( localStorage.getItem('boeingName')  ) );
    console.log(JSON.parse( localStorage.getItem('shares')  ) );
    const testArray: any = JSON.parse( localStorage.getItem('shares')  );
    console.log('The array is ', testArray[0]);
  }
  getPfizerApi() {
    console.log(  JSON.parse(   localStorage.getItem('pfizerPrice')  ) );
    console.log(JSON.parse( localStorage.getItem('pfizerName')[1]  ) );
  }

}
