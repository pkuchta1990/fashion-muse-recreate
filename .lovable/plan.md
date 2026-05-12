## Cel

Stworzyć podstronę `/seller` z modułem **Seller Hub Pro** — płatnym (39 zł/mies., mock) panelem pokazującym sellerowi rzeczywistą marżę netto po prowizji 22%, kosztach zwrotów i obsługi ticketów. Bez prawdziwej płatności i bez backendu — wszystko na fixture'ach.

## Stan wyjściowy

`SiteHeader` linkuje do `/seller`, ale strona została wcześniej usunięta — dziś trafia w `NotFound`. Trzeba ją odbudować od zera, ale wąsko pod ten feature (nie odtwarzamy starych zakładek typu Benchmarks).

## Co budujemy

### 1. Strona `/seller` (panel sprzedawcy, PL)

Layout: `SiteHeader` (bez promo bara) + kontener `max-w-7xl` + nagłówek „Panel sprzedawcy / UrbanEdgePro" + system zakładek `Tabs` z shadcn:
- **Przegląd** — placeholder z 1–2 prostymi KPI z mockowych danych (zamówienia, sprzedaż brutto), żeby strona nie była pusta.
- **Seller Hub Pro** — właściwy feature (patrz niżej).

Desktop-first. Cała kopia po polsku. Waluta: liczby całkowite + `zł`, separator tysięcy = spacja (`12 345 zł`). Helper `formatPLN(value: number): string` w `src/lib/format.ts`.

### 2. Stan `isPro` (mock)

- Hook `useProAccess()` w `src/hooks/use-pro-access.ts`:
  - Czyta/zapisuje `fashionhero.isPro` w `localStorage` (string `"true" | "false"`).
  - Domyślnie `false`.
  - Zwraca `{ isPro, activate(), deactivate() }`.
- `deactivate()` użyte tylko w małym dyskretnym linku „Resetuj demo" pod panelem — żeby łatwo prezentować oba stany.

### 3. Zakładka „Seller Hub Pro" — stan zablokowany (`isPro === false`)

- Pełna zawartość zakładki renderowana, ale przykryta:
  - Tło: rozmyty (`blur-sm`, `pointer-events-none`, `select-none`) podgląd panelu z fixture'ów — sygnał „to dostaniesz".
  - Na wierzchu wycentrowana karta `Card` (shadcn) z:
    - Nagłówkiem „Seller Hub Pro"
    - Krótkim opisem (1 zdanie: „Zobacz swoją realną marżę netto po prowizji, zwrotach i ticketach.")
    - Listą 3 bulletów (marża netto w czasie rzeczywistym, koszty zwrotów, koszty obsługi).
    - Ceną: `39 zł / mies.`
    - Przyciskiem `Button` „Aktywuj Seller Hub Pro".
- Klik przycisku otwiera `Dialog` (shadcn) z potwierdzeniem:
  - Tytuł: „Aktywować Seller Hub Pro?"
  - Treść: cena, info że to demo bez prawdziwej płatności.
  - Akcje: `Button variant="outline"` „Anuluj" + `Button` „Aktywuj".
  - „Aktywuj" → `activate()` + `toast` sukcesu („Seller Hub Pro aktywny") + zamknięcie modala.

### 4. Zakładka „Seller Hub Pro" — stan aktywny (`isPro === true`)

Trzy sekcje, wszystkie zasilone z fixture'ów (patrz §5):

**A. Wiersz KPI (4 karty `Card`, grid `md:grid-cols-4`):**
- Sprzedaż brutto (Σ grossValue)
- Prowizja platformy (Σ grossValue × 0.22) — wyświetlana ze znakiem `−`
- Koszty zwrotów + ticketów (Σ returnShippingCost + Σ ticketHandlingCost) — `−`
- **Marża netto (netMarginContribution)** — wyróżniona (większa typografia, `text-olive`)

Formuła w komentarzu nad obliczeniem dokładnie:
`netMarginContribution = Σ(grossValue × 0.78) - Σ(returnShippingCost) - Σ(ticketHandlingCost)`

**B. Wykres rozkładu marży** (`recharts`, `BarChart` poziomy lub `ComposedChart`):
Pokazuje 4 słupki: Brutto → −Prowizja → −Koszty zwrotów+ticketów → Netto. Kolory z palety `charcoal/olive/sand/warm-gray`. Tooltip w PLN.

**C. Tabela zamówień** (`Table` z shadcn):
Kolumny: ID zamówienia, Wartość brutto, Zwrot (Tak/Nie), Koszt zwrotu, Tickety (szt.), Koszt ticketów, **Wkład w marżę netto**. Stopka z sumami.

Pod sekcją mała notka: „Dane demonstracyjne. Prowizja platformy: 22%. Koszt obsługi 1 ticketu: 5 zł." + dyskretny przycisk-link „Resetuj demo" (`deactivate()`).

### 5. Dane mockowe (`src/data/seller-fixtures.ts`)

```ts
export const TICKET_COST_PLN = 5;
export const COMMISSION_RATE = 0.22;

export type Order = {
  id: string;
  grossValue: number;          // PLN
  returned: boolean;
  returnShippingCost: number;  // PLN
  supportTickets: number;      // szt.
};

export const sellerName = "UrbanEdgePro";

export const orders: Order[] = [
  // Kanoniczny przypadek z kryteriów akceptacji → wkład 385 zł
  { id: "FH-10245", grossValue: 500, returned: false, returnShippingCost: 0, supportTickets: 1 },
  // Dodatkowe zamówienia, żeby panel wyglądał wiarygodnie
  ...
];
```

Funkcje pomocnicze w tym samym pliku:
- `ticketHandlingCost(order) = order.supportTickets * TICKET_COST_PLN`
- `orderNetContribution(order) = order.grossValue * (1 - COMMISSION_RATE) - order.returnShippingCost - ticketHandlingCost(order)`
- `totalNetMargin(orders)` itd.

Wszystkie kwoty w fixture'ach dobrane tak, żeby suma `netMarginContribution` była dodatnią liczbą całkowitą (zgodnie z kryterium akceptacji).

## Zachowanie i zgodność z wytycznymi

- Komponenty: wyłącznie istniejące shadcn (`Tabs`, `Card`, `Button`, `Dialog`, `Table`, `Badge`, `Toaster`/`useToast`) + `recharts` (już w projekcie).
- TypeScript strict, brak `any`.
- Stany: panel ma jasny pusty/zablokowany stan (CTA), aktywny stan zawsze ma dane (bo z fixture'ów). Brak operacji async, więc nie ma stanu loading/error do pokazania.
- Nie zmieniamy `Index.tsx`, `SiteHeader`, routingu poza dodaniem `/seller` z powrotem do `App.tsx`, ani designu storefronu.
- Nie pokazujemy żadnych marż/prowizji kupującym — feature żyje tylko w `/seller`.

## Pliki

**Nowe**
- `src/pages/Seller.tsx` — strona z `Tabs` i obiema zakładkami.
- `src/components/seller/ProGate.tsx` — zablokowany stan + CTA + Dialog aktywacji.
- `src/components/seller/ProDashboard.tsx` — KPI + wykres + tabela.
- `src/hooks/use-pro-access.ts` — hook stanu `isPro` (localStorage).
- `src/data/seller-fixtures.ts` — typy, stałe, mockowe zamówienia, helpery formuł.
- `src/lib/format.ts` — `formatPLN`.

**Edytowane**
- `src/App.tsx` — przywrócenie trasy `<Route path="/seller" element={<Seller />} />` i importu.

Bez zmian w: `index.css`, `tailwind.config.ts`, `SiteHeader`, `Index.tsx`, package.json (żadnych nowych zależności).

## Kryteria akceptacji (mapowanie)

1. ✅ `isPro=false` → panel zablokowany + CTA → modal potwierdzenia (`Dialog`).
2. ✅ Cały UI Seller Hub Pro po polsku, layout desktop-first (grid `md:grid-cols-4`, kontener `max-w-7xl`).
3. ✅ Formuła `netMarginContribution` zaimplementowana 1:1 w `seller-fixtures.ts`; fixture z `UrbanEdgePro / grossValue=500 / supportTickets=1` daje `385`, UI renderuje `385 zł`. Suma po wszystkich zamówieniach również dodatnia liczba całkowita.
