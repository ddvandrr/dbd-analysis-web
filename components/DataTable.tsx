"use client";

import { useState, useMemo } from "react";

interface DataTableProps {
  data: {
    nama_kecamatan: string;
    IR: number | string;
    CFR: number | string;
    kategori: string;
  }[];
}

export default function DataTable({ data }: DataTableProps) {
  const [filter, setFilter] = useState<"Semua" | "Rendah" | "Sedang" | "Tinggi">("Semua");
  const [page, setPage] = useState(1);
  const perPage = 5;

  // Filtered data
  const filteredData = useMemo(() => {
    return filter === "Semua" ? data : data.filter(d => d.kategori === filter);
  }, [filter, data]);

  // Pagination
  const pageCount = Math.ceil(filteredData.length / perPage);
  const pageData = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredData.slice(start, start + perPage);
  }, [page, filteredData]);

  // Cluster colors
  const clusterColor = (kategori: string) => {
    switch (kategori) {
      case "Rendah": return "#22c55e";
      case "Sedang": return "#facc15";
      case "Tinggi": return "#ef4444";
      default: return "#64748b";
    }
  };

  return (
    <div className="card">
      <h2>Data Kecamatan & Cluster Risiko</h2>

      {/* Filter */}
      <div style={{ marginBottom: 12 }}>
        <label>
          Filter:{" "}
          <select value={filter} onChange={e => { setFilter(e.target.value as any); setPage(1); }}>
            <option value="Semua">Semua</option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
          </select>
        </label>
      </div>

      {/* Table */}
      <table className="table">
        <thead>
          <tr>
            <th>No</th>
            <th>Kecamatan</th>
            <th>IR (Norm)</th>
            <th>CFR (Norm)</th>
            <th>Cluster</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((d, i) => (
            <tr key={i}>
              <td>{(page - 1) * perPage + i + 1}</td>
              <td>{d.nama_kecamatan}</td>
              <td>{d.IR != null ? Number(d.IR).toFixed(2) : "-"}</td>
              <td>{d.CFR != null ? Number(d.CFR).toFixed(2) : "-"}</td>
              <td>
                <span
                  style={{
                    background: clusterColor(d.kategori),
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                >
                  {d.kategori}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={{ marginTop: 12, display: "flex", justifyContent: "center", gap: 8 }}>
        <button
          disabled={page === 1}
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          className="button"
        >
          Prev
        </button>
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            style={{
              background: i + 1 === page ? "#0f172a" : "#e5e7eb",
              color: i + 1 === page ? "white" : "#0f172a",
              padding: "4px 10px",
              borderRadius: 6,
              fontWeight: 500,
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          disabled={page === pageCount}
          onClick={() => setPage(p => Math.min(p + 1, pageCount))}
          className="button"
        >
          Next
        </button>
      </div>
    </div>
  );
}
