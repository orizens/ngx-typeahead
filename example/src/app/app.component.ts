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

  public queryEmpty = '';
  public allowEmpty = true;
  public query2 = '';
  public url2 = 'mocks/data.json';

  public query3 = '';
  public staticList = [
    'guitar',
    'drums',
    'bass',
    'electric guitars',
    'keyboards',
    'mic',
    'bass guitars',
    'trumpet',
    'horns',
    'guitar workshops',
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
  public handleJsonpResult(result) {
    this.search = result;
  }

  public handleJsonpResultWithEmpty(result) {
    this.queryEmpty = result;
  }

  public handleHttpResult(result) {
    console.log(result);
    this.query2 = result;
  }

  public handleStaticResultSelected(result) {
    console.log(result);
    this.query3 = result;
  }
}
