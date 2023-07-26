import { map } from 'lodash';
import { createDefer } from './promise';

const DEFAULT_TIMEOUT = 60 * 1000;

export const asyncGetStorage = <T = any>(args?: string | string[]) => {
  const defer = createDefer<T>(DEFAULT_TIMEOUT);

  chrome
    ?.storage
    ?.local
    ?.get?.(args)
    ?.then(defer.reslove)
    ?.catch(defer.reject);

  return defer.promise;
};

export const asyncSetStorage = <T = any>(
  args: {
    [key: string]: any;
  },
) => {
  const defer = createDefer<T>(DEFAULT_TIMEOUT);

  chrome
    ?.storage
    ?.local
    ?.set?.(args)
    ?.then?.(defer.reslove)
    ?.catch?.(defer.reject);

  return defer.promise;
};

export const onStorageChangedListener = (listener: (newVal: any, oldVal: any) => void) => {
  chrome
    ?.storage
    ?.local
    ?.onChanged
    ?.addListener?.((changes: any = {}) => {
      const newVal: any = {};
      const oldVal: any = {};

      map(changes, (data: any = {}, nameKey: string) => {
        const { newValue, oldValue } = data;

        newVal[nameKey] = newValue;
        oldVal[nameKey] = oldValue;
      });

      listener?.(newVal, oldVal);
    });
};
