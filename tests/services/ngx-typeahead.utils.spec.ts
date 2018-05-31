import { async, inject } from '@angular/core/testing';
import * as typeaheadUtils from '../../src/services/ngx-typeahead.utils';
import { Key } from '../../src/models';

describe('TypeAhead Utils', () => {
  it('should disallow arrow keys, enter, tab and shift', () => {
    const actual = typeaheadUtils.validateNonCharKeyCode(12);
    const expected = true;
    expect(actual).toBe(expected);
  });

  it('should disallow up & down arrow keys', () => {
    const actual = typeaheadUtils.validateArrowKeys(Key.Enter);
    const expected = false;
    expect(actual).toBe(expected);
  });

  it('should tell if index is active', () => {
    const actual = typeaheadUtils.isIndexActive(3, 4);
    const expected = false;
  });

  describe('Search Params Creation', () => {
    const query = 'ambient albums';
    const callbackType = 'JSONP';
    const queryParamKey = 'q';
    let actual;

    function createParams(params = {}) {
      return typeaheadUtils.createParamsForQuery(query, queryParamKey, params);
    }

    beforeEach(() => {
      actual = createParams();
    });

    it('should create a param key "q" query', () => {
      expect(actual.has('q')).toBeTruthy();
    });

    it('should create a params object for a query', () => {
      expect(actual.get('q')).toMatch(query);
    });

    it('should set custom params', () => {
      const params = { steps: 3 };
      actual = createParams(params);
      const expected = params.steps;
      expect(actual.get('steps')).toBe(expected);
    });
  });

  describe('Api Methods', () => {
    it('should validate api method and return its value', () => {
      const method = 'post';
      const actual = typeaheadUtils.resolveApiMethod(method);
      expect(actual).toMatch(method);
    });

    it('should return a "get" method if method is not valid', () => {
      const method = 'resolveAndMock';
      const actual = typeaheadUtils.resolveApiMethod(method);
      const expected = 'get';
      expect(actual).toMatch(expected);
    });

    it('should return a "get" method if no method passed', () => {
      const actual = typeaheadUtils.resolveApiMethod(undefined);
      const expected = 'get';
      expect(actual).toMatch(expected);
    });
  });

  describe('Updating Index', () => {
    it('should return 1 when next index is not the top limit', () => {
      const actual = typeaheadUtils.resolveNextIndex(2, true);
      const expected = 3;
      expect(actual).toBe(expected);
    });

    it('should return to 0 when next index is above the top limit', () => {
      const actual = typeaheadUtils.resolveNextIndex(9, true);
      const expected = 0;
      expect(actual).toBe(expected);
    });

    it('should set to the top limit when current index is in 0', () => {
      const actual = typeaheadUtils.resolveNextIndex(0, false);
      const expected = 9;
      expect(actual).toBe(expected);
    });

    it('should return to the previous index when stepping down', () => {
      const actual = typeaheadUtils.resolveNextIndex(5, false);
      const expected = 4;
      expect(actual).toBe(expected);
    });
  });

  it('should return a response second element with jsonp', () => {
    const response = [{}, 333];
    const actual = typeaheadUtils.toJsonpSingleResult(response as any);
    const expected = response[1];
    expect(actual).toBe(expected);
  });

  it('should return the list of results from a jsonp api', () => {
    const results = [['a'], ['b'], ['c']];
    const actual = typeaheadUtils.toJsonpFinalResults(results);
    const expected = results.length;
    expect(actual.length).toBe(expected);
  });

  [
    {
      title: 'should return true when a string contains characters',
      query: 'something',
      expected: true
    },
    {
      title: 'should return false when a string contains characters',
      expected: false,
      query: ''
    }
  ].forEach(({ title, expected, query }: any) => {
    it(title, () => {
      const actual = typeaheadUtils.hasCharacters(query);
      expect(actual).toBe(expected);
    });
  });

  it('should return a form value from a DOM event', () => {
    const event = { target: { value: 333 } };
    const actual = typeaheadUtils.toFormControlValue(event);
    expect(actual).toBe(event.target.value);
  });

  describe('resolveItemValue()', () => {
    it('should return item string as lowercase', () => {
      const item = 'Demo';
      const actual = typeaheadUtils.resolveItemValue(item, []);
      expect(actual).toBe(item.toLowerCase());
    });

    it('should return all item keys as one string', () => {
      const item = {
        description: 'Demo',
        title: 'tItLe'
      };
      const actual = typeaheadUtils.resolveItemValue(item, []);
      expect(actual).toBe(`${item.description}${item.title}`.toLowerCase());
    });

    it('should return only selected item keys as one string', () => {
      const item = {
        description: 'Demo'
      };
      const actual = typeaheadUtils.resolveItemValue(item, ['description']);
      expect(actual).toBe(item.description.toLowerCase());
    });

    it('should return item string as lowercase even when a field is requested', () => {
      const item = 'Demo';
      const actual = typeaheadUtils.resolveItemValue(item, ['something']);
      expect(actual).toBe(item.toLowerCase());
    });
  });
});
