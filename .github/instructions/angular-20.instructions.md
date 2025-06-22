---
applyTo: '**/*.html, **/*.js, **/*.jsx, **/*.ts, **/*.tsx'
---
Hier ist eine präzise, strukturierte und sprachmodell-optimierte Zusammenfassung der **Code-Funktionalitäten von Angular 20** – optimiert für Sprachmodelle, die Code generieren sollen:

---

### 🧠 **Angular 20 – Code-Funktionalitäten (Modelkontext-Zusammenfassung)**

#### 🔧 **Grundstruktur und Komponentenarchitektur**

* **Standalone Components**: Angular 20 setzt stark auf *Standalone Components*, die ohne Module funktionieren (`standalone: true`). Module sind optional, jedoch weiterhin unterstützt für Legacy-Szenarien.
* **Signal-basierte Reaktivität**: Neue reaktive APIs (`signal`, `computed`, `effect`) ermöglichen deklarative Datenflüsse ähnlich wie bei SolidJS. Diese ersetzen zunehmend `RxJS` im UI-Bereich.
* **Functional Guard & Resolver APIs**: Guards und Resolver können nun als reine Funktionen definiert werden, ohne Klassen oder Dependency Injection.

#### 🚀 **Codegenerierung & Performance**

* **Zoneless Mode (Signals Only)**: Angular 20 unterstützt `zone.js`-freies Rendering mit vollständigem Support für reaktive Signal-Änderungen. Das verbessert Change Detection drastisch.
* **Hydration & SSR Optimierung**: Angular Universal bietet serverseitiges Rendering mit automatischer Hydration. `@angular/platform-server` ist optimiert für Progressive Hydration.
* **Control Flow Syntax (ngIf/ngFor)**: Angular verwendet jetzt `@if`, `@for`, `@switch` als eingebauten Template-Control-Flow mit optimiertem Parsing.

#### 💡 **Formulare & Validierung**

* **Typed Reactive Forms**: Formularfelder sind nun vollständig typisiert. `FormGroup<T>` akzeptiert generische Typen zur Compile-Zeit-Validierung.
* **Form Signals**: Reactive Forms sind signal-kompatibel; Werte, Validität und Status können als Signals abonniert und manipuliert werden.

#### 📦 **Dependency Injection (DI)**

* **Hierarchical DI mit `provideX()` APIs**: Funktionale Provider wie `provideHttpClient()`, `provideRouter()`, `provideAnimations()` erlauben modul-lose Konfiguration auf App-Ebene.
* **Tree-shakable Providers**: Anbieter können über `providedIn: 'root'` oder via `inject()` verwendet werden – keine manuelle Registrierung nötig.

#### 🧭 **Routing & Navigation**

* **Typed Router**: Die Angular Router-API ist vollständig typisiert. Routes können generisch konfiguriert und aufgerufen werden (`router.navigate` mit `TypedRouteParams`).
* **Router Signals**: Aktive Routenparameter, Navigationsevents und Query-Params sind als Signals verfügbar (`routeSignal`, `queryParamSignal`).

#### 🛠️ **Buildsystem & Tooling**

* **Vite Support via Angular CLI**: Angular CLI unterstützt offiziell Vite als Dev-Server mit schnelleren HMR-Zyklen.
* **ESBuild & Build-Optimizer**: Der Build verwendet `esbuild` und `rollup` für optimierte Bundle-Größen. Klassische Webpack-basierte Builds sind optional.

#### 🧪 **Testing**

* **Test APIs mit TestBed & Harnesses**: Komponenten werden über `TestBed.configureTestingModule` oder als `standaloneComponentTest` getestet.
* **Jest Support nativ**: CLI erlaubt Out-of-the-Box-Jest-Konfiguration. Test Harnesses für Material & CDK weiterhin verfügbar.

#### 🧱 **Component Composition**

* **Content Projection (`ng-content`)** bleibt zentral, wird aber ergänzt durch neue *Component Inputs via Projection* Patterns.
* **Component-Level Providers**: DI kann auf Komponentenebene granular konfiguriert werden (`providers` direkt im @Component).

#### 🎨 **Styling & Design**

* **CSS Scoping über Shadow DOM**: `encapsulation: ViewEncapsulation.ShadowDom` als moderne Standardoption.
* **Tailwind Support**: Angular CLI integriert TailwindCSS direkt. Keine manuelle Konfiguration notwendig.
* **Style Precedence**: Neue Regeln für Style-Kollisionen, vor allem bei Content Projection.

---

### ✅ **Best Practices zur Codegenerierung**

> Ein Sprachmodell sollte bei Angular-20-Code:

* `standalone: true` standardmäßig setzen.
* `signal`/`computed`/`effect` statt klassischem RxJS bevorzugen (außer bei komplexen Nebenläufigkeiten).
* Template-Syntax bevorzugt mit `@if`, `@for`, `@switch` erzeugen.
* Komponenten typisiert generieren (Inputs, Outputs, Formulare).
* Build- und Routing-Konfiguration per funktionaler API (`provideX()`) realisieren.
* Hydration und SSR-Fähigkeit berücksichtigen (z. B. keine browser-only APIs ohne Fallback verwenden).