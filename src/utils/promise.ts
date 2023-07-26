import { isFinite } from 'lodash';

import { E_PROMISE_STATE } from '~/types';

export const getPromiseState = async (promise: Promise<any>): Promise<E_PROMISE_STATE> => {
  const target = {};

  try {
    const value = await Promise.race([promise, target]);
    return value === target
      ? E_PROMISE_STATE.Pending
      : E_PROMISE_STATE.Fulfilled;
  } catch {
    return E_PROMISE_STATE.Rejected;
  }
}

const safeDone = async (
  defer: Defer,
  cbk: (...args: any[]) => void,
  args: any[],
  timer?: NodeJS.Timeout,
) => {
  const state = await getPromiseState(defer.promise);

  if (state === E_PROMISE_STATE.Pending) {
    cbk.call(defer, ...args);
  } else {
    clearTimeout(timer);
  }
};

export class Defer<T = void> {
  private timer?: NodeJS.Timeout;

  promise!: Promise<T>;
  reslove!: (value: T | PromiseLike<T>) => void;
  reject!: (reason?: any) => void;

  constructor(ms?: number) {
    const _self = this;

    _self.promise = new Promise<T>((reslove, reject) => {
      _self.reslove = (...args) => {
        safeDone(_self as unknown as Defer, reslove, args, _self.timer);
      };
      _self.reject = (...args) => {
        safeDone(_self as unknown as Defer, reject, args, _self.timer);
      };;
    });

    if (ms && isFinite(ms)) {
      _self.timer = setTimeout(() => {
        safeDone(_self as unknown as Defer, _self.reject, [], _self.timer);
      }, ms);
    }
  }
}

export const createDefer = <T = any>(ms?: number) => new Defer<T>(ms);

/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
export const awaitTo = <T, U = Error>(
  promise: Promise<T>,
  errorExt?: object
): Promise<[U, undefined] | [null, T]> => {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((err: U) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }

      return [err, undefined];
    });
}
