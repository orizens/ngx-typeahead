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
  const setParam = (acc: HttpParams, param: string) => acc.set(param, searchParams[param]);
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

export function resolveNextIndex(currentIndex: number, stepUp: boolean) {
  const step = stepUp ? 1 : -1;
  const topLimit = 9;
  const bottomLimit = 0;
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
