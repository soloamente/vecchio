import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "../index.css";
import Providers from "@/components/providers";
import { Agentation } from "agentation";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DataWeb — Portale atti notarili",
	description:
		"Demo UI per consultazione fascicoli, ricerca avanzata e anteprima documentale (mock dati).",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="it" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased [font-feature-settings:'tnum'_on,'lnum'_on]`}
			>
				<Providers>
					<div className="min-h-dvh">{children}</div>
				</Providers>
				{process.env.NODE_ENV === "development" && <Agentation />}
			</body>
		</html>
	);
}
