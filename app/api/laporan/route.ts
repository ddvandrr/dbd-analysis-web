import PDFDocument from "pdfkit";
import { NextResponse } from "next/server";

export async function GET() {
  const doc = new PDFDocument();
  const chunks: Buffer[] = [];

  doc.on("data", c => chunks.push(c));
  doc.on("end", () => {});

  doc.fontSize(18).text("Laporan Analisis Clustering DBD", { align: "center" });
  doc.moveDown();
  doc.fontSize(12).text("Metode: K-Means + Min-Max Normalization");
  doc.text("Cluster: Rendah, Sedang, Tinggi");

  doc.end();

  const pdf = Buffer.concat(chunks);

  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=laporan_dbd.pdf",
    },
  });
}
