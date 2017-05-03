import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';

import { NgxTypeAheadComponent } from './ngx-typeahead.component';

@NgModule({
  declarations: [ NgxTypeAheadComponent ],
  exports: [
    NgxTypeAheadComponent, CommonModule
  ],
  imports: [
    CommonModule, HttpModule, JsonpModule
  ],
  providers: [
  ]
})
export class NgxTypeaheadModule { }
