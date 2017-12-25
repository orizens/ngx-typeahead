import {
  async,
  inject
} from '@angular/core/testing';
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
      return typeaheadUtils.createParamsForQuery(query,
        queryParamKey,
        params);
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
});
