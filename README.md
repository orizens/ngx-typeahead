[![npm version](https://badge.fury.io/js/ngx-typeahead.svg)](https://badge.fury.io/js/ngx-typeahead)
![npm](https://img.shields.io/npm/dt/ngx-typeahead.svg)
![npm](https://img.shields.io/npm/dm/ngx-typeahead.svg)

# Angular Typeahead Directive/Component (Standalone)

This is an extract of the typeahead component from the [open source](http://github.com/orizens/echoes-player) [Echoes Player](http://echoesplayer.com).

## Data Sources Support

Its built with **JSONP** support **by default**.  
Supports **HTTP** remote source with any http method (get, post etc..).
Supports static list (in array form).

## Angular Support

Now, ngx-typeahead now follows Angular versions, starting with **ngx-typeahead@6.0.0** for Angular 6.X.X.  
For **Angular 4.3/5.X** (With the new **HttpClient**)- please use version > 0.2.1  
For **Angular 2, 4** (Without **HttpClient**)- please use version 0.0.3

AOT compatible

## Angular Consulting Services

I'm a Senior Javascript Engineer & A Front End Consultant at [Orizens](http://orizens.com).
My services include:

- consulting on how to approach code in projects and keep it maintainable.
- I provide project bootstrapping and development - while afterwards, I integrate it on site and guide the team on it.

[Contact Me Here](http://orizens.com/contact)

## Installation

```
npm install ngx-typeahead --save-dev
```

## Supported API

### Inputs

| Input                | Type                       | Required                   | Description                                                                                                                                                            |
| -------------------- | -------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| taUrl                | string                     | YES                        | the url of a remote server that supports jsonp calls.                                                                                                                  |
| taParams             | { key: string, value: any} | optional, default: {}      | a {key,value} (json) object to include as params for the json call. Each api supports different structure.                                                             |
| taQueryParam         | query                      | optional, default: 'q'     | a string member which is set with the query value for search.                                                                                                          |
| taCallbackParamValue | query                      | optional, NO Default       | a string value for the callback query parameter.                                                                                                                       |
| taItemTpl            | TemplateRef                | - optional                 | a template reference to be used for each result item.                                                                                                                  |
| taApi                | string                     | optional, default: 'jsonp' | the utility to make a request with - 'jsonp', 'http'.                                                                                                                  |
| taApiMethod          | string                     | optional, default: 'get'   | the method to be used in either 'jsonp' or 'http'.                                                                                                                     |
| taList               | any[]                      | optional                   | provide a static list of items to display. This prevents any remote request and has first precedence.                                                                  |
| taListItemField      | string[]                   | optional                   | if item in static list is an object, this list of keys in the object that are checked when the list is filtered with the query. if list is empty, all keys are checked |
| taListItemLabel      | string                     | optional                   | if static list of type object - this label is used as the key for displaying the item in the suggestions list - item[label]                                            |
| taDebounce           | number                     | optional                   | set the debounce time before a request is called                                                                                                                       |
| taAllowEmpty         | boolean                    | optional, default: false   | if true, it allows empty strings to pass and invoke search                                                                                                             |
| taCaseSensitive      | boolean                    | optional, default: false   | if true, comparing query is performed with case sensitive                                                                                                              |
| taDisplayOnFocus     | boolean                    | optional, default: false   | if true, will display results (if exist) when input is clicked                                                                                                         |

### Outputs

| Output     | Type   | Required | Description                               |
| ---------- | ------ | -------- | ----------------------------------------- |
| taSelected | string | YES      | emits an event once the item is selected. |

## DEMO

[Demo with all parameters StackBlitz](https://stackblitz.com/edit/ngx-typeahead?file=src/main.ts)

## Usage

App/Component should be loaded as a standalone component:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';

bootstrapApplication(AppComponent);
```

Then, in your component, add to `imports` array:

```typescript
import { Component } from "@angular/core";
import { NgxTypeAheadComponent } from 'ngx-typeahead';

@Component({
  selector: "app",
  template: `
    <div class="search-results">
      <input
        [value]="search"
        ngxTypeahead
        [taUrl]="url"
        [taParams]="params"
        (taSelected)="handleResultSelected($event)"
      />
    </div>
  `,
  imports: [NgxTypeAheadComponent]
})
export class AppComponent {
  url = "http://suggestqueries.google.com/complete/search";
  params = {
    hl: "en",
    ds: "yt",
    xhr: "t",
    client: "youtube",
    q: query,
  };
  search = "";

  handleResultSelected(result) {
    this.search = result;
  }
}
```

## Custom Template For Item

```typescript
import { Component } from "@angular/core";
import { NgxTypeAheadComponent } from 'ngx-typeahead';

@Component({
  selector: "app",
  template: `
    <div class="search-results">
      <input
        [value]="search"
        ngxTypeahead
        [taUrl]="url"
        [taParams]="params"
        [taItemTpl]="itemTpl"
        (taSelected)="handleResultSelected($event)"
      />
      <ng-template #itemTpl let-result>
        <strong>MY {{ result.result }}</strong>
      </ng-template>
    </div>
  `,
  imports: [NgxTypeAheadComponent]
})
export class AppComponent {
  url = "http://suggestqueries.google.com/complete/search";
  params = {
    hl: "en",
    ds: "yt",
    xhr: "t",
    client: "youtube",
    q: query,
  };
  search = "";

  handleResultSelected(result) {
    this.search = result;
  }
}
```

# Showcase Examples

- [Echoes Player - Developed with Angular, angular-cli and ngrx](http://orizens.github.io/echoes-player) ([github repo for echoes player](http://github.com/orizens/echoes-player))

# NgxTypeahead

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.11.
