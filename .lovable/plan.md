## Cel

Dodać do zakładki **Benchmarks** w `/seller` sekcję z 4 grupami klientów, ale w uproszczonej formie — bez metryk AOV, wieku, częstotliwości. Tylko trzy liczby na grupę:

1. **% bazy klientów** (udział w całej bazie sklepu)
2. **% udziału w sprzedaży** sklepu (przychód generowany przez grupę)
3. **% zwrotów** (return rate w obrębie grupy)

## Dane (mock)

| Segment | % bazy | % sprzedaży | % zwrotów |
|---|---|---|---|
| Pracujące kobiety | 35% | 48% | 12% |
| Łowczynie okazji | 25% | 18% | 34% |
| Świadome Premium | 15% | 26% | 6% |
| Młode, trend-driven | 10% | 8% | 28% |
| *Pozostali* | 15% | — | — |

(Pozostali = dopełnienie do 100% — pokazać tylko jako notkę pod wykresem, bez karty.)

## Zmiany w `src/pages/Seller.tsx`

1. **Stała `customerSegments`** — array 4 obiektów: `{ name, share, salesShare, returnRate, icon, accent }`. Ikony z `lucide-react`: `Briefcase`, `Tag`, `Gem`, `Sparkles`.

2. **Nowa sekcja w tabie `benchmarks`**, pod istniejącą tabelą benchmarków:
   - Nagłówek: „Customer segments" + krótki podtytuł.
   - **Stacked horizontal bar** (`recharts` `BarChart` `layout="vertical"`) pokazujący procentowy rozkład bazy klientów (4 segmenty + reszta), w paście kolorów charcoal/olive/sand/warm-gray.
   - **Grid 4 kart** (2×2 na md, 1 kolumna na mobile), każda karta:
     - ikona + nazwa segmentu
     - 3 wiersze metryk (label + duża liczba %): „Share of base", „Share of revenue", „Return rate"
     - Mini pasek progresu pod „Return rate" pokolorowany wg progu (zielony <10%, bursztyn 10–20%, czerwony >20%).
   - Krótka notka: „Pozostali klienci: 15% bazy — niesklasyfikowani."

3. **Styl** — spójnie z istniejącym dashboardem: `bg-cream`, `border-charcoal/10`, typografia jak w innych kartach Benchmarks. Bez nowych kolorów / tokenów.

## Pliki
- `src/pages/Seller.tsx` — edycja (dodanie stałej + JSX w tabie `benchmarks`).

Bez zmian w routingu, headerze, tailwind config czy index.css.