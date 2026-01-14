import { useMemo, useState } from "react";

type ClusterLevel = "Rendah" | "Sedang" | "Tinggi";

interface DataItem {
  kode_kecamatan: string;
  nama_kecamatan: string;
  ir: number;
  cfr: number;
  cluster: 0 | 1 | 2;
}

const CLUSTER_LABEL: Record<number, ClusterLevel> = {
  0: "Rendah",
  1: "Sedang",
  2: "Tinggi",
};

const PAGE_SIZE = 5;

export default function KecamatanTable({ data }: { data: DataItem[] }) {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<ClusterLevel | "ALL">("ALL");

  const filteredData = useMemo(() => {
    if (filter === "ALL") return data;
    return data.filter(d => CLUSTER_LABEL[d.cluster] === filter);
  }, [data, filter]);

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);

  const pageData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [filteredData, page]);

  return (
    <div className="card cluster-table">
      <div className="table-header">
        <h3>Data Kecamatan</h3>

        <select
          value={filter}
          onChange={e => {
            setFilter(e.target.value as any);
            setPage(1);
          }}
          className="filter-select"
        >
          <option value="ALL">Semua Klasifikasi</option>
          <option value="Rendah">Rendah</option>
          <option value="Sedang">Sedang</option>
          <option value="Tinggi">Tinggi</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th className="center">No</th>
            <th>Nama Kecamatan</th>
            <th className="right">IR</th>
            <th className="right">CFR</th>
            <th className="center">Klasifikasi</th>
          </tr>
        </thead>

        <tbody>
          {pageData.map((d, i) => (
            <tr key={d.kode_kecamatan}>
              <td className="center">
                {(page - 1) * PAGE_SIZE + i + 1}
              </td>
              <td>{d.nama_kecamatan}</td>
              <td className="right">{d.ir.toFixed(2)}</td>
              <td className="right">{d.cfr.toFixed(2)}</td>
              <td className="center">
                <span className={`badge ${CLUSTER_LABEL[d.cluster].toLowerCase()}`}>
                  {CLUSTER_LABEL[d.cluster]}
                </span>
              </td>
            </tr>
          ))}

          {pageData.length === 0 && (
            <tr>
              <td colSpan={5} className="empty">
                Tidak ada data
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
        >
          Sebelumnya
        </button>

        <span>
          Halaman {page} dari {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
