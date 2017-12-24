import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxTypeaheadModule } from 'ngx-typeahead';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxTypeaheadModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
