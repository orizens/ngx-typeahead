[![Build Status](https://travis-ci.org/orizens/ngx-typeahead.svg?branch=master)](https://travis-ci.org/orizens/ngx-typeahead)
[![npm version](https://badge.fury.io/js/ngx-typeahead.svg)](https://badge.fury.io/js/ngx-typeahead)
![npm](https://img.shields.io/npm/dt/ngx-typeahead.svg)
![npm](https://img.shields.io/npm/dm/ngx-typeahead.svg)

# Angular Typeahead Component

This is an extract of the typeahead component from the [open source](http://github.com/orizens/echoes-player) [Echoes Player](http://echoesplayer.com).

## Data Sources Support

Its built with **JSONP** support **by default**.  
Supports **HTTP** remote source with any http method (get, post etc..).
Supports static list (in array form).

## Angular Support

For **Angular 4.3** (With the new **HttpClient**)- please use version 0.4  
For **Angular 2, 4** (Without **HttpClient**)- please use version 0.3

AOT compatible

## Angular Consulting Services

I'm a Senior Javascript Engineer & A Front End Consultant at [Orizens](http://orizens.com).
My services include:

* consulting on how to approach code in projects and keep it maintainable.
* I provide project bootstrapping and development - while afterwards, I integrate it on site and guide the team on it.

[Contact Me Here](http://orizens.com/contact)

## Installation

```
npm install ngx-typeahead --save-dev
```

## Supported API

### Inputs

* **taUrl**<_string_> - (**required**) - the url of a remote server that supports jsonp calls.
* **taParams**<_{ key: string, value: any}_> - (optional, default: **{}**) - a {key,value} (json) object to include as params for the json call. Each api supports different structure.
* **taQueryParam**<_query_> - (optional, default: 'q') - a string member which is set with the query value for search.
* **taCallbackParamValue**<_query_> - (optional, NO Default) - a string value for the callback query parameter.
* **taItemTpl**<_TemplateRef_> - (optional) - a template reference to be used for each result item.
* **taApi**<_string_> - (optional, default: 'jsonp') - the utility to make a request with - 'jsonp', 'http'.
* **taApiMethod**<_string_> - (optional, default: 'get') - the method to be used in either 'jsonp' or 'http'.
* **taResponseTransform**<_Function_> - (optional) - a transformation function which is applied to an http request's "results" array (expected).
* **taList**<_any[]_> - (optional) - provide a static list of items to display. This prevents any remote request and has first precedence.

### Outputs

* **taSelected**<_string_> - (**required**) - emits an event once the item is selected.

## DEMO

[Demo with all parameters](http://plnkr.co/edit/gV6kMSRlogjBKnh3JHU3?p=preview)

## Usage

First, import the **NgxTypeaheadModule** to your module:

```typescript
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NgxTypeaheadModule } from "ngx-typeahead";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppComponent } from "./app";

@NgModule({
  imports: [BrowserModule, NgxTypeaheadModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
```

Then, in app component:

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app",
  template: `
    <div class="search-results">
      <input [value]="search"
        ngxTypeahead
        [taUrl]="url"
        [taParams]="params"
        (taSelected)="handleResultSelected($event)"
      >
    </div>
  `
})
export class AppComponent {
  public url = "http://suggestqueries.google.com/complete/search";
  public params = {
    hl: "en",
    ds: "yt",
    xhr: "t",
    client: "youtube",
    q: query
  };
  public search = "";

  handleResultSelected(result) {
    this.search = result;
  }
}
```

## Custom Template For Item

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app",
  template: `
    <div class="search-results">
      <input [value]="search"
        ngxTypeahead
        [taUrl]="url"
        [taParams]="params"
        [taItemTpl]="itemTpl"
        (taSelected)="handleResultSelected($event)"
      >
      <ng-template #itemTpl let-result>
        <strong>MY {{ result.result }}</strong>
      </ng-template>
    </div>
  `
})
export class AppComponent {
  public url = "http://suggestqueries.google.com/complete/search";
  public params = {
    hl: "en",
    ds: "yt",
    xhr: "t",
    client: "youtube",
    q: query
  };
  public search = "";

  handleResultSelected(result) {
    this.search = result;
  }
}
```

# Showcase Examples

* [Echoes Player - Developed with Angular, angular-cli and ngrx](http://orizens.github.io/echoes-player) ([github repo for echoes player](http://github.com/orizens/echoes-player))
