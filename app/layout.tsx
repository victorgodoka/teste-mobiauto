import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { CarsProvider } from "./context/CarsContext";

const roboto = Roboto({ style: 'normal', weight: ['400', '500', '700', '900'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Tabela Fipe",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <CarsProvider>{children}</CarsProvider>
      </body>
    </html>
  );
}
