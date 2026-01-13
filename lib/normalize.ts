export function minMaxNormalize(
  data: number[]
): number[] {
  const min = Math.min(...data);
  const max = Math.max(...data);

  return data.map(v =>
    max === min ? 0 : (v - min) / (max - min)
  );
}
