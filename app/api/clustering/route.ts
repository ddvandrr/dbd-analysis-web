import { db } from "@/lib/db";
import { minMaxNormalize } from "@/lib/normalize";
import { kMeans } from "@/lib/kmeans";
import { silhouetteScore } from "@/lib/silhouette";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows]: any = await db.query(`
    SELECT 
      nama_kecamatan,
      jumlah_penduduk,
      total_penderita,
      total_meninggal,
      IR,
      CFR
    FROM rekap_kecamatan
  `);

  const ir = rows.map((r: any) => Number(r.IR));
  const cfr = rows.map((r: any) => Number(r.CFR));

  const irNorm = minMaxNormalize(ir);
  const cfrNorm = minMaxNormalize(cfr);

  const points = irNorm.map((v, i) => ({ x: v, y: cfrNorm[i] }));
  const clusters = kMeans(points, 3);
  const silhouette = silhouetteScore(points, clusters);

  const data = rows.map((r: any, i: number) => ({
    ...r,
    cluster: clusters[i],
    kategori: ["Rendah", "Sedang", "Tinggi"][clusters[i]],
    x: irNorm[i],
    y: cfrNorm[i],
  }));

  return NextResponse.json({
    silhouette: silhouette.toFixed(3),
    data,
  });
}
