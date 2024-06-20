// import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { NgxTypeAheadComponent } from './ngx-typeahead.component';

// describe('NgxTypeaheadComponent', () => {
//   let component: NgxTypeAheadComponent;
//   let fixture: ComponentFixture<NgxTypeAheadComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NgxTypeAheadComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NgxTypeAheadComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });

import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  ElementRef,
  ViewContainerRef,
  // DebugElement,
} from '@angular/core';
import { NgxTypeAheadComponent } from './ngx-typeahead.component';
import { Key } from './models';
import { Subject } from 'rxjs';

describe('A Typeahead component', () => {
  let component: NgxTypeAheadComponent;
  let fixture: ComponentFixture<NgxTypeAheadComponent>;
  // let de: DebugElement;
  let spyElementRef;
  let spyViewContainerRef;
  let spyHttp;
  let spyChangeDetectorRef;

  // register all needed dependencies
  beforeEach(() => {
    // setting mocked providers
    spyElementRef = jasmine.createSpyObj('spyElementRef', ['nativeElement']);
    spyViewContainerRef = jasmine.createSpyObj('spyViewContainerRef', [
      'createEmbeddedView',
    ]);
    spyHttp = jasmine.createSpyObj('spyHttp', ['get', 'post']);
    spyChangeDetectorRef = jasmine.createSpyObj('spyChangeDetectorRef', [
      'markForCheck',
    ]);

    // setting spy on methods
    [
      'filterEnterEvent',
      'listenAndSuggest',
      'navigateWithArrows',
    ].forEach((method) =>
      spyOn(NgxTypeAheadComponent.prototype, method as any).and.callThrough()
    );
    spyOn(NgxTypeAheadComponent.prototype, 'renderTemplate');

    TestBed.configureTestingModule({
      declarations: [NgxTypeAheadComponent],
      imports: [HttpClientModule],
      providers: [
        { provide: ElementRef, useValue: spyElementRef },
        { provide: ViewContainerRef, useValue: spyViewContainerRef },
        { provide: HttpClient, useValue: spyHttp },
        { provide: ChangeDetectorRef, useValue: spyChangeDetectorRef },
      ],
    });

    fixture = TestBed.createComponent(NgxTypeAheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have an instance', () => {
    expect(component).toBeDefined();
  });

  describe('Default Inputs', () => {
    it('should have a default taQueryParam', () => {
      expect(component.taQueryParam).toBe('q');
    });

    it('should have a default undefined taCallbackParamValue', () => {
      expect(component.taCallbackParamValue).toBeUndefined();
    });

    it('should have a default taApi', () => {
      expect(component.taApi).toBe('jsonp');
    });

    it('should have a default taApiMethod', () => {
      expect(component.taApiMethod).toBe('get');
    });
  });

  describe('Component Init', () => {
    it('should create a filter enter event subscription', () => {
      expect(component.filterEnterEvent).toHaveBeenCalledTimes(1);
    });

    it('should create a listen and suggest subscription', () => {
      expect(component.listenAndSuggest).toHaveBeenCalledTimes(1);
    });

    it('should create a navigation with arrows subscription', () => {
      expect(component.navigateWithArrows).toHaveBeenCalledTimes(1);
    });

    it('should render template', () => {
      expect(component.renderTemplate).toHaveBeenCalled();
    });
  });

  describe('Functionality', () => {
    it('should hide suggestion when ESC is pressed', () => {
      const mockedEvent = {
        key: Key.Escape,
        preventDefault: () => undefined,
      } as KeyboardEvent;
      component.handleEsc(mockedEvent);
      const actual = component.showSuggestions;
      const expected = false;
      expect(actual).toBe(expected);
    });

    it('should handle non existent suggestion', () => {
      const suggestion = 'not-defined-in-list';
      component.taList = ['aa', 'ab', 'ac'];
      component.handleSelectSuggestion(suggestion);
      component.taSelected.subscribe((result) => {
        const actual = result;
        const expected = suggestion;
        expect(actual).toBe(expected);
      });
    });
  });

  describe('Requests', () => {
    [
      {
        title: 'should request with http get',
        method: 'get',
        inputs: {
          taUrl: 'mocked',
          taApi: 'http',
        },
        expected: 'get',
      },
      {
        title: 'should request with http post',
        method: 'post',
        inputs: {
          taUrl: 'mocked',
          taApi: 'http',
        },
        expected: 'post',
      },
    ].forEach(({ title, method, inputs, expected }) => {
      it(title, () => {
        const query = 'something';
        component.taUrl = inputs.taUrl;
        component.taApi = inputs.taApi;
        component.taApiMethod = method;
        component.suggest(query);
        expect(spyHttp[expected]).toHaveBeenCalled();
      });
    });

    it('should show a static list when given', () => {
      component.taList = ['aa', 'ab', 'ac'];
      const query = 'a';
      const actual = component.suggest(query);
      actual.subscribe((list) => {
        expect(list.join('')).toMatch(component.taList.join(''));
      });
    });

    it('should show a filtered static list when given', () => {
      component.taList = ['aa', 'bb', 'cc'];
      const query = 'a';
      const actual = component.suggest(query);
      actual.subscribe((list) => {
        expect(list.join('')).toMatch(component.taList[0]);
      });
    });

    it('should show an empty static list when query not exist in results', () => {
      component.taList = ['aa', 'bb', 'cc'];
      const query = 'x';
      const actual = component.suggest(query);
      actual.subscribe((list) => {
        expect(list.length).toBe(0);
      });
    });
  });

  describe('Subscriptions', () => {
    it('should unsubscribe from all subscriptions', () => {
      spyOn(component, 'handleSelectSuggestion');
      component.ngOnDestroy();
      const event = {
        key: Key.Enter,
      } as KeyboardEvent;
      component.handleEsc(event);
      expect(component.handleSelectSuggestion).not.toHaveBeenCalled();
    });

    [
      {
        title: 'should set suggestion index to start',
        index: 0,
        expected: true,
      },
      {
        title: 'should NOT set suggestion index to start',
        index: 3,
        expected: false,
      },
    ].forEach(({ title, index, expected }: any) => {
      it(title, () => {
        const demo$ = new Subject<any>();
        component.taList = [
          'guitar',
          'drums',
          'bass',
          'electric guitars',
          'keyboards',
          'mic',
        ];
        component.listenAndSuggest(demo$);
        demo$.next({ target: { value: 'testing' } });
        const actual = component.markIsActive(index, 'testing');
        expect(actual).toBe(expected);
      });
    });
  });
});
