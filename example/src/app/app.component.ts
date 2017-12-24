import { Component } from '@angular/core';
import { SumService } from 'ngx-tester';

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
  constructor(private sum: SumService) {
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

  handleResult2Selected(result) {
    console.log(result);
    this.query2 = result;
  }
}
