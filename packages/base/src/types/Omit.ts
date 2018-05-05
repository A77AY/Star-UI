import Diff from './Diff';

/**
 * Omit
 * Based on https://github.com/elastic/eui/blob/master/src/components/common.d.ts
 */
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

export default Omit;
