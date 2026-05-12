export const TICKET_COST_PLN = 5;
export const COMMISSION_RATE = 0.22;
export const PRO_PRICE_PLN = 39;

export type Order = {
  id: string;
  grossValue: number;
  returned: boolean;
  returnShippingCost: number;
  supportTickets: number;
};

export const sellerName = "UrbanEdgePro";

export const orders: Order[] = [
  // Kanoniczny przypadek z kryteriów akceptacji → wkład 385 zł
  { id: "FH-10245", grossValue: 500, returned: false, returnShippingCost: 0, supportTickets: 1 },
  { id: "FH-10246", grossValue: 1200, returned: false, returnShippingCost: 0, supportTickets: 0 },
  { id: "FH-10247", grossValue: 800, returned: true, returnShippingCost: 25, supportTickets: 2 },
  { id: "FH-10248", grossValue: 2400, returned: false, returnShippingCost: 0, supportTickets: 1 },
  { id: "FH-10249", grossValue: 600, returned: false, returnShippingCost: 0, supportTickets: 0 },
  { id: "FH-10250", grossValue: 1500, returned: true, returnShippingCost: 25, supportTickets: 3 },
  { id: "FH-10251", grossValue: 950, returned: false, returnShippingCost: 0, supportTickets: 0 },
  { id: "FH-10252", grossValue: 3200, returned: false, returnShippingCost: 0, supportTickets: 1 },
  { id: "FH-10253", grossValue: 700, returned: false, returnShippingCost: 0, supportTickets: 0 },
  { id: "FH-10254", grossValue: 1100, returned: true, returnShippingCost: 25, supportTickets: 2 },
];

export const ticketHandlingCost = (o: Order): number => o.supportTickets * TICKET_COST_PLN;

export const orderNetContribution = (o: Order): number =>
  o.grossValue * (1 - COMMISSION_RATE) - o.returnShippingCost - ticketHandlingCost(o);

export const totalGross = (list: Order[]): number =>
  list.reduce((sum, o) => sum + o.grossValue, 0);

export const totalCommission = (list: Order[]): number =>
  list.reduce((sum, o) => sum + o.grossValue * COMMISSION_RATE, 0);

export const totalReturnCost = (list: Order[]): number =>
  list.reduce((sum, o) => sum + o.returnShippingCost, 0);

export const totalTicketCost = (list: Order[]): number =>
  list.reduce((sum, o) => sum + ticketHandlingCost(o), 0);

// netMarginContribution = Σ(grossValue × 0.78) - Σ(returnShippingCost) - Σ(ticketHandlingCost)
export const totalNetMargin = (list: Order[]): number =>
  list.reduce((sum, o) => sum + orderNetContribution(o), 0);
