import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

import { NgxTypeAheadComponent } from './ngx-typeahead.component';

@NgModule({
  declarations: [NgxTypeAheadComponent],
  exports: [NgxTypeAheadComponent, CommonModule],
  imports: [CommonModule, HttpClientModule, HttpClientJsonpModule],
  providers: []
})
export class NgxTypeaheadModule { }
