export function silhouetteScore(
  data: { x: number; y: number }[],
  labels: number[]
): number {
  const dist = (a: any, b: any) =>
    Math.hypot(a.x - b.x, a.y - b.y);

  const scores = data.map((p, i) => {
    const same = data.filter((_, j) => labels[j] === labels[i] && i !== j);
    const other = data.filter((_, j) => labels[j] !== labels[i]);

    const a =
      same.reduce((s, q) => s + dist(p, q), 0) / (same.length || 1);

    const b =
      other.reduce((s, q) => s + dist(p, q), 0) / other.length;

    return (b - a) / Math.max(a, b);
  });

  return scores.reduce((a, b) => a + b, 0) / scores.length;
}
