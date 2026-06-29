# Listino prodotti + dialog prima visita — Design Spec

**Data:** 2026-06-23  
**Progetto:** DSG Portale (`apps/web`)  
**Stato:** Approvato in brainstorming

## Obiettivo

Aggiungere una pagina dedicata al **listino prodotti** (codice, nome, descrizione, prezzo, immagine piccola) coerente con il design system DSG, e un **dialog promozionale** mostrato **una sola volta** al primo accesso al portale.

## Decisioni utente (brainstorming)

| Tema | Scelta |
|------|--------|
| Layout listino | Toggle **Tabella / Griglia** scelto dall'utente |
| Persistenza vista | `localStorage` (`dsg-listino-view`: `tabella` \| `griglia`) |
| Dialog prima visita | Una sola volta, mai più dopo dismiss |
| Stile dialog | Completo: titolo, copy, anteprima 3 prodotti, CTA + chiudi |
| Dismiss dialog | Chiudi, ✕, o navigazione via CTA → tutti impostano flag permanente |

---

## Approcci considerati

### A — Client-only con mock statici (scelto)

Mock in `dataweb-mock-data.ts`, componenti client per toggle vista e dialog. `localStorage` per vista e dismiss dialog.

**Pro:** Allineato al resto del portale demo, zero backend, implementazione rapida.  
**Contro:** Nessuna sync multi-device (accettabile per demo).

### B — Vista in URL (`?view=griglia`)

Stato vista anche in query string, con fallback `localStorage`.

**Pro:** Link condivisibili con vista preimpostata.  
**Contro:** Complessità extra senza requisito esplicito; YAGNI.

### C — Cookie server-side per dialog

Middleware Next.js legge cookie per saltare il dialog.

**Pro:** Nessun flash client-side.  
**Contro:** Over-engineering per demo senza auth reale.

**Raccomandazione:** **Approccio A.**

---

## Architettura

```
apps/web/src/
├── app/(dataweb)/
│   ├── listino/page.tsx              # Server page + metadata
│   └── layout.tsx                    # (invariato) monta dialog promo nel shell
├── components/dataweb/
│   ├── listino-view-toggle.tsx       # Segmented Tabella | Griglia
│   ├── listino-product-table.tsx     # Vista tabella
│   ├── listino-product-grid.tsx      # Vista griglia
│   ├── listino-promo-dialog.tsx      # Dialog prima visita
│   └── data-web-sidebar.tsx          # + voce nav "Listino prodotti"
└── lib/
    └── dataweb-mock-data.ts          # + DwListinoProdotto[] e dataset demo
```

**Flusso dialog:**

1. Utente apre il portale (qualsiasi route sotto `(dataweb)`).
2. `ListinoPromoDialog` (client) legge `localStorage` key `dsg-listino-promo-dismissed`.
3. Se assente → apre dialog dopo mount (evitare SSR mismatch).
4. Dismiss (✕, "Chiudi", o click CTA "Vai al listino") → scrive flag `true` e chiude.
5. CTA primaria naviga a `/listino`.

**Flusso listino:**

1. Pagina `/listino` con header standard (`dsgEyebrow`, `dsgH1`, `dsgLead`).
2. Toolbar header: toggle segmentato a destra (pattern dashboard chart tabs / `FascicoliClassSegmented`).
3. Vista default: **tabella** se nessuna preferenza salvata.
4. `DsgCard` con contenuto tabella o griglia in base allo stato.

---

## Navigazione

- **Route:** `/listino`
- **Sidebar:** sezione **Navigazione**, dopo "Richiesta fascicoli"
  - Label: `Listino prodotti`
  - Icona: `Package` o `Tag` (lucide)
- **Metadata:** `Listino prodotti | DSG Portale`

---

## Modello dati (mock)

```ts
export interface DwListinoProdotto {
  codice: string;       // es. "DSG-001"
  nome: string;
  descrizione: string;
  prezzo: number;       // EUR, formattato in UI
  prezzoLabel?: string; // opz. "a partire da" per demo
  immagineUrl: string;  // path sotto /public/listino/ o placeholder
}
```

**Dataset demo:** 8–12 prodotti notarili plausibili (copia conforme, conservazione digitale, visura catastale, firma digitale, etc.). Immagini: asset statici in `public/listino/` (icone/illustrazioni leggere, non foto stock pesanti).

**Formattazione prezzo:** `Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })`.

---

## Pagina listino — UI

### Header

- Eyebrow: `Servizi`
- H1: `Listino prodotti`
- Lead: breve descrizione catalogo DSG per lo studio notarile
- Toggle **Tabella | Griglia** allineato a destra su `sm+` (sotto il titolo su mobile)

### Vista tabella

Colonne (come Fascicoli):

| | Codice | Prodotto | Descrizione | Prezzo |
|---|--------|----------|-------------|--------|
| thumb 48×48 | mono | nome bold | muted, troncata | blu, tabular-nums |

- `dsgTableHead`, hover row `#f9fafb`
- Immagine: `next/image` con `width/height` 48, `rounded-[8px]`, alt = nome prodotto

### Vista griglia

- `grid gap-4 sm:grid-cols-2 xl:grid-cols-3`
- Card prodotto dentro `DsgCard` o sub-card con bordo
- Immagine ~120px altezza, tag codice (`DsgTag tone="primary"`), nome, descrizione, prezzo

### Toggle vista

- Riutilizzare pattern visivo segmented esistente (pill su sfondo `#e5e7eb`, segmento attivo bianco)
- `aria-label="Modalità visualizzazione"`
- Icone opzionali: `LayoutList` / `LayoutGrid` accanto alle label

---

## Dialog prima visita — UI

Montato in `(dataweb)/layout.tsx` o wrapper client dedicato `ListinoPromoProvider`.

**Componente Dialog:** aggiungere `Dialog` a `@vecchio/ui` (Radix/shadcn-style) oppure overlay custom leggero con:
- `role="dialog"`, `aria-modal="true"`, focus trap basilare
- Backdrop `rgba(17,24,39,0.35)`
- Box bianco `dsg-card`, `max-w-md`, radius 12px

**Contenuto (approvato):**

- Hero gradient (`--dsg-kpi-blue` → `--dsg-kpi-purple`), icona 📦 / `Package`
- Titolo: *Scopri il nuovo listino prodotti*
- Copy: servizi DSG, prezzi e codici a portata di mano
- Anteprima 3 prodotti dal mock (mini card)
- CTA primaria: **Vai al listino** → `/listino` + dismiss
- Secondaria: **Chiudi** + ✕ in alto a destra → dismiss

**Timing:** `useEffect` post-hydration; nessun autofocus su input (touch). Animazione fade/scale leggera ≤200ms.

**localStorage key:** `dsg-listino-promo-dismissed` = `"1"`.

---

## Componenti UI da aggiungere

| Componente | Package | Note |
|------------|---------|------|
| `Dialog` | `packages/ui` | Necessario per dialog accessibile; non esiste ancora |

Implementazione minima: `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter` — stile token DSG (bordi, radius, no dark mode).

---

## Gestione errori e edge case

| Caso | Comportamento |
|------|----------------|
| `localStorage` non disponibile (private mode) | Dialog può riapparire a ogni visita; vista default tabella |
| SSR / hydration | Dialog chiuso server-side; stato letto solo client |
| Lista vuota (futuro) | Empty state in card: "Nessun prodotto disponibile" |
| Immagine mancante | Fallback placeholder gradient come mockup |

---

## Testing (manuale)

- [ ] Prima visita: dialog appare su `/` e su `/fascicoli`
- [ ] Chiudi → refresh → dialog non riappare
- [ ] CTA → naviga a `/listino` e non riappare dialog
- [ ] Toggle tabella/griglia persiste dopo refresh
- [ ] Sidebar evidenzia `/listino` come attivo
- [ ] Responsive: griglia 1 col mobile, tabella scroll orizzontale
- [ ] Light mode only, nessuna regressione shell

---

## Fuori scope

- Carrello, ordini, integrazione pagamenti
- Backend / API prodotti
- Ricerca e filtri per categoria (fase 2)
- Dark mode
- Notifiche header

---

## Criteri di successo

1. Route `/listino` consultabile dalla sidebar con prodotti mock completi.
2. Utente può passare tra tabella e griglia; preferenza ricordata.
3. Al primo ingresso nel portale appare il dialog promozionale; dopo dismiss non si ripete.
4. Aspetto visivo coerente con `DsgCard`, token `--dsg-*`, tipografia Geist.
