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
    this.quandlCall();
  }

  quandlCall() {
    this
      .http.get('https://www.quandl.com/api/v3/datasets/EOD/HD.json?start_date=2018-05-14&api_key=Wzssee7oejgiqC3HBrCF').subscribe(data => {

      const apiData: any = data;

        console.log(apiData.dataset.column_names[7]);
    });
  }
}
