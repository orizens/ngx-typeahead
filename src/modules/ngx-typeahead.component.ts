import { RequestOptionsArgs } from '@angular/http';
import { Jsonp, URLSearchParams } from '@angular/http';
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

/*
 using an external template:
 <input [typeaheadTpl]="itemTpl" >

  <ng-template #itemTpl let-result>
    <strong>MY {{ result.result }}</strong>
  </ng-template>
*/
@Component({
  selector: '[ngxTypeahead]',
  styles: [`
  .typeahead-backdrop {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
  }
  `],
  template: `
  <ng-template #suggestionsTplRef>
  <section class="list-group results" *ngIf="showSuggestions">
    <div class="typeahead-backdrop" (click)="hideSuggestions()"></div>
    <button type="button" class="list-group-item"
      *ngFor="let result of results; let i = index;"
      [class.active]="markIsActive(i, result)"
      (click)="handleSelectSuggestion(result)">
      <span *ngIf="!typeaheadItemTpl"><i class="fa fa-search"></i> {{ result }}</span>
      <ng-template
        [ngTemplateOutlet]="typeaheadItemTpl" 
        [ngOutletContext]="{ $implicit: {result: result, index: i} }"
      ></ng-template>
    </button>
  </section>
  </ng-template>
  `
})
export class NgxTypeAheadComponent implements OnInit, OnDestroy {
  @Input() typeaheadItemTpl: TemplateRef<any>;
  @Input() taUrl: string = '';
  @Input () taParams = {};

  @Output() typeaheadSelected = new EventEmitter<string>();

  showSuggestions = false;
  results: string[];

  @ViewChild('suggestionsTplRef') suggestionsTplRef;

  private suggestionIndex = 0;
  private subscriptions: Subscription[];
  private activeResult: string;

  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef,
    private jsonp: Jsonp,
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
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
      .filter(this.validateKeyCode)
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
      .filter((e: any) => e.keyCode === Key.ArrowDown || e.keyCode === Key.ArrowUp)
      .map((e: any) => e.keyCode)
      .subscribe((keyCode: number) => {
        const step = keyCode === Key.ArrowDown ? 1 : -1;
        const topLimit = 9;
        const bottomLimit = 0;
        this.suggestionIndex += step;
        if (this.suggestionIndex === topLimit + 1) {
          this.suggestionIndex = bottomLimit;
        }
        if (this.suggestionIndex === bottomLimit - 1) {
          this.suggestionIndex = topLimit;
        }
        this.showSuggestions = true;
        this.cdr.markForCheck();
      });
  }

  suggest(query: string) {
    const url = this.taUrl;
    const searchConfig: URLSearchParams = new URLSearchParams();
    const searchParams = this.taParams;
    const params = Object.keys(searchParams);
    params['q'] = query;
    if (params.length) {
      params.forEach((param: string) => searchConfig.set(param, searchParams[param]));
    }
    const options: RequestOptionsArgs = {
      search: searchConfig
    };
    return this.jsonp.get(url, options)
      .map((response) => response.json()[1])
      .map((results) => results.map((result: string) => result[0]));
  }

  markIsActive(index: number, result: string) {
    const isActive = index === this.suggestionIndex;
    if (isActive) {
      this.activeResult = result;
    }
    return isActive;
  }
  handleSelectSuggestion(suggestion: string) {
    this.hideSuggestions();
    this.typeaheadSelected.emit(suggestion);
  }

  validateKeyCode(event: KeyboardEvent) {
    return event.keyCode !== Key.Tab
     && event.keyCode !== Key.Shift
     && event.keyCode !== Key.ArrowLeft
     && event.keyCode !== Key.ArrowUp
     && event.keyCode !== Key.ArrowRight
     && event.keyCode !== Key.ArrowDown;
  }

  hideSuggestions() {
    this.showSuggestions = false;
  }

  hasItemTemplate() {
    return this.typeaheadItemTpl !== undefined;
  }
}
