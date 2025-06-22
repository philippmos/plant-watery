---
applyTo: '**/*.{html,scss,css}'
---
Hier ist eine strukturierte, professionelle Zusammenfassung der **Responsive‑ und Geräte‑Design-Funktionalitäten in Tailwind CSS 4.1**, bereitgestellt als Kontext für Sprachmodelle zur Code‑Generierung:

---

## 🧩 1. Mobile‑First & Breakpoints

* Tailwind verwendet ein mobiles‑erst‑Prinzip: Klassen wie `sm:…`, `md:…`, `lg:…` gelten ab dem jeweiligen Breakpoint aufwärts ([tailwindcss.com][1]).
* **Breakpoint‑Bereiche**: Kombinationen wie `md:max-xl:flex` oder `md:max‑lg:flex` erlauben spezifische Regelsätze nur zwischen zwei Breakpoints ([tailwindcss.com][1]).
* **Eigenständiger Breakpoint**: z. B. `md:max-lg:flex` gilt nur genau im `md`-Bereich, ohne darüber hinaus .

---

## ⚙️ 2. Dynamische und Custom Breakpoints

* Beliebige Werte sind möglich via `min-[600px]:…` oder `max-[800px]:…` (arbitrary variants) ([tailwindcss.com][1]).
* Eigene Breakpoints in CSS konfigurierbar: `--breakpoint-xs: 30rem;` etc. neue `xs`, `3xl` Varianten ([tailwindcss.com][1]).
* Voreinstellungen entfernbar durch `--breakpoint-2xl: initial;` oder generisch alle via `--breakpoint-*: initial;` ([tailwindcss.com][1]).

---

## 📦 3. Container Queries

* Einführung von responsiven Container-Queries in v4.1:

  * Klassen wie `@container` und z. B. `@8xl:flex-row` reagieren auf Container‑Breite ([tailwindcss.com][1]).
  * Container-Sizes standardmäßig bis `7xl` („80 rem“), Erweiterung möglich via `--container-8xl` etc. ([tailwindcss.com][1]).

---

## 📳 4. Geräte‑ und Eingabe‑Erkennung

* Neue Varianten zur Unterscheidung nach Eingabegerät:

  * `pointer‑*` und `any‑pointer‑*` ermöglichen spezifisches Styling bspw. für Touch vs. Mouse ([tailwindcss.com][2]).

---

## 🧹 5. Saubere Layout‑Ausrichtung

* Neue Utilties für flex/grid:

  * `items-baseline-last` / `self-baseline-last` um Elemente an letzter Textlinie auszurichten ([tailwindcss.com][2]).
  * `safe` Alignment Klassen, z. B. `justify-center safe`, um Inhalte bei kleineren Viewports sichtbar zu halten ([tailwindcss.com][2]).

---

## ✅ 6. Browser‑Abwärtskompatibilität

* Tailwind 4.1 führt Fallback‑Mechanismen für ältere Browser:

  * Oklab Farbsupport, `@property`‑bedingte Styles und transparente Opazität erhalten bewährte Rückfallebenen ([tailwindcss.com][2], [tailwindcss.com][3]).
  * Moderne Features bleiben – aber mit eleganten Degradierungen.

---

## 🧠 Integrations‑Checkliste für LLM Prompt‑Engines:

1. **Mobile‑First-Logik**: Immer `sm:`, `md:`, `lg:`, ... verwenden.
2. **Breakpoint‑Bereiche präzise definieren**: z. B. `md:max-xl:…`, um ungewolltes Überschwingen zu vermeiden.
3. **Arbitrary Breakpoints**: Flexibel über `min-[…]`, `max-[…]` regeln – ohne Konfig-File.
4. **Container Queries aktiv nutzen**: Für komponentenbasierte, responsive Layouts.
5. **Geräte-Erkennung**: Nutze `pointer-…`, `any-pointer-…`, um Touch-optimierte UI zu haben.
6. **Content­safe Ausrichtung & Baseline‑Alignments**: Verwende `safe`, `items-baseline-last` für Stabilität.
7. **Fallbacks einplanen**: Erzeuge CSS mit moderner Syntax, die in älteren Browsern „anständig aussieht“.

---

### Beispielprompt für Sprachmodell:

> „Erzeuge ein flexibles, Container‑reaktives Grid mit `grid-cols-…`, `@container`‑Queries für verschiedenen Viewports, benutze `pointer‑` Varianten und sichere Ausrichtungen (`safe`, `baseline-last`), inklusive Fallbacks für ältere Browser.“