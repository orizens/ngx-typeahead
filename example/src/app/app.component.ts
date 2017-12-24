import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  result$;
  search = 'oren';
  url = '//suggestqueries.google.com/complete/search';
  params = {
    hl: 'en',
    ds: 'yt',
    xhr: 't',
    client: 'youtube'
  };

  public query2 = '';
  public url2 = 'mocks/data.json';

  public query3 = '';
  public staticList = [
    'guitar',
    'drums',
    'bass',
    'keyboards',
    'mic',
    'trumpet',
    'horns',
    'pedals'
  ];
  constructor() {
    // this.sum.ask().subscribe(result => {
    //   this.result$ = result;
    // });
  }

  /**
   * handleResultSelected
   */
  public handleResultSelected(result) {
    this.search = result;
  }

  public handleResult2Selected(result) {
    console.log(result);
    this.query2 = result;
  }

  public handleStaticResultSelected(result) {
    console.log(result);
    this.query3 = result;
  }
}
