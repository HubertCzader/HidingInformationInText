export type MethodConfig = Record<
  string,
  string | number | boolean | string[] | number[]
>;

export interface Method<MethodConfig = {}> {
  name: string;
  defaultCover?: string;
  defaultStego?: string;
  config: MethodConfig;
  execute: (
    cover: string,
    stego: string,
    config: MethodConfig
  ) => Promise<void>;
}
