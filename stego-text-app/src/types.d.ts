export type MethodConfig = Record<
  string,
  string | number | boolean | string[] | number[]
>;

export type PdfFormat = ArrayBuffer;

export interface Method<MethodConfig = {}> {
  name: string;
  defaultCover?: string;
  defaultStego?: string;
  config: MethodConfig;
  execute: (
    source: PdfFormat,
    stego: string,
    config: MethodConfig
  ) => Promise<PdfFormat | void>;
  decode: (source: PdfFormat, config: MethodConfig) => Promise<string>;
}
