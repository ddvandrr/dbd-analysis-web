type ClusterLevel = "Rendah" | "Sedang" | "Tinggi";

interface DataItem {
  cluster: number;
  ir: number;
  cfr: number;
}

const CLUSTER_LABEL: Record<number, ClusterLevel> = {
  0: "Rendah",
  1: "Sedang",
  2: "Tinggi",
};

export default function ClusterProfile({ data }: { data: DataItem[] }) {
  const clusters = Object.entries(CLUSTER_LABEL).map(([key, label]) => {
    const cluster = Number(key);
    const items = data.filter(d => d.cluster === cluster);
    const count = items.length;

    const avgIR = count
      ? items.reduce((s, d) => s + d.ir, 0) / count
      : 0;

    const avgCFR = count
      ? items.reduce((s, d) => s + d.cfr, 0) / count
      : 0;

    return { cluster, label, count, avgIR, avgCFR };
  });

  return (
    <div className="card cluster-table">
      <h3 className="card-title">Profil Cluster</h3>

      <table>
        <thead>
          <tr>
            <th className="center">Cluster</th>
            <th className="center">Kategori</th>
            <th className="center">Kecamatan</th>
            <th className="right">IR</th>
            <th className="right">CFR</th>
          </tr>
        </thead>

        <tbody>
          {clusters.map(c => (
            <tr key={c.cluster}>
              <td className="center">{c.cluster}</td>
              <td className="center">
                <span className={`badge ${c.label.toLowerCase()}`}>
                  {c.label}
                </span>
              </td>
              <td className="center">{c.count}</td>
              <td className="right">{c.avgIR.toFixed(2)}</td>
              <td className="right">{c.avgCFR.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
