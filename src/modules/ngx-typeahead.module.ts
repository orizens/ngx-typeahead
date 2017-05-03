import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxTypeAheadComponent } from './ngx-typeahead.component';

@NgModule({
  declarations: [NgxTypeAheadComponent],
  exports: [NgxTypeAheadComponent, CommonModule],
  imports: [
    CommonModule
  ],
  providers: [
  ]
})
export class NgxTypeaheadModule { }
