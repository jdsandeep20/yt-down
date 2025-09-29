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
  title: "YTubeDown - Free YouTube Video Downloader | Download MP4, MP3 in HD Quality",
  description: "Download YouTube videos for free in HD quality. Fast, secure, and easy-to-use YouTube downloader. Support for MP4, MP3, 4K, 1080p, 720p. No registration required.",
  keywords: "youtube downloader, download youtube videos, youtube to mp4, youtube to mp3, free video downloader, youtube converter, HD video download",
  authors: [{ name: "YTubeDown" }],
  robots: "index, follow",
  openGraph: {
    title: "YTubeDown - Free YouTube Video Downloader",
    description: "Download YouTube videos for free in HD quality. Fast, secure, and easy-to-use.",
    url: "https://ytubedown.com",
    siteName: "YTubeDown",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YTubeDown - Free YouTube Video Downloader",
    description: "Download YouTube videos for free in HD quality. Fast, secure, and easy-to-use.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
