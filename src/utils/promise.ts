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
    this.promise = new Promise<T>((reslove, reject) => {
      this.reslove = (...args) => {
        safeDone(this as unknown as Defer, reslove, args, this.timer);
      };
      this.reject = (...args) => {
        safeDone(this as unknown as Defer, reject, args, this.timer);
      };
    });

    if (ms && isFinite(ms)) {
      this.timer = setTimeout(() => {
        safeDone(this as unknown as Defer, this.reject, [], this.timer);
      }, ms);
    }
  }
}

export const createDefer = <T = any>(ms?: number) => new Defer<T>(ms);

/**
 * @param { Promise } promise
 * @return { Promise }
 */
export const to = async <U = Error, T = any>(
  promise: Promise<T>,
): Promise<[U, undefined] | [null, T]> => {
  try {
    const data = await promise;
    const result: [null, T] = [null, data];
    return result;
  } catch (err) {
    return [err as U, undefined];
  }
}
