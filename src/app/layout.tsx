import type { Metadata } from "next";
import "./globals.css";
import { AppNav } from "@/components/AppNav";

export const metadata: Metadata = {
  title: "SubTrack - Simple subscription tracker",
  description:
    "A private, local-first app to track subscriptions, renewal dates and recurring payments.",
  openGraph: {
    title: "SubTrack",
    description: "See what you pay, when it renews, and what you could cancel.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppNav />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
