"use client";

import { Button } from "@vecchio/ui/components/button";
import { cn } from "@vecchio/ui/lib/utils";
import {
	ArrowDown,
	ArrowUp,
	CheckCircle2,
	ChevronRight,
	Clock3,
	FilePenLine,
	FolderOpen,
	Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DsgBarChart } from "@/components/dataweb/dsg-bar-chart";
import {
	dsgBtnPrimary,
	dsgH1,
	dsgLead,
	dsgPageMain,
} from "@/components/dataweb/dsg-ui";
import {
	dwAccessiMensili,
	dwAttivitaRecenti,
	dwDashboardKpis,
	dwRiepilogoAnnuale,
	dwRichiesteInCorso,
	type DwAttivitaIcon,
	type DwDashboardKpi,
} from "@/lib/dataweb-mock-data";

const chartTabs = [
	"Accessi",
	"Fascicoli consultati",
	"Trend annuale",
] as const;

function kpiIconClass(tone: DwDashboardKpi["iconTone"]) {
	return cn(
		"grid size-11 shrink-0 place-items-center rounded-[10px]",
		tone === "blue" && "bg-[var(--dsg-kpi-blue)] text-[#2563eb]",
		tone === "green" && "bg-[var(--dsg-kpi-green)] text-[#16a34a]",
		tone === "orange" && "bg-[var(--dsg-kpi-orange)] text-[#ea580c]",
		tone === "purple" && "bg-[var(--dsg-kpi-purple)] text-[#7c3aed]",
	);
}

function KpiIcon({ tone }: { tone: DwDashboardKpi["iconTone"] }) {
	if (tone === "blue") {
		return <FolderOpen strokeWidth={1.75} className="size-5" />;
	}
	if (tone === "green") {
		return <Clock3 strokeWidth={1.75} className="size-5" />;
	}
	if (tone === "orange") {
		return <FilePenLine strokeWidth={1.75} className="size-5" />;
	}
	return <CheckCircle2 strokeWidth={1.75} className="size-5" />;
}

function AttivitaIcon({ type }: { type: DwAttivitaIcon }) {
	const base = "grid size-9 shrink-0 place-items-center rounded-full";
	if (type === "success") {
		return (
			<span className={cn(base, "bg-[#dcfce7] text-[#16a34a]")}>
				<CheckCircle2 strokeWidth={1.75} className="size-4" />
			</span>
		);
	}
	if (type === "folder") {
		return (
			<span className={cn(base, "bg-[#dbeafe] text-[#2563eb]")}>
				<FolderOpen strokeWidth={1.75} className="size-4" />
			</span>
		);
	}
	return (
		<span className={cn(base, "bg-[#ffedd5] text-[#ea580c]")}>
			<Clock3 strokeWidth={1.75} className="size-4" />
		</span>
	);
}

/** Dashboard home — faithful to the DSG Portale reference (KPIs, charts, activity lists). */
export default function DataWebHomePage() {
	const [activeChartTab, setActiveChartTab] =
		useState<(typeof chartTabs)[number]>("Accessi");

	return (
		<main className={dsgPageMain}>
			{/* Page header row with primary CTA. */}
			<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
				<div className="space-y-1">
					<h1 className={dsgH1}>Benvenuto, Notaio Dimostrativo</h1>
					<p className={dsgLead}>
						Ecco l&apos;andamento delle tue attività e le statistiche principali.
					</p>
				</div>
				<Button
					nativeButton={false}
					render={<Link href="/richiesta-fascicoli" />}
					className={cn(dsgBtnPrimary, "shrink-0 gap-2")}
				>
					<Plus strokeWidth={2} className="size-4" />
					Nuova richiesta fascicolo
				</Button>
			</div>

			{/* Four KPI summary cards. */}
			<section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{dwDashboardKpis.map((kpi) => (
					<article key={kpi.label} className="dsg-card p-5">
						<div className="flex items-start justify-between gap-3">
							<div className={kpiIconClass(kpi.iconTone)}>
								<KpiIcon tone={kpi.iconTone} />
							</div>
							<span
								className={cn(
									"inline-flex items-center gap-0.5 font-semibold text-[13px] tabular-nums",
									kpi.trendTone === "green"
										? "text-[#16a34a]"
										: "text-[#ea580c]",
								)}
							>
								{kpi.trendDirection === "up" ? (
									<ArrowUp strokeWidth={2} className="size-3.5" />
								) : (
									<ArrowDown strokeWidth={2} className="size-3.5" />
								)}
								{kpi.trend}
							</span>
						</div>
						<p className="mt-4 font-medium text-[13px] text-[var(--dsg-text-muted)]">
							{kpi.label}
						</p>
						<p className="mt-1 font-semibold text-3xl text-[var(--dsg-text)] tabular-nums tracking-tight">
							{kpi.value}
						</p>
						<p className="mt-1 text-[13px] text-[var(--dsg-text-muted)]">
							{kpi.sublabel}
						</p>
					</article>
				))}
			</section>

			{/* Charts row — tabbed left panel + yearly summary right. */}
			<section className="mt-6 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
				<article className="dsg-card p-5">
					<div
						className="flex flex-wrap gap-4 border-[var(--dsg-border)] border-b"
						role="tablist"
						aria-label="Grafici statistiche"
					>
						{chartTabs.map((tab) => (
							<button
								key={tab}
								type="button"
								role="tab"
								aria-selected={activeChartTab === tab}
								onClick={() => setActiveChartTab(tab)}
								className={cn(
									"-mb-px border-b-2 pb-3 font-medium text-[14px] transition-colors",
									activeChartTab === tab
										? "border-[var(--dsg-primary)] text-[var(--dsg-primary)]"
										: "border-transparent text-[var(--dsg-text-muted)] hover:text-[var(--dsg-text)]",
								)}
							>
								{tab}
							</button>
						))}
					</div>
					<h2 className="mt-5 font-semibold text-[15px] text-[var(--dsg-text)]">
						Accessi effettuati (ultimo anno)
					</h2>
					<div className="mt-4">
						<DsgBarChart
							data={dwAccessiMensili}
							barColor="var(--dsg-chart-blue)"
							maxValue={50}
							title="Accessi effettuati per mese nell'ultimo anno"
						/>
					</div>
				</article>

				<article className="dsg-card p-5">
					<div className="flex items-start justify-between gap-3">
						<h2 className="font-semibold text-[15px] text-[var(--dsg-text)]">
							Riepilogo ultimi 10 anni
						</h2>
						<label className="sr-only" htmlFor="dsg-year-range">
							Intervallo anni
						</label>
						<select
							id="dsg-year-range"
							defaultValue="10"
							className="h-9 rounded-[var(--dsg-radius-control)] border border-[var(--dsg-border)] bg-white px-3 text-[13px] text-[var(--dsg-text)]"
						>
							<option value="10">Ultimi 10 anni</option>
							<option value="5">Ultimi 5 anni</option>
						</select>
					</div>
					<div className="mt-4">
						<DsgBarChart
							data={dwRiepilogoAnnuale}
							barColor="var(--dsg-chart-green)"
							maxValue={400}
							title="Riepilogo accessi per anno dal 2015 al 2024"
						/>
					</div>
				</article>
			</section>

			{/* Bottom row — recent activity + open requests. */}
			<section className="mt-6 grid gap-4 lg:grid-cols-2">
				<article className="dsg-card flex flex-col">
					<div className="border-[var(--dsg-border)] border-b px-5 py-4">
						<h2 className="font-semibold text-[16px] text-[var(--dsg-text)]">
							Attività recenti
						</h2>
					</div>
					<ul className="divide-y divide-[var(--dsg-border)]">
						{dwAttivitaRecenti.map((item) => (
							<li key={item.id}>
								<button
									type="button"
									className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-[#f9fafb]"
								>
									<AttivitaIcon type={item.icon} />
									<div className="min-w-0 flex-1">
										<p className="font-medium text-[14px] text-[var(--dsg-text)]">
											{item.titolo}
										</p>
										<p className="mt-0.5 text-[13px] text-[var(--dsg-text-muted)]">
											{item.sottotitolo}
										</p>
									</div>
									<span className="shrink-0 text-[13px] text-[var(--dsg-text-muted)] tabular-nums">
										{item.quando}
									</span>
									<ChevronRight
										strokeWidth={1.75}
										className="size-4 shrink-0 text-[var(--dsg-text-muted)]"
										aria-hidden
									/>
								</button>
							</li>
						))}
					</ul>
					<div className="border-[var(--dsg-border)] border-t px-5 py-3">
						<Link
							href="#"
							className="font-medium text-[14px] text-[var(--dsg-primary)] hover:underline"
						>
							Vedi tutte le attività &gt;
						</Link>
					</div>
				</article>

				<article className="dsg-card flex flex-col">
					<div className="border-[var(--dsg-border)] border-b px-5 py-4">
						<h2 className="font-semibold text-[16px] text-[var(--dsg-text)]">
							Richieste in corso
						</h2>
					</div>
					<ul className="divide-y divide-[var(--dsg-border)]">
						{dwRichiesteInCorso.map((row) => (
							<li
								key={row.id}
								className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
							>
								<div className="min-w-0">
									<p className="font-semibold text-[14px] text-[var(--dsg-primary)] tabular-nums">
										{row.id}
									</p>
									<p className="mt-0.5 text-[14px] text-[var(--dsg-text)]">
										{row.descrizione}
									</p>
								</div>
								<div className="flex shrink-0 items-center gap-3">
									<span className="text-[13px] text-[var(--dsg-text-muted)] tabular-nums">
										{row.data}
									</span>
									<span
										className={cn(
											"rounded-full px-2.5 py-1 font-medium text-[12px]",
											row.stato === "in-elaborazione"
												? "bg-[#dbeafe] text-[#1d4ed8]"
												: "bg-[#ffedd5] text-[#c2410c]",
										)}
									>
										{row.stato === "in-elaborazione"
											? "In elaborazione"
											: "In attesa"}
									</span>
									<Link
										href="/richiesta-fascicoli"
										className="font-medium text-[13px] text-[var(--dsg-primary)] hover:underline"
									>
										Dettagli &gt;
									</Link>
								</div>
							</li>
						))}
					</ul>
					<div className="border-[var(--dsg-border)] border-t px-5 py-3">
						<Link
							href="/richiesta-fascicoli"
							className="font-medium text-[14px] text-[var(--dsg-primary)] hover:underline"
						>
							Vedi tutte le richieste &gt;
						</Link>
					</div>
				</article>
			</section>

			<footer className="mt-auto pt-10 pb-2 text-[12px] text-[var(--dsg-text-muted)]">
				© 2016 - 2024 DataSystem Group. All rights reserved.
			</footer>
		</main>
	);
}
