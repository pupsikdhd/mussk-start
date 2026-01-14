import type { Metadata } from "next";
import { JetBrains_Mono} from "next/font/google";
import "./globals.css";


const mono = JetBrains_Mono({
    subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Start",
  description: "Mussk project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mono.className} antialiased dark`}
      >
        {children}
      </body>
    </html>
  );
}
