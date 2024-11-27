export interface IDefaultObjectType extends Object {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// eslint-disable-next-line @typescript-eslint/ban-types
export type XOR<T, U> = T | U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type LogoProps = {
  width: string;
  height: string;
};

export type svgIconProps = {
  width: number;
  height: number;
  fill: string;
};
