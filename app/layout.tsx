import type { Metadata } from "next";
import { Manrope, Oswald, Roboto_Flex } from "next/font/google";

import "./globals.css";

const fontSans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

const fontDisplay = Oswald({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const fontVariableProximity = Roboto_Flex({
  variable: "--font-variable-proximity",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "ПДИВ",
  description: "Это сайт короче я хз",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontVariableProximity.variable} bg-[#05070c] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
