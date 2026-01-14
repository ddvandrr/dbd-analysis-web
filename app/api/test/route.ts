import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Ambil env Supabase
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("SUPABASE_URL atau SUPABASE_ANON_KEY tidak ditemukan di env!");
}

// Buat client Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // Ganti "kecamatan" dengan nama tabel yang ada di Supabase
    const { data, error } = await supabase.from("kecamatan").select("*");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
