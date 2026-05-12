import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = ["MEN", "WOMEN", "SALE", "NEW"];

export const SiteHeader = ({ promo = true }: { promo?: boolean }) => (
  <>
    {promo && (
      <div className="bg-charcoal text-white text-center" style={{ height: 36, lineHeight: "36px" }}>
        <p className="text-[11px] font-medium tracking-wide">
          Free Shipping on Orders over 299 zl - Easy Returns.
        </p>
      </div>
    )}
    <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-black/5">
      <div className="flex items-center justify-between px-6 md:px-12 h-16">
        <Link to="/" className="text-2xl italic font-serif tracking-tight">FashionHero</Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l} href="#" className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal hover:text-charcoal/60 transition">
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <Link to="/seller" className="text-[12px] uppercase tracking-[0.6px] hidden md:inline hover:text-charcoal/60">
            Seller Hub
          </Link>
          <button aria-label="Search"><Search className="h-5 w-5" strokeWidth={1.5} /></button>
          <button aria-label="Wishlist"><Heart className="h-5 w-5" strokeWidth={1.5} /></button>
          <button aria-label="Account"><User className="h-5 w-5" strokeWidth={1.5} /></button>
          <button aria-label="Cart"><ShoppingBag className="h-5 w-5" strokeWidth={1.5} /></button>
        </div>
      </div>
    </header>
  </>
);

export const SiteFooter = () => (
  <footer className="bg-charcoal text-white px-6 md:px-12 py-14">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
      <div className="col-span-2">
        <h3 className="text-2xl italic font-serif mb-3">FashionHero</h3>
        <p className="text-sm text-white/60 max-w-xs leading-relaxed">
          Your style. Their craft. Discover thousands of curated sellers in one place.
        </p>
      </div>
      {[
        { title: "Shop", links: ["Men", "Women", "New Arrivals", "Sale"] },
        { title: "Help", links: ["Contact", "Shipping", "Returns", "FAQ"] },
        { title: "Sellers", links: ["Seller Hub", "Pricing", "Tools", "Support"] },
      ].map((col) => (
        <div key={col.title}>
          <h4 className="text-[12px] font-medium uppercase tracking-[0.8px] mb-4">{col.title}</h4>
          <ul className="space-y-2">
            {col.links.map((l) => (
              <li key={l}><a href="#" className="text-sm text-white/60 hover:text-white transition">{l}</a></li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-6xl mx-auto mt-12 pt-6 border-t border-white/10 text-[11px] text-white/40 uppercase tracking-[0.6px] flex justify-between">
      <span>© {new Date().getFullYear()} FashionHero</span>
      <span>All rights reserved</span>
    </div>
  </footer>
);
