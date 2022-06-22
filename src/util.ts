export const rangeWithStep= (start:number, stop:number, step:number) => (
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
);

export const range = (n:number) => Array.from(Array(n).keys());