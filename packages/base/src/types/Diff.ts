/**
 * Difference
 * Based on https://github.com/elastic/eui/blob/master/src/components/common.d.ts
 */
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];

export default Diff;
