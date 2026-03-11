import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Roboto_Flex, Sora } from "next/font/google";

import "./globals.css";

const fontSans = Plus_Jakarta_Sans({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const fontDisplay = Sora({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const fontVariableProximity = Roboto_Flex({
  variable: "--font-variable-proximity",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "П9ИВ",
  description: "Иммерсивная визуальная история группы П9ИВ: характеры, атмосфера и общая память.",
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
