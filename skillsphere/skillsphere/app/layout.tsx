import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SkillSphere",
  description: "AI-powered personalised learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
