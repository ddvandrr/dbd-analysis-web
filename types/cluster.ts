export type Cluster = 0 | 1 | 2;

export const CLUSTER_LABEL: Record<Cluster, string> = {
  0: "Rendah",
  1: "Sedang",
  2: "Tinggi",
};

export const CLUSTER_COLOR: Record<Cluster, string> = {
  0: "#22c55e",
  1: "#facc15",
  2: "#ef4444",
};
