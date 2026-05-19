import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { useProAccess } from "@/hooks/use-pro-access";
import { ProGate } from "@/components/seller/ProGate";
import { ProDashboard } from "@/components/seller/ProDashboard";
import { orders, sellerName, totalGross } from "@/data/seller-fixtures";
import { formatPLN } from "@/lib/format";
import { useSearchParams } from "react-router-dom";

const Seller = () => {
  const { isPro, activate, deactivate } = useProAccess();
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") === "pro" ? "pro" : "overview";

  return (
    <div className="min-h-screen flex flex-col bg-background text-charcoal font-sans">
      <SiteHeader promo={false} />

      <main className="flex-1 px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <p className="text-[11px] uppercase tracking-[0.8px] text-warm-gray mb-1">Panel sprzedawcy</p>
            <h1 className="text-3xl font-normal text-charcoal">{sellerName}</h1>
          </header>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Przegląd</TabsTrigger>
              <TabsTrigger value="pro">Seller Hub Pro</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-charcoal/10">
                  <CardContent className="pt-6">
                    <p className="text-[11px] uppercase tracking-[0.6px] text-warm-gray mb-2">Zamówienia</p>
                    <p className="text-2xl font-medium">{orders.length}</p>
                  </CardContent>
                </Card>
                <Card className="border-charcoal/10">
                  <CardContent className="pt-6">
                    <p className="text-[11px] uppercase tracking-[0.6px] text-warm-gray mb-2">Sprzedaż brutto</p>
                    <p className="text-2xl font-medium">{formatPLN(totalGross(orders))}</p>
                  </CardContent>
                </Card>
                <Card className="border-charcoal/10">
                  <CardContent className="pt-6">
                    <p className="text-[11px] uppercase tracking-[0.6px] text-warm-gray mb-2">Status Pro</p>
                    <p className="text-2xl font-medium">{isPro ? "Aktywny" : "Nieaktywny"}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="pro">
              {isPro ? <ProDashboard onReset={deactivate} /> : <ProGate onActivate={activate} />}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Seller;
