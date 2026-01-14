export default function RiskRanking({ data }: { data: any[] }) {
  const sorted = [...data]
    .sort((a, b) => b.ir + b.cfr - (a.ir + a.cfr))
    .slice(0, 5);

  const maxScore = Math.max(...sorted.map(d => d.ir + d.cfr));

  return (
    <div className="card risk-ranking">
      <h3>Ranking Risiko</h3>

      {sorted.map(d => {
        const score = d.ir + d.cfr;
        const width = (score / maxScore) * 100;

        return (
          <div key={d.kode_kecamatan} className="risk-row">
            <div className="risk-label">
              <span>{d.nama_kecamatan}</span>
              <small>IR {d.ir} | CFR {d.cfr}</small>
            </div>
            <div className="risk-bar-bg">
              <div
                className="risk-bar"
                style={{ width: `${width}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
