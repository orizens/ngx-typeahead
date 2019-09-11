import { HttpParams } from '@angular/common/http';
import { Key } from '../models';

export function validateNonCharKeyCode(keyCode: number) {
  return [
    Key.Enter,
    Key.Tab,
    Key.Shift,
    Key.ArrowLeft,
    Key.ArrowUp,
    Key.ArrowRight,
    Key.ArrowDown,
    Key.MacCommandLeft,
    Key.MacCommandRight,
    Key.MacCommandFirefox
  ].every(codeKey => codeKey !== keyCode);
}

export function validateArrowKeys(keyCode: number) {
  return keyCode === Key.ArrowDown || keyCode === Key.ArrowUp;
}

export function isIndexActive(index: number, currentIndex: number) {
  return index === currentIndex;
}

export function isEnterKey(event: KeyboardEvent) {
  return event.keyCode === Key.Enter;
}

export function isEscapeKey(event: KeyboardEvent) {
  return event.keyCode === Key.Escape;
}

export function createParamsForQuery(
  query: string,
  queryParamKey = 'q',
  customParams = {}
) {
  const searchParams = {
    [queryParamKey]: query,
    ...customParams
  };
  // tslint:disable-next-line
  const setParam = (acc: HttpParams, param: string) =>
    acc.set(param, searchParams[param]);
  const params = Object.keys(searchParams).reduce(setParam, new HttpParams());
  return params;
}

export function resolveApiMethod(method = '') {
  const isMethodValid = [
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'request'
  ].some(methodName => method === methodName);
  const apiMethod = isMethodValid ? method : 'get';
  return apiMethod;
}
export const NO_INDEX = -1;
export function resolveNextIndex(
  currentIndex: number,
  stepUp: boolean,
  listLength = 10
) {
  const step = stepUp ? 1 : -1;
  const topLimit = listLength - 1;
  const bottomLimit = NO_INDEX;
  const currentResultIndex = currentIndex + step;
  let resultIndex = currentResultIndex;
  if (currentResultIndex === topLimit + 1) {
    resultIndex = bottomLimit;
  }
  if (currentResultIndex === bottomLimit - 1) {
    resultIndex = topLimit;
  }
  return resultIndex;
}

export function toJsonpSingleResult(response: any) {
  return response[1];
}

export function toJsonpFinalResults(results: any[]) {
  return results.map((result: any) => result[0]);
}

export function hasCharacters(query: string) {
  return query.length > 0;
}

export function toFormControlValue(e: any) {
  return e.target.value;
}

export function resolveItemValue(item: string | any, fieldsToExtract: string[], caseSensitive = false) {
  let newItem;
  if (!item.hasOwnProperty('length')) {
    const fields = !fieldsToExtract.length ? Object.keys(item) : fieldsToExtract;
    newItem = fields.map(key => `${item[key]}`);
  } else {
    newItem = [item];
  }
  return caseSensitive ? newItem : newItem.map( value => value.toLowerCase() );
}
