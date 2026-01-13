import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard Analisis Risiko DBD",
  description: "Analisis clustering DBD Kota Semarang menggunakan K-Means",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        {/* HEADER */}
        <header className="app-header">
          <div className="header-inner">
            <h1>Dashboard Analisis Risiko DBD</h1>
            <p>
              Metode K-Means Clustering dengan Normalisasi Min–Max
            </p>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="app-main">
          {children}
        </main>

        {/* FOOTER */}
        <footer className="app-footer">
          © {new Date().getFullYear()} – Analisis DBD Kota Semarang
        </footer>
      </body>
    </html>
  );
}
