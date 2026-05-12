import { useState } from "react";
import {
  TrendingUp, TrendingDown, Package, RotateCcw, DollarSign, Users,
  Headphones, MessageCircle, Phone, Mail, CheckCircle2, AlertCircle, Crown,
  Briefcase, Tag, Gem, Sparkles,
} from "lucide-react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, Legend,
} from "recharts";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";

// ---------- Mock data ----------
const kpis = [
  { label: "Revenue (30d)", value: "84 920 zł", delta: "+12.4%", up: true, icon: DollarSign },
  { label: "Orders", value: "1 284", delta: "+6.1%", up: true, icon: Package },
  { label: "Return rate", value: "8.2%", delta: "-1.7pp", up: true, icon: RotateCcw },
  { label: "Conversion", value: "3.4%", delta: "+0.3pp", up: true, icon: Users },
];

const revenueData = [
  { d: "W1", you: 14200, cat: 12800 },
  { d: "W2", you: 16800, cat: 13400 },
  { d: "W3", you: 19500, cat: 14100 },
  { d: "W4", you: 22400, cat: 15200 },
  { d: "W5", you: 21100, cat: 15800 },
  { d: "W6", you: 24800, cat: 16100 },
];

const returnsBreakdown = [
  { reason: "Size too small", you: 38, cat: 31 },
  { reason: "Size too large", you: 22, cat: 26 },
  { reason: "Quality", you: 9, cat: 14 },
  { reason: "Not as pictured", you: 12, cat: 17 },
  { reason: "Changed mind", you: 19, cat: 12 },
];

const benchmarks = [
  { label: "Avg. order value", you: "412 zł", cat: "356 zł", better: true },
  { label: "Return rate", you: "8.2%", cat: "11.4%", better: true },
  { label: "Time to ship", you: "1.4 d", cat: "2.1 d", better: true },
  { label: "Repeat customers", you: "22%", cat: "29%", better: false },
  { label: "Review score", you: "4.7", cat: "4.4", better: true },
];

const customerSegments = [
  {
    name: "Pracujące kobiety",
    blurb: "27–38 lat, regularne zakupy do pracy i na wyjścia.",
    share: 35, salesShare: 48, returnRate: 12,
    icon: Briefcase,
  },
  {
    name: "Łowczynie okazji",
    blurb: "Wrażliwe cenowo, kupują głównie na promocjach.",
    share: 25, salesShare: 18, returnRate: 34,
    icon: Tag,
  },
  {
    name: "Świadome Premium",
    blurb: "Rzadziej, ale drożej — szukają unikalnych marek.",
    share: 15, salesShare: 26, returnRate: 6,
    icon: Gem,
  },
  {
    name: "Młode, trend-driven",
    blurb: "18–26 lat, inspiracje z Instagrama i TikToka.",
    share: 10, salesShare: 8, returnRate: 28,
    icon: Sparkles,
  },
];

const segmentDistribution = [{
  name: "Customers",
  "Pracujące kobiety": 35,
  "Łowczynie okazji": 25,
  "Świadome Premium": 15,
  "Młode, trend-driven": 10,
  "Pozostali": 15,
}];

const returnsQueue = [
  { id: "RT-2841", product: "Cloud Runner — Jet Black", reason: "Size too small", days: 1, status: "new" },
  { id: "RT-2839", product: "Stealth Hoodie — Washed Black", reason: "Quality", days: 2, status: "review" },
  { id: "RT-2832", product: "Trail Pacer — Forest Green", reason: "Changed mind", days: 3, status: "new" },
  { id: "RT-2828", product: "Aero Knit — Cloud White", reason: "Not as pictured", days: 4, status: "approved" },
  { id: "RT-2820", product: "Tote Bag — Natural", reason: "Size too large", days: 5, status: "review" },
];

const statusStyles: Record<string, string> = {
  new: "bg-charcoal text-white",
  review: "bg-sand/40 text-charcoal",
  approved: "bg-olive/20 text-olive",
};

const tiers = [
  {
    name: "Starter", price: "0", per: "/mo", note: "Standard commission only",
    features: ["Basic dashboard", "Up to 50 listings", "Community support", "Standard returns flow"],
    cta: "Current plan", highlight: false,
  },
  {
    name: "Pro", price: "149", per: "/mo", note: "For growing sellers",
    features: ["Advanced analytics", "Unlimited listings", "Priority email support", "Returns automation", "Category benchmarks"],
    cta: "Upgrade to Pro", highlight: true,
  },
  {
    name: "Elite", price: "399", per: "/mo", note: "For top performers",
    features: ["Everything in Pro", "Dedicated account manager", "1h priority support SLA", "Custom benchmarks & reports", "Early access to features"],
    cta: "Talk to sales", highlight: false,
  },
];

// ---------- UI helpers ----------
const SectionTitle = ({ tag, title, sub }: { tag: string; title: string; sub?: string }) => (
  <div className="mb-6">
    <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray mb-2">{tag}</p>
    <h2 className="text-2xl md:text-3xl font-normal text-charcoal leading-tight">{title}</h2>
    {sub && <p className="text-sm text-warm-gray mt-2 max-w-2xl">{sub}</p>}
  </div>
);

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-white border border-black/5 rounded-xl ${className}`}>{children}</div>
);

// ---------- Page ----------
const Seller = () => {
  const [tab, setTab] = useState<"overview" | "returns" | "benchmarks" | "support">("overview");

  return (
    <div className="min-h-screen flex flex-col bg-cream text-charcoal font-sans">
      <SiteHeader />

      {/* Sub-hero / Seller bar */}
      <section className="bg-charcoal text-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-white/60 mb-3">Seller Hub · Pro</p>
            <h1 className="text-3xl md:text-5xl font-normal tracking-[0.5px] leading-tight">
              Run your store like a brand.
            </h1>
            <p className="text-sm md:text-base text-white/70 mt-3 max-w-xl">
              Statistics, returns tools, category benchmarks and priority support — built for FashionHero sellers.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.8px] text-white/70 border border-white/20 rounded-full px-3 py-1.5">
              <Crown className="h-3.5 w-3.5" /> Pro plan
            </span>
            <Button
              variant="outline"
              className="bg-transparent text-white border-white hover:bg-white hover:text-charcoal rounded-full uppercase tracking-[0.6px] text-[11px] h-9 px-5"
              onClick={() => setTab("overview")}
            >
              Manage subscription
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="border-b border-black/5 bg-background sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex gap-6 overflow-x-auto scrollbar-hide">
          {([
            ["overview", "Overview"],
            ["returns", "Returns"],
            ["benchmarks", "Benchmarks"],
            ["support", "Priority support"],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`relative py-4 text-[12px] font-medium uppercase tracking-[0.8px] transition ${
                tab === key ? "text-charcoal" : "text-warm-gray hover:text-charcoal"
              }`}
            >
              {label}
              {tab === key && <span className="absolute left-0 right-0 -bottom-px h-[2px] bg-charcoal" />}
            </button>
          ))}
        </div>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-12 py-10 md:py-14">
        {tab === "overview" && (
          <>
            <SectionTitle tag="Dashboard" title="Performance overview" sub="Last 30 days vs your category average across FashionHero." />
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {kpis.map((k) => {
                const Icon = k.icon;
                return (
                  <Card key={k.label} className="p-5">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] uppercase tracking-[0.8px] text-warm-gray">{k.label}</span>
                      <Icon className="h-4 w-4 text-warm-gray" strokeWidth={1.5} />
                    </div>
                    <div className="text-2xl font-normal mb-1">{k.value}</div>
                    <div className={`inline-flex items-center gap-1 text-[11px] ${k.up ? "text-olive" : "text-destructive"}`}>
                      {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {k.delta} vs prev.
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-base font-medium">Revenue vs category avg.</h3>
                  <span className="text-[11px] uppercase tracking-[0.8px] text-warm-gray">PLN</span>
                </div>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="d" stroke="hsl(var(--warm-gray))" fontSize={11} />
                      <YAxis stroke="hsl(var(--warm-gray))" fontSize={11} />
                      <Tooltip contentStyle={{ background: "hsl(var(--charcoal))", border: "none", color: "white", fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 }} />
                      <Line type="monotone" dataKey="you" name="You" stroke="hsl(var(--charcoal))" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="cat" name="Category avg." stroke="hsl(var(--sand))" strokeWidth={2} strokeDasharray="4 4" dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-5">
                <h3 className="text-base font-medium mb-4">Return reasons</h3>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={returnsBreakdown} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                      <XAxis type="number" stroke="hsl(var(--warm-gray))" fontSize={11} />
                      <YAxis type="category" dataKey="reason" stroke="hsl(var(--warm-gray))" fontSize={10} width={110} />
                      <Tooltip contentStyle={{ background: "hsl(var(--charcoal))", border: "none", color: "white", fontSize: 12 }} />
                      <Bar dataKey="you" name="You" fill="hsl(var(--charcoal))" radius={[0, 3, 3, 0]} />
                      <Bar dataKey="cat" name="Category" fill="hsl(var(--sand))" radius={[0, 3, 3, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>

            {/* Pricing */}
            <div className="mt-16">
              <SectionTitle tag="Subscription" title="Choose the plan that fits your store" sub="Predictable monthly pricing — independent of your sales volume." />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {tiers.map((t) => (
                  <Card
                    key={t.name}
                    className={`p-6 flex flex-col ${t.highlight ? "border-charcoal ring-1 ring-charcoal" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-medium">{t.name}</h3>
                      {t.highlight && (
                        <span className="text-[10px] uppercase tracking-[0.8px] bg-charcoal text-white rounded-full px-2 py-0.5">
                          Most popular
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] text-warm-gray mb-5">{t.note}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-normal">{t.price} zł</span>
                      <span className="text-sm text-warm-gray">{t.per}</span>
                    </div>
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-charcoal/80">
                          <CheckCircle2 className="h-4 w-4 text-olive mt-0.5 shrink-0" strokeWidth={1.8} />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`rounded-full uppercase tracking-[0.6px] text-[11px] h-10 ${
                        t.highlight ? "bg-charcoal hover:bg-charcoal/90 text-white" : "bg-cream text-charcoal hover:bg-sand/40"
                      }`}
                    >
                      {t.cta}
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {tab === "returns" && (
          <>
            <SectionTitle tag="Returns" title="Manage open return requests" sub="Approve, request review, or refund — all in one queue." />
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-[11px] uppercase tracking-[0.8px] text-warm-gray">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium">Return ID</th>
                    <th className="text-left px-5 py-3 font-medium">Product</th>
                    <th className="text-left px-5 py-3 font-medium">Reason</th>
                    <th className="text-left px-5 py-3 font-medium">Age</th>
                    <th className="text-left px-5 py-3 font-medium">Status</th>
                    <th className="text-right px-5 py-3 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {returnsQueue.map((r) => (
                    <tr key={r.id} className="border-t border-black/5 hover:bg-cream/60 transition">
                      <td className="px-5 py-4 font-medium">{r.id}</td>
                      <td className="px-5 py-4">{r.product}</td>
                      <td className="px-5 py-4 text-warm-gray">{r.reason}</td>
                      <td className="px-5 py-4 text-warm-gray">{r.days}d</td>
                      <td className="px-5 py-4">
                        <span className={`text-[10px] uppercase tracking-[0.8px] rounded-full px-2.5 py-1 ${statusStyles[r.status]}`}>
                          {r.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button className="text-[11px] uppercase tracking-[0.6px] underline underline-offset-4 hover:text-warm-gray">
                          Open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-5">
                <p className="text-[11px] uppercase tracking-[0.8px] text-warm-gray mb-2">Open returns</p>
                <div className="text-2xl">17</div>
              </Card>
              <Card className="p-5">
                <p className="text-[11px] uppercase tracking-[0.8px] text-warm-gray mb-2">Avg. resolution time</p>
                <div className="text-2xl">1.8 d</div>
              </Card>
              <Card className="p-5 flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-sand" />
                <div>
                  <p className="text-[11px] uppercase tracking-[0.8px] text-warm-gray mb-1">Tip</p>
                  <p className="text-sm text-charcoal/80">3 listings drive 41% of returns. <a href="#" className="underline">Review them</a>.</p>
                </div>
              </Card>
            </div>
          </>
        )}

        {tab === "benchmarks" && (
          <>
            <SectionTitle tag="Benchmarks" title="How you compare in your category" sub="Anonymous medians from the “Footwear & Apparel” category over the last 30 days." />
            <Card className="overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-cream text-[11px] uppercase tracking-[0.8px] text-warm-gray">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium">Metric</th>
                    <th className="text-left px-5 py-3 font-medium">You</th>
                    <th className="text-left px-5 py-3 font-medium">Category avg.</th>
                    <th className="text-right px-5 py-3 font-medium">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((b) => (
                    <tr key={b.label} className="border-t border-black/5">
                      <td className="px-5 py-4">{b.label}</td>
                      <td className="px-5 py-4 font-medium">{b.you}</td>
                      <td className="px-5 py-4 text-warm-gray">{b.cat}</td>
                      <td className="px-5 py-4 text-right">
                        <span className={`inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.6px] ${b.better ? "text-olive" : "text-destructive"}`}>
                          {b.better ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {b.better ? "Above avg." : "Below avg."}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>

            <div className="mt-12">
              <SectionTitle
                tag="Customer segments"
                title="Kim są Twoi klienci"
                sub="Cztery główne grupy w Twojej bazie — udział w bazie, udział w przychodach i poziom zwrotów."
              />

              <Card className="p-6 mb-6">
                <p className="text-[11px] uppercase tracking-[0.8px] text-warm-gray mb-4">Rozkład bazy klientów</p>
                <ResponsiveContainer width="100%" height={70}>
                  <BarChart data={segmentDistribution} layout="vertical" stackOffset="expand" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                    <XAxis type="number" hide domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip formatter={(v: number) => `${v}%`} />
                    <Bar dataKey="Pracujące kobiety" stackId="a" fill="hsl(var(--charcoal))" />
                    <Bar dataKey="Łowczynie okazji" stackId="a" fill="hsl(var(--olive))" />
                    <Bar dataKey="Świadome Premium" stackId="a" fill="hsl(var(--sand))" />
                    <Bar dataKey="Młode, trend-driven" stackId="a" fill="hsl(var(--warm-gray))" />
                    <Bar dataKey="Pozostali" stackId="a" fill="hsl(var(--charcoal) / 0.15)" />
                  </BarChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3 text-[11px] text-warm-gray">
                  <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-charcoal" />Pracujące kobiety 35%</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-olive" />Łowczynie 25%</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-sand" />Premium 15%</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-warm-gray" />Trend-driven 10%</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block w-2.5 h-2.5 rounded-sm bg-charcoal/15" />Pozostali 15%</span>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customerSegments.map((s) => {
                  const Icon = s.icon;
                  const returnTone =
                    s.returnRate < 10 ? "text-olive" :
                    s.returnRate <= 20 ? "text-sand" : "text-destructive";
                  const barTone =
                    s.returnRate < 10 ? "bg-olive" :
                    s.returnRate <= 20 ? "bg-sand" : "bg-destructive";
                  return (
                    <Card key={s.name} className="p-6">
                      <div className="flex items-start gap-3 mb-5">
                        <div className="h-10 w-10 rounded-full bg-cream flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-charcoal" strokeWidth={1.5} />
                        </div>
                        <div>
                          <h3 className="text-base font-medium leading-tight">{s.name}</h3>
                          <p className="text-[12px] text-warm-gray mt-0.5">{s.blurb}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-black/5">
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.7px] text-warm-gray mb-1">% bazy</p>
                          <p className="text-2xl font-light text-charcoal">{s.share}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.7px] text-warm-gray mb-1">% sprzedaży</p>
                          <p className="text-2xl font-light text-charcoal">{s.salesShare}%</p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.7px] text-warm-gray mb-1">% zwrotów</p>
                          <p className={`text-2xl font-light ${returnTone}`}>{s.returnRate}%</p>
                        </div>
                      </div>

                      <div className="mt-3 h-1 w-full bg-black/5 rounded-full overflow-hidden">
                        <div className={`h-full ${barTone}`} style={{ width: `${Math.min(s.returnRate * 2, 100)}%` }} />
                      </div>
                    </Card>
                  );
                })}
              </div>

              <p className="text-[11px] text-warm-gray mt-4">
                Pozostali klienci: 15% bazy — niesklasyfikowani lub o zbyt małej liczbie zamówień, by przypisać segment.
              </p>
            </div>
          </>
        )}

        {tab === "support" && (
          <>
            <SectionTitle tag="Priority support" title="Talk to a human, fast." sub="Pro & Elite sellers get prioritized response times across all channels." />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                { icon: MessageCircle, label: "Live chat", meta: "Avg. response: 4 min", cta: "Start chat" },
                { icon: Mail, label: "Priority email", meta: "Reply within 1h", cta: "Send email" },
                { icon: Phone, label: "Callback", meta: "Within 30 min", cta: "Request call" },
              ].map((c) => {
                const Icon = c.icon;
                return (
                  <Card key={c.label} className="p-6">
                    <Icon className="h-5 w-5 mb-4 text-charcoal" strokeWidth={1.5} />
                    <h3 className="text-base font-medium mb-1">{c.label}</h3>
                    <p className="text-[12px] text-warm-gray mb-5">{c.meta}</p>
                    <Button className="rounded-full uppercase tracking-[0.6px] text-[11px] h-9 bg-charcoal hover:bg-charcoal/90 text-white">
                      {c.cta}
                    </Button>
                  </Card>
                );
              })}
            </div>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Headphones className="h-6 w-6 text-charcoal mt-1" strokeWidth={1.5} />
                <div className="flex-1">
                  <h3 className="text-base font-medium mb-1">Open a priority ticket</h3>
                  <p className="text-sm text-warm-gray mb-5">Describe your issue and we’ll get back to you within your plan’s SLA.</p>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => e.preventDefault()}>
                    <input className="border border-black/10 rounded-md px-3 py-2.5 text-sm bg-white" placeholder="Subject" />
                    <select className="border border-black/10 rounded-md px-3 py-2.5 text-sm bg-white">
                      <option>Returns & refunds</option>
                      <option>Payouts</option>
                      <option>Listings</option>
                      <option>Other</option>
                    </select>
                    <textarea className="md:col-span-2 border border-black/10 rounded-md px-3 py-2.5 text-sm bg-white min-h-[120px]" placeholder="Describe your issue..." />
                    <div className="md:col-span-2 flex justify-end">
                      <Button className="rounded-full uppercase tracking-[0.6px] text-[11px] h-10 px-6 bg-charcoal hover:bg-charcoal/90 text-white">
                        Submit ticket
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </Card>
          </>
        )}
      </main>

      <SiteFooter />
    </div>
  );
};

export default Seller;
