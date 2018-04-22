import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { NgxTypeAheadComponent } from "./ngx-typeahead.component";

@NgModule({
  declarations: [NgxTypeAheadComponent],
  exports: [NgxTypeAheadComponent, CommonModule],
  imports: [CommonModule, HttpClientModule, HttpClientJsonpModule],
  providers: []
})
export class NgxTypeaheadModule {}
