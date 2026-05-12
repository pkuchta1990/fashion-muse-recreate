import { useState } from "react";
import { Lock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { ProDashboard } from "./ProDashboard";
import { PRO_PRICE_PLN } from "@/data/seller-fixtures";

type Props = { onActivate: () => void };

const benefits = [
  "Marża netto w czasie rzeczywistym",
  "Realne koszty zwrotów uwzględnione w wyniku",
  "Koszty obsługi ticketów wliczone w marżę",
];

export const ProGate = ({ onActivate }: Props) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleActivate = () => {
    onActivate();
    setOpen(false);
    toast({ title: "Seller Hub Pro aktywny", description: "Masz dostęp do panelu marży netto." });
  };

  return (
    <div className="relative">
      {/* Blurred preview */}
      <div className="blur-sm pointer-events-none select-none opacity-60" aria-hidden>
        <ProDashboard preview />
      </div>

      {/* Overlay CTA */}
      <div className="absolute inset-0 flex items-start justify-center pt-16">
        <Card className="w-full max-w-md border-charcoal/10 shadow-lg bg-cream">
          <CardContent className="pt-8 pb-8 px-8">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="h-4 w-4 text-warm-gray" strokeWidth={1.5} />
              <span className="text-[11px] uppercase tracking-[0.8px] text-warm-gray font-medium">
                Funkcja premium
              </span>
            </div>
            <h2 className="text-2xl font-normal text-charcoal mb-2">Seller Hub Pro</h2>
            <p className="text-sm text-warm-gray mb-5 leading-relaxed">
              Zobacz swoją realną marżę netto po prowizji, zwrotach i ticketach.
            </p>
            <ul className="space-y-2 mb-6">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-charcoal">
                  <Check className="h-4 w-4 text-olive mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-3xl font-medium text-charcoal">{PRO_PRICE_PLN} zł</span>
              <span className="text-sm text-warm-gray">/ mies.</span>
            </div>
            <Button onClick={() => setOpen(true)} className="w-full bg-charcoal hover:bg-charcoal/90 text-white">
              Aktywuj Seller Hub Pro
            </Button>
          </CardContent>
        </Card>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Aktywować Seller Hub Pro?</DialogTitle>
            <DialogDescription>
              Subskrypcja {PRO_PRICE_PLN} zł / mies. To wersja demonstracyjna — nie zostanie pobrana żadna płatność.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Anuluj
            </Button>
            <Button onClick={handleActivate} className="bg-charcoal hover:bg-charcoal/90 text-white">
              Aktywuj
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
