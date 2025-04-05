export interface Path {
  isOpaque: boolean;

  segment(): Iterable<string>;

  // opaqueなパスで構文解析する場合など用
  toString(): string;
}
