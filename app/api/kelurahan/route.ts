import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows] = await db.query(`
    SELECT nama_kelurahan, kecamatan_id, IR, CFR 
    FROM rekap_kelurahan
  `);
  return NextResponse.json(rows);
}
