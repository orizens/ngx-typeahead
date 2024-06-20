import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { NgxTypeAheadComponent } from 'ngx-typeahead';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgxTypeAheadComponent, JsonPipe],
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

  queryEmpty = '';
  allowEmpty = true;
  query2 = '';
  url2 = 'mocks/data.json';

  query3 = '';
  query4 = '';
  staticList = [
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

  staticListItems = [
    { label: 'guitar', value: 'guitar-222' },
    { label: 'drums', value: 'drums-222' },
    { label: 'bass', value: 'bass-222' },
    { label: 'electric guitars', value: 'electric-222' },
    { label: 'keyboards', value: 'keyboards-222' },
    { label: 'mic', value: 'mic-222' },
    { label: 'bass guitars', value: 'bass-222' },
    { label: 'trumpet', value: 'trumpet-222' },
    { label: 'horns', value: 'horns-222' },
    { label: 'guitar workshops', value: 'guitar-222' },
    { label: 'pedals', value: 'pedals-222' }
  ];

  constructor() {
    // this.sum.ask().subscribe(result => {
    //   this.result$ = result;
    // });
  }

  /**
   * handleResultSelected
   */
  handleJsonpResult(result) {
    this.search = result;
  }

  handleJsonpResultWithEmpty(result) {
    this.queryEmpty = result;
  }

  handleHttpResult(result) {
    console.log(result);
    this.query2 = result;
  }

  handleStaticResultSelected(result) {
    console.log(result);
    this.query3 = result;
  }

  handleStaticItemsResultSelected(result) {
    console.log(result);
    this.query4 = result;
  }
}
