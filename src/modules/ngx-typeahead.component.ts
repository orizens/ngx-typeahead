import {
  RequestOptionsArgs,
  Response,
  Jsonp,
  URLSearchParams,
  Http
} from '@angular/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/concat';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/fromEvent';

import { Key } from '../models';
import {
  validateNonCharKeyCode,
  isIndexActive,
  createParamsForQuery,
  resolveApiMethod,
  validateArrowKeys,
  resolveNextIndex
} from '../services/ngx-typeahead.utils';
/*
 using an external template:
 <input [taItemTpl]="itemTpl" >

  <ng-template #itemTpl let-result>
    <strong>MY {{ result.result }}</strong>
  </ng-template>
*/
@Component({
  selector: '[ngxTypeahead]',
  styles: [
    `
  .typeahead-backdrop {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
  `
  ],
  template: `
  <ng-template #suggestionsTplRef>
  <section class="list-group results" *ngIf="showSuggestions">
    <div class="typeahead-backdrop" (click)="hideSuggestions()"></div>
    <button type="button" class="list-group-item"
      *ngFor="let result of results; let i = index;"
      [class.active]="markIsActive(i, result)"
      (click)="handleSelectSuggestion(result)">
      <span *ngIf="!taItemTpl"><i class="fa fa-search"></i> {{ result }}</span>
      <ng-template
        [ngTemplateOutlet]="taItemTpl"
        [ngTemplateOutletContext]="{ $implicit: {result: result, index: i} }"
      ></ng-template>
    </button>
  </section>
  </ng-template>
  `
})
export class NgxTypeAheadComponent implements OnInit, OnDestroy {
  showSuggestions = false;
  results: string[];

  @Input() taItemTpl: TemplateRef<any>;
  @Input() taUrl = '';
  @Input() taParams = {};
  @Input() taQueryParam = 'q';
  @Input() taCallbackParamValue = 'JSONP_CALLBACK';
  @Input() taApi = 'jsonp';
  @Input() taApiMethod = 'get';
  @Input() taResponseTransform;

  @Output() taSelected = new EventEmitter<string>();

  @ViewChild('suggestionsTplRef') suggestionsTplRef;

  private suggestionIndex = 0;
  private subscriptions: Subscription[];
  private activeResult: string;

  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef,
    private jsonp: Jsonp,
    private http: Http,
    private cdr: ChangeDetectorRef
  ) { }

  @HostListener('keydown', ['$event'])
  handleEsc(event: KeyboardEvent) {
    if (event.keyCode === Key.Escape) {
      this.hideSuggestions();
      event.preventDefault();
    }
  }

  ngOnInit() {
    const onkeyDown$ = this.onElementKeyDown();
    this.subscriptions = [
      this.filterEnterEvent(onkeyDown$),
      this.listenAndSuggest(),
      this.navigateWithArrows(onkeyDown$)
    ];
    this.renderTemplate();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions.length = 0;
  }

  renderTemplate() {
    this.viewContainer.createEmbeddedView(this.suggestionsTplRef);
    this.cdr.markForCheck();
  }

  onElementKeyDown() {
    return Observable.fromEvent(this.element.nativeElement, 'keydown').share();
  }

  filterEnterEvent(elementObs: Observable<{}>) {
    return elementObs
      .filter((e: KeyboardEvent) => e.keyCode === Key.Enter)
      .subscribe((event: Event) => {
        event.preventDefault();
        this.handleSelectSuggestion(this.activeResult);
      });
  }

  listenAndSuggest() {
    return Observable.fromEvent(this.element.nativeElement, 'keyup')
      .filter((e: any) => validateNonCharKeyCode(e.keyCode))
      .map((e: any) => e.target.value)
      .debounceTime(300)
      .concat()
      .distinctUntilChanged()
      .filter((query: string) => query.length > 0)
      .switchMap((query: string) => this.suggest(query))
      .subscribe((results: string[]) => {
        this.results = results;
        this.showSuggestions = true;
        this.suggestionIndex = 0;
        this.cdr.markForCheck();
      });
  }

  navigateWithArrows(elementObs: Observable<{}>) {
    return elementObs
      .filter((e: any) => validateArrowKeys(e.keyCode))
      .map((e: any) => e.keyCode)
      .subscribe((keyCode: number) => {
        this.suggestionIndex = resolveNextIndex(
          this.suggestionIndex,
          keyCode === Key.ArrowDown
        );
        this.showSuggestions = true;
        this.cdr.markForCheck();
      });
  }

  suggest(query: string) {
    const url = this.taUrl;
    const searchConfig = createParamsForQuery(
      query,
      this.taCallbackParamValue,
      this.taQueryParam,
      this.taParams
    );
    const options: RequestOptionsArgs = {
      search: searchConfig
    };
    const apiMethod = resolveApiMethod(this.taApiMethod);
    const isJsonpApi = this.taApi === 'jsonp';
    const responseTransformMethod = this.taResponseTransform || (item => item);
    return isJsonpApi
      ? this.jsonp
      [apiMethod](url, options)
        .map((response: Response) => response.json()[1])
        .map(results => results.map((result: string) => result[0]))
      : this.http
      [apiMethod](url, options)
        .map((response: Response) => response.json())
        .map((results: any[]) => results.map(responseTransformMethod));
  }

  markIsActive(index: number, result: string) {
    const isActive = isIndexActive(index, this.suggestionIndex);
    if (isActive) {
      this.activeResult = result;
    }
    return isActive;
  }

  handleSelectSuggestion(suggestion: string) {
    this.hideSuggestions();
    this.taSelected.emit(suggestion);
  }

  hideSuggestions() {
    this.showSuggestions = false;
  }

  hasItemTemplate() {
    return this.taItemTpl !== undefined;
  }
}
