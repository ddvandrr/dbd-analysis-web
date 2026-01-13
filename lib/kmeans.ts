type Point = { x: number; y: number };

export function kMeans(data: Point[], k: number, iter = 100) {
  let centroids = data.slice(0, k);
  let clusters = new Array(data.length).fill(0);

  for (let t = 0; t < iter; t++) {
    clusters = data.map(p => {
      let minDist = Infinity;
      let idx = 0;

      centroids.forEach((c, i) => {
        const d = Math.hypot(p.x - c.x, p.y - c.y);
        if (d < minDist) {
          minDist = d;
          idx = i;
        }
      });
      return idx;
    });

    centroids = centroids.map((_, i) => {
      const pts = data.filter((_, j) => clusters[j] === i);
      if (!pts.length) return centroids[i];

      return {
        x: pts.reduce((s, p) => s + p.x, 0) / pts.length,
        y: pts.reduce((s, p) => s + p.y, 0) / pts.length,
      };
    });
  }

  return clusters;
}
