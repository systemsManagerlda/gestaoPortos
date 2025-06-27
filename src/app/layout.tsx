// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Gestão Portuária",
  description:
    "Explore a eficiência e o controle precisos com nossa aplicação web de Gestão Portuária. Projetada para optimizar todas as operações essenciais de um porto, nossa plataforma oferece funcionalidades avançadas para monitoramento de carga, gestão de embarcações, planejamento logístico e muito mais. Com interface intuitiva e ferramentas poderosas, facilitamos a coordenação de atividades, melhorando a segurança e maximizando a produtividade. Seja para terminais de carga, gestão de estoques ou acompanhamento de navios, nossa solução proporciona visibilidade em tempo real e análises detalhadas, garantindo que cada operação flua sem problemas. Modernize sua gestão portuária com nossa aplicação web, onde a precisão e a eficiência se encontram.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
