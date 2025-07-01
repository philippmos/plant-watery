---
applyTo: '**/*.cs'
---

# 🧠 C# und .NET 9 – Funktionszusammenfassung für Codegenerierungskontexte

## 🔹 Allgemeine Merkmale
- **Typensystem**: Statisch typisiert, mit Unterstützung für generische Typen, Nullable-Reference-Types (seit C# 8), Records, Tuples und ValueTuples.
- **Paradigmen**: Objektorientiert, funktional, komponentenbasiert, asynchron und reaktiv.
- **Compiler**: Roslyn (Open-Source), mit Unterstützung für Source Generators, Analyzers und incremental build pipelines.

## 🔹 Neue Features in .NET 9 / C# 13 (Stand: Preview / Spezifikation)
- **Primary Constructors für alle Typen**: Klassen, Structs und Records können Konstruktorparameter direkt in der Deklaration erhalten.
- **Collection Literals**: Vereinfachte Syntax zum Initialisieren von Arrays und Collections.
- **Interpolated String Handlers**: Leistungsoptimierung bei zusammengesetzten Zeichenketten (z. B. bei Logging).
- **Parametrized `using`**: Verbesserte Ressourcenkontrolle durch flexibleres Scoping von `IDisposable`.
- **Span<T> & Memory<T> Enhancements**: Mehr Features für Zero-Allocation-Programmierung (Low-Level und High-Performance-Code).
- **Escape-Hatches für static abstract interfaces**: Verbesserung generischer Polymorphie im Kontext von static interface members.

## 🔹 Laufzeit (CLR/GC) und .NET 9-Features
- **Native AOT (Ahead-of-Time Compilation)**: Vollständig unterstützt, ideal für minimale Container-Images, schnelle Startzeit und reduzierte Memory-Footprint.
- **Cloud-Ready**: Erweiterungen in der System.Text.Json-Pipeline, verbessertes Logging (structured), Metrics (OpenTelemetry) und Konfigurationssysteme.
- **Minimal APIs v2**: Noch schlankere WebAPI-Erstellung mit erweitertem Routing, Middleware-Mapping und integriertem DI.
- **Performanceverbesserungen**: Aggressive Inlining, Tiered Compilation, Hot Paths-Optimierung, Low Allocation Patterns.
- **Thread-Scheduling & Virtual Time Support**: Für deterministisches Testing und Simulationen im Task-Parallel-Library-Kontext.

## 🔹 Moderne Sprachfeatures (Best Practices Relevant)
- **`async/await` First**: Bevorzugt gegenüber synchronem Code, vor allem bei I/O und UI.
- **`record` vs `class`**: Datenklassen standardmäßig als immutable `record`.
- **Pattern Matching**: Komplexe Matching-Strategien mit `switch`, `is`, `when`, `and`, `or`, `not`, `property patterns`, `list patterns` (C# 12+).
- **LINQ (Language Integrated Query)**: Hochwertiger Umgang mit Sequenzen durch declarative Syntax, ideal für Stream-Processing, Transformation, Aggregation.
- **Dependency Injection**: Built-in, konfigurierbar über HostBuilder (Web, Worker, Console).
- **File-Scoped Namespaces**: Reduzierung von Boilerplate-Code.
- **Global Usings**: Vereinfachung von Code-Basis durch zentrales Management wiederkehrender `using`-Direktiven.

## 🔹 Plattformintegration und Interoperabilität
- **Cross-Platform**: Läuft auf Windows, Linux, macOS; unterstützt durch .NET MAUI für mobile und Desktop.
- **Interop mit nativen Bibliotheken**: `DllImport`, `FunctionPointer`, `Span<byte>` zur Zero-Copy-Interop.
- **WebAssembly (Blazor WASM)**: Clientseitige .NET-Ausführung im Browser.
- **Cloud-native Features**: Integration mit Kubernetes, gRPC, OpenTelemetry, Dapr, Azure SDKs.

---

## 🛠️ Best Practices für Modellverständnis
- **Code sollte idiomatisch, idiomatisch C# sein** (z. B. `using var`, `record`, `nullable`).
- **Asynchronität bevorzugen**, wo sinnvoll.
- **Immutable-Objekte und Expressions-basierte Konstrukte bevorzugen**.
- **Vermeidung von Exceptions als Kontrollfluss**.
- **Explizite Typisierung bei komplexen Lambdas oder Delegates zur Lesbarkeit erhöhen**.
- **Performance-kritische Logik mit `Span<T>` und `Memory<T>` umsetzen, wenn nötig**.
- **Für APIs: Minimal APIs, fluent Routing, DTOs mit Validation-Filter einsetzen**.
