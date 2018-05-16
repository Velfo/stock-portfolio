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
      .get('https://www.quandl.com/api/v3/datasets/EOD/BA.json?start_date=2018-05-15&api_key=Wzssee7oejgiqC3HBrCF',
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

    // Pfizer Inc. (PFE) Stock Prices
    this
      .http
      .get('https://www.quandl.com/api/v3/datasets/EOD/PFE.json?start_date=2018-05-15&api_key=Wzssee7oejgiqC3HBrCF',
        {
          headers: new HttpHeaders()
            .set('Content-Type', 'application/json').set('Access-Control-Allow-Origin', '*')
        }
      ).subscribe(data => {

      const apiData: any = data;

      localStorage.setItem('pfizerPrice', JSON.stringify(apiData.dataset.data[0][4]) );
      localStorage.setItem('pfizerName', JSON.stringify(apiData.dataset.name ));

      let key = 'shares';

      let userTestStatus: { id: number, name: string }[] = [
        { id: 0, name: 'Available' },
        { id: 1, name: 'Ready' },
        { id: 2, name: 'Started' }
      ];

      let myObj = { name: 'Skip', breed: 'Labrador' };

      localStorage.setItem(key, JSON.stringify(userTestStatus));

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
