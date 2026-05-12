import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatPLN } from "@/lib/format";
import {
  orders,
  orderNetContribution,
  ticketHandlingCost,
  totalCommission,
  totalGross,
  totalNetMargin,
  totalReturnCost,
  totalTicketCost,
  COMMISSION_RATE,
  TICKET_COST_PLN,
} from "@/data/seller-fixtures";

type Props = { onReset?: () => void; preview?: boolean };

export const ProDashboard = ({ onReset, preview = false }: Props) => {
  const gross = totalGross(orders);
  const commission = totalCommission(orders);
  const returnCost = totalReturnCost(orders);
  const ticketCost = totalTicketCost(orders);
  const netMargin = totalNetMargin(orders);

  const chartData = [
    { name: "Brutto", value: Math.round(gross), fill: "hsl(var(--charcoal))" },
    { name: "− Prowizja", value: Math.round(commission), fill: "hsl(var(--warm-gray))" },
    { name: "− Zwroty + tickety", value: Math.round(returnCost + ticketCost), fill: "hsl(var(--sand))" },
    { name: "Marża netto", value: Math.round(netMargin), fill: "hsl(var(--olive))" },
  ];

  return (
    <div className="space-y-6">
      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard label="Sprzedaż brutto" value={formatPLN(gross)} />
        <KpiCard label={`Prowizja platformy (${Math.round(COMMISSION_RATE * 100)}%)`} value={`− ${formatPLN(commission)}`} muted />
        <KpiCard label="Koszty zwrotów + ticketów" value={`− ${formatPLN(returnCost + ticketCost)}`} muted />
        <KpiCard label="Marża netto" value={formatPLN(netMargin)} highlight />
      </div>

      {/* Chart */}
      <Card className="border-charcoal/10">
        <CardHeader>
          <CardTitle className="text-base font-medium">Rozkład marży netto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 8, right: 16, left: 0, bottom: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--charcoal) / 0.08)" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(var(--charcoal))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--warm-gray))" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => formatPLN(v)} width={90} />
                <Tooltip
                  cursor={{ fill: "hsl(var(--charcoal) / 0.04)" }}
                  formatter={(v: number) => formatPLN(v)}
                  contentStyle={{ borderRadius: 8, border: "1px solid hsl(var(--charcoal) / 0.1)", fontSize: 12 }}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {chartData.map((d, i) => (
                    <Cell key={i} fill={d.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-charcoal/10">
        <CardHeader>
          <CardTitle className="text-base font-medium">Zamówienia</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID zamówienia</TableHead>
                <TableHead className="text-right">Brutto</TableHead>
                <TableHead className="text-center">Zwrot</TableHead>
                <TableHead className="text-right">Koszt zwrotu</TableHead>
                <TableHead className="text-center">Tickety</TableHead>
                <TableHead className="text-right">Koszt ticketów</TableHead>
                <TableHead className="text-right">Wkład w marżę netto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">{o.id}</TableCell>
                  <TableCell className="text-right">{formatPLN(o.grossValue)}</TableCell>
                  <TableCell className="text-center">
                    {o.returned ? (
                      <Badge variant="secondary" className="text-[10px]">Tak</Badge>
                    ) : (
                      <span className="text-warm-gray text-xs">Nie</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">{formatPLN(o.returnShippingCost)}</TableCell>
                  <TableCell className="text-center">{o.supportTickets}</TableCell>
                  <TableCell className="text-right">{formatPLN(ticketHandlingCost(o))}</TableCell>
                  <TableCell className="text-right font-medium text-olive">{formatPLN(orderNetContribution(o))}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell className="font-medium">Razem</TableCell>
                <TableCell className="text-right font-medium">{formatPLN(gross)}</TableCell>
                <TableCell />
                <TableCell className="text-right font-medium">{formatPLN(returnCost)}</TableCell>
                <TableCell />
                <TableCell className="text-right font-medium">{formatPLN(ticketCost)}</TableCell>
                <TableCell className="text-right font-medium text-olive">{formatPLN(netMargin)}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between text-xs text-warm-gray pt-2">
        <p>
          Dane demonstracyjne. Prowizja platformy: {Math.round(COMMISSION_RATE * 100)}%. Koszt obsługi 1 ticketu: {TICKET_COST_PLN} zł.
        </p>
        {!preview && onReset && (
          <button onClick={onReset} className="underline underline-offset-2 hover:text-charcoal transition">
            Resetuj demo
          </button>
        )}
      </div>
    </div>
  );
};

const KpiCard = ({ label, value, highlight, muted }: { label: string; value: string; highlight?: boolean; muted?: boolean }) => (
  <Card className="border-charcoal/10">
    <CardContent className="pt-6">
      <p className="text-[11px] uppercase tracking-[0.6px] text-warm-gray mb-2">{label}</p>
      <p
        className={
          highlight
            ? "text-3xl font-medium text-olive"
            : muted
            ? "text-2xl font-normal text-charcoal/70"
            : "text-2xl font-medium text-charcoal"
        }
      >
        {value}
      </p>
    </CardContent>
  </Card>
);
