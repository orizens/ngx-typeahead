import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { NgxTypeAheadComponent } from './ngx-typeahead.component';



@NgModule({
  declarations: [NgxTypeAheadComponent],
  imports: [CommonModule, HttpClientModule, HttpClientJsonpModule],
  exports: [NgxTypeAheadComponent, CommonModule]
})
export class NgxTypeaheadModule { }
