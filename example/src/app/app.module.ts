import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { ArithmeticModule, SumService } from 'ngx-tester';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ArithmeticModule,
    NgxTypeaheadModule
  ],
  providers: [
    SumService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
