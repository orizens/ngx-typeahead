import { HttpClient } from "@angular/common/http";
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
} from "@angular/core";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { of } from "rxjs/observable/of";
import {
  concat,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  takeUntil
} from "rxjs/operators";
import { Key } from "../models";
import {
  createParamsForQuery,
  hasCharacters,
  isEnterKey,
  isEscapeKey,
  isIndexActive,
  resolveApiMethod,
  resolveNextIndex,
  toFormControlValue,
  toJsonpFinalResults,
  toJsonpSingleResult,
  validateArrowKeys,
  validateNonCharKeyCode
} from "../services/ngx-typeahead.utils";

/*
 using an external template:
 <input [taItemTpl]="itemTpl" >

  <ng-template #itemTpl let-result>
    <strong>MY {{ result.result }}</strong>
  </ng-template>
*/
@Component({
  selector: "[ngxTypeahead]",
  styles: [
    `
  .ta-results {
    position: absolute;
  }
  .ta-backdrop {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .ta-item {
    position: relative;
    z-index: 2;
    display: block;
  }
  `
  ],
  template: `
  <ng-template #suggestionsTplRef>
  <section class="ta-results list-group" *ngIf="showSuggestions">
    <div class="ta-backdrop" (click)="hideSuggestions()"></div>
    <button type="button" class="ta-item list-group-item"
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
  @Input() taUrl = "";
  @Input() taParams = {};
  @Input() taQueryParam = "q";
  @Input() taCallbackParamValue;
  @Input() taApi = "jsonp";
  @Input() taApiMethod = "get";
  @Input() taList = [];
  @Input() taDebounce = 300;

  @Output() taSelected = new EventEmitter<string>();

  @ViewChild("suggestionsTplRef") suggestionsTplRef: TemplateRef<any>;

  private suggestionIndex = 0;
  private subscriptions: Subscription[];
  private activeResult: string;
  private keydown$ = new Subject<KeyboardEvent>();
  private keyup$ = new Subject<KeyboardEvent>();

  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener("keydown", ["$event"])
  handleEsc(event: KeyboardEvent) {
    if (isEscapeKey(event)) {
      this.hideSuggestions();
      event.preventDefault();
    }
    this.keydown$.next(event);
  }

  @HostListener("keyup", ["$event"])
  onkeyup(event: KeyboardEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.keyup$.next(event);
  }

  ngOnInit() {
    this.filterEnterEvent(this.keydown$);
    this.listenAndSuggest(this.keyup$);
    this.navigateWithArrows(this.keydown$);
    this.renderTemplate();
  }

  ngOnDestroy() {
    this.keydown$.complete();
    this.keyup$.complete();
  }

  renderTemplate() {
    this.viewContainer.createEmbeddedView(this.suggestionsTplRef);
    this.cdr.markForCheck();
  }

  listenAndSuggest(obs: Subject<KeyboardEvent>) {
    return obs
      .pipe(
        filter((e: KeyboardEvent) => validateNonCharKeyCode(e.keyCode)),
        map(toFormControlValue),
        debounceTime(this.taDebounce),
        concat(),
        distinctUntilChanged(),
        filter(hasCharacters),
        switchMap((query: string) => this.suggest(query))
      )
      .subscribe((results: string[]) => {
        this.results = results;
        this.displaySuggestions(Key.ArrowDown);
      });
  }

  filterEnterEvent(elementObs: Subject<KeyboardEvent>) {
    return elementObs
      .pipe(filter(isEnterKey))
      .subscribe((event: KeyboardEvent) => {
        this.handleSelectSuggestion(this.activeResult);
      });
  }

  navigateWithArrows(elementObs: Subject<KeyboardEvent>) {
    return elementObs
      .pipe(
        filter((e: any) => validateArrowKeys(e.keyCode)),
        map((e: any) => e.keyCode)
      )
      .subscribe((keyCode: number) => this.displaySuggestions(keyCode));
  }

  displaySuggestions(keyCode: number) {
    this.suggestionIndex = resolveNextIndex(
      this.suggestionIndex,
      keyCode === Key.ArrowDown,
      this.results.length
    );
    this.showSuggestions = true;
    this.cdr.markForCheck();
  }

  suggest(query: string) {
    return this.taList.length
      ? this.createListSource(this.taList, query)
      : this.request(query);
  }

  /**
   * peforms a jsonp/http request to search with query and params
   * @param query the query to search from the remote source
   */
  request(query: string) {
    const url = this.taUrl;
    const searchConfig = createParamsForQuery(
      query,
      this.taQueryParam,
      this.taParams
    );
    const options = {
      params: searchConfig
    };
    const isJsonpApi = this.taApi === "jsonp";
    return isJsonpApi
      ? this.requestJsonp(url, options, this.taCallbackParamValue)
      : this.requestHttp(url, options);
  }

  requestHttp(url: string, options) {
    const apiMethod = resolveApiMethod(this.taApiMethod);
    return this.http[apiMethod](url, options);
  }

  requestJsonp(url, options, callback = "callback") {
    const params = options.params.toString();
    return this.http
      .jsonp(`${url}?${params}`, callback)
      .pipe(map(toJsonpSingleResult), map(toJsonpFinalResults));
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

  createListSource(list: any[], query: string): Observable<string[]> {
    return of(list.filter((item: string) => item.includes(query)));
  }
}
