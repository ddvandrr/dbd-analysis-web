import { supabase } from "@/lib/supabase";
import { kmeans } from "ml-kmeans";

/**
 * Hitung Silhouette Score manual
 */
function calculateSilhouette(data: number[][], labels: number[]) {
  const n = data.length;
  if (n <= 1) return 0;

  const distance = (a: number[], b: number[]) =>
    Math.sqrt(a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0));

  let totalScore = 0;

  for (let i = 0; i < n; i++) {
    const sameCluster = [];
    const otherClusters: Record<number, number[]> = {};

    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      const d = distance(data[i], data[j]);
      if (labels[i] === labels[j]) {
        sameCluster.push(d);
      } else {
        if (!otherClusters[labels[j]]) otherClusters[labels[j]] = [];
        otherClusters[labels[j]].push(d);
      }
    }

    const a =
      sameCluster.length > 0
        ? sameCluster.reduce((s, v) => s + v, 0) / sameCluster.length
        : 0;

    const b = Math.min(
      ...Object.values(otherClusters).map(
        (arr) => arr.reduce((s, v) => s + v, 0) / arr.length
      )
    );

    const s = b === 0 && a === 0 ? 0 : (b - a) / Math.max(a, b);
    totalScore += s;
  }

  return totalScore / n;
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("rekap_kecamatan")
      .select("*");

    if (error) throw error;
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("Data Supabase kosong");
    }

    // fitur clustering
    const features = data.map((d: any) => [d.ir, d.cfr]);

    // KMeans
    const k = 3;
    const resultKMeans = kmeans(features, k, {
      initialization: "kmeans++",
      maxIterations: 100,
    });
    const clusters = resultKMeans.clusters;

    // Hitung silhouette
    const silhouette = calculateSilhouette(features, clusters);

    // Gabungkan hasil
    const result = data.map((d: any, i: number) => ({
      ...d,
      cluster: clusters[i],
    }));

    return new Response(
      JSON.stringify({
        data: result,
        silhouette, // 🔴 INI YANG SEBELUMNYA TIDAK ADA
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
