import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("rekap_kecamatan")
      .select("nama_kecamatan, ir");

    if (error) {
      console.error("Supabase error:", error);
      throw error;
    }

    return Response.json(data);
  } catch (err: any) {
    console.error("API /heatmap error:", err);

    return Response.json(
      { error: err.message ?? "Internal Server Error" },
      { status: 500 }
    );
  }
}
