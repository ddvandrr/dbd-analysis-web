"use client";

import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface ClusterData {
  x: number;       // IR (normalized)
  y: number;       // CFR (normalized)
  cluster: number; // 0 | 1 | 2
  nama_kecamatan: string;
}

interface Props {
  data: ClusterData[];
}

const COLORS = ["#16a34a", "#eab308", "#dc2626"];
const LABELS = ["Risiko Rendah", "Risiko Sedang", "Risiko Tinggi"];

export default function ClusterChart({ data }: Props) {
  return (
    <div className="card">
      <h3 className="card-title">Scatter IR vs CFR (Hasil Clustering)</h3>

      <ResponsiveContainer width="100%" height={420}>
        <ScatterChart
          margin={{ top: 20, right: 30, bottom: 40, left: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis
            type="number"
            dataKey="x"
            name="IR (Normalisasi)"
            label={{
              value: "Incidence Rate (IR)",
              position: "insideBottom",
              offset: -10,
            }}
          />

          <YAxis
            type="number"
            dataKey="y"
            name="CFR (Normalisasi)"
            label={{
              value: "Case Fatality Rate (CFR)",
              angle: -90,
              position: "insideLeft",
            }}
          />

          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            formatter={(value: any) => {
              // Pastikan value ada method toFixed
              return typeof value === "number" ? value.toFixed(3) : value;
            }}
            labelFormatter={(label: any, payload: any) => {
              // Ambil nama_kecamatan dari payload pertama
              if (payload && payload.length > 0 && payload[0].payload) {
                return payload[0].payload.nama_kecamatan;
              }
              return "";
            }}
          />

          <Legend verticalAlign="top" height={36} />

          {[0, 1, 2].map((c) => (
            <Scatter
              key={c}
              name={LABELS[c]}
              data={data.filter((d) => d.cluster === c)}
              fill={COLORS[c]}
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      <p className="chart-note">
        Visualisasi hubungan IR dan CFR setelah normalisasi Min–Max,
        dikelompokkan menggunakan K-Means (k=3). Warna menunjukkan klasifikasi risiko:
        hijau = Rendah, kuning = Sedang, merah = Tinggi.
      </p>

      <div className="legend" style={{ marginTop: 12 }}>
        {LABELS.map((label, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: COLORS[i],
              }}
            />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
