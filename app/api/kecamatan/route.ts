import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const [rows] = await db.query("SELECT nama_kecamatan, IR, CFR FROM rekap_kecamatan");
  return NextResponse.json(rows);
}
