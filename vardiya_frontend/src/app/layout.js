import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from 'next/link'; // Import Link

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vardiya Frontend", // Changed title
  description: "Vardiya Frontend Application", // Changed description
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <Link href="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link href="/schedules" style={{ marginRight: '1rem' }}>Schedules</Link>
          {/* Add other navigation links as needed */}
        </nav>
        <main style={{ padding: '1rem' }}>
          {children}
        </main>
      </body>
    </html>
  );
}