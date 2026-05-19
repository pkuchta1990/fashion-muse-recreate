import { Search, Heart, User, ShoppingBag, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = ["MEN", "WOMEN", "SALE", "NEW"];

const collectionTiles = [
  { title: "New Arrivals", img: "/images/collection-hero-1.jpg", cta: "SHOP NOW" },
  { title: "Men's", img: "/images/collection-hero-2.jpg", cta: "SHOP MEN" },
  { title: "Women's", img: "/images/collection-hero-1.jpg", cta: "SHOP WOMEN" },
  { title: "Best Sellers", img: "/images/collection-hero-2.jpg", cta: "SHOP NOW" },
];

const products = [
  { tag: "BESTSELLER", name: "Cloud Runner", color: "Jet Black", seller: "UrbanEdgePro", price: "479", img: "/images/product-1.jpg", swatches: ["#1a1a1a", "#ffffff", "#c4b59a"] },
  { tag: "NEW", name: "Trail Pacer", color: "Forest Green", seller: "UrbanEdgePro", price: "559", img: "/images/product-3.jpg", swatches: ["#3d5a3d", "#1a1a1a"] },
  { tag: "NEW", name: "Dash Sport", color: "Storm Blue", seller: "UrbanEdgePro", price: "579", img: "/images/product-6.jpg", swatches: ["#3a4a6b", "#1a1a1a"] },
  { tag: "NEW", name: "Lightweight Jacket", color: "Black", seller: "UrbanEdgePro", price: "509", img: "/images/product-22.jpg", swatches: ["#1a1a1a", "#5c6b4f"] },
  { tag: "NEW", name: "Street Runner X", color: "Triple Black", seller: "UrbanEdgePro", price: "499", img: "/images/product-1.jpg", swatches: ["#1a1a1a"] },
  { tag: "NEW", name: "Stealth Hoodie", color: "Washed Black", seller: "UrbanEdgePro", price: "429", img: "/images/product-20.jpg", swatches: ["#2a2a2a", "#5c5c5c"] },
  { tag: "NEW", name: "Edge Runner Pro", color: "Cement", seller: "UrbanEdgePro", price: "549", img: "/images/product-8.jpg", swatches: ["#a0a0a0", "#1a1a1a"] },
  { tag: "NEW", name: "Cloud Runner", color: "Blush Pink", seller: "Bella DonnaPro", price: "479", img: "/images/product-12.jpg", swatches: ["#f4c2c2", "#ffffff"] },
  { tag: "NEW", name: "Aero Knit", color: "Cloud White", seller: "Bella DonnaPro", price: "519", img: "/images/product-2.jpg", swatches: ["#ffffff", "#f4c2c2"] },
  { tag: "NEW", name: "Silk Touch Flat", color: "Champagne", seller: "Bella DonnaPro", price: "399", img: "/images/product-15.jpg", swatches: ["#e8dfd0", "#1a1a1a"] },
  { tag: "NEW", name: "Ankle Boot", color: "Black", seller: "Bella DonnaPro", price: "549", img: "/images/product-10.jpg", swatches: ["#1a1a1a", "#8b6b4f"] },
  { tag: "NEW", name: "Tote Bag", color: "Natural", seller: "Kasia Creates", price: "139", img: "/images/product-28.jpg", swatches: ["#c4b59a", "#1a1a1a"] },
];

const features = [
  { tag: "DISCOVERY", title: "Thousands Of Sellers, One Search", text: "From top brands to independent designers - find exactly what you're looking for across thousands of curated sellers." },
  { tag: "TRUST", title: "Verified Sellers, Real Reviews", text: "Every seller on FashionHero is vetted. Real customer reviews and our Pro seller program help you shop with confidence." },
  { tag: "VARIETY", title: "From Streetwear To Sustainable", text: "Premium brands, vintage finds, handmade originals, everyday basics. Whatever your style, it's here." },
];

const ghostBtn =
  "inline-flex items-center justify-center px-5 py-2 text-[11px] font-medium uppercase tracking-[0.6px] text-white border border-white rounded-full hover:bg-white hover:text-charcoal transition-all duration-200";

const ProductCard = ({ p }: { p: (typeof products)[number] }) => (
  <div className="group flex-shrink-0 w-[260px] md:w-[300px]">
    <div className="relative overflow-hidden bg-cream aspect-[3/4] mb-3">
      {p.tag && (
        <span className="absolute top-3 left-3 z-10 bg-white text-charcoal text-[10px] font-medium uppercase tracking-[0.6px] px-2 py-1 rounded-full">
          {p.tag}
        </span>
      )}
      <button
        aria-label="Wishlist"
        className="absolute top-3 right-3 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className="h-4 w-4" strokeWidth={1.5} />
      </button>
      <img src={p.img} alt={`${p.name} - ${p.color}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <button className="absolute bottom-0 left-0 right-0 bg-white/95 text-charcoal text-[11px] font-medium uppercase tracking-[0.6px] py-3 opacity-0 group-hover:opacity-100 transition-opacity">
        QUICK VIEW
      </button>
    </div>
    <h3 className="text-[12px] font-medium uppercase tracking-[0.5px] text-charcoal mb-0.5">{p.name}</h3>
    <p className="text-[12px] text-warm-gray mb-0.5">{p.color}</p>
    <p className="text-[11px] text-warm-gray/70 mb-2">
      Sold by <span className="text-charcoal/70">{p.seller}</span>
    </p>
    <div className="flex gap-1.5 mb-1.5">
      {p.swatches.map((s, i) => (
        <span key={i} className="w-3 h-3 rounded-full border border-black/10" style={{ backgroundColor: s }} />
      ))}
    </div>
    <span className="text-[14px] font-medium text-charcoal">{p.price} zl</span>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-charcoal font-sans">
      {/* Top promo bar */}
      <div className="bg-charcoal text-white text-center" style={{ height: 36, lineHeight: "36px" }}>
        <p className="text-[11px] font-medium tracking-wide">Free Shipping on Orders over 299 zl - Easy Returns.</p>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-black/5">
        <div className="flex items-center justify-between px-6 md:px-12 h-16">
          <a href="/" className="text-2xl italic font-serif tracking-tight">FashionHero</a>
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href="#" className="text-[12px] font-medium uppercase tracking-[0.8px] text-charcoal hover:text-charcoal/60 transition">
                {l}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-5">
            <a href="#" className="text-[12px] uppercase tracking-[0.6px] hidden md:inline">About</a>
            <button aria-label="Search"><Search className="h-5 w-5" strokeWidth={1.5} /></button>
            <button aria-label="Wishlist"><Heart className="h-5 w-5" strokeWidth={1.5} /></button>
            <button aria-label="Account"><User className="h-5 w-5" strokeWidth={1.5} /></button>
            <button aria-label="Cart"><ShoppingBag className="h-5 w-5" strokeWidth={1.5} /></button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="relative w-full overflow-hidden">
          <div
            className="relative flex items-end px-6 md:px-16 pb-16 md:pb-24"
            style={{ background: "linear-gradient(135deg, #c4b59a 0%, #8a7d6b 40%, #5c6b4f 100%)", minHeight: "70vh" }}
          >
            <img src="/images/hero-1.jpg" alt="Your Style. Their Craft." className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30" />
            <div className="relative z-10 max-w-xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.6px] text-white/70 mb-3">DISCOVER 4,000+ SELLERS</p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-normal tracking-[0.6px] text-white mb-8 leading-tight">
                Your Style. Their Craft.
              </h1>
              <div className="flex gap-3">
                <a className={ghostBtn + " px-6 py-2.5 text-[12px]"} href="#">SHOP MEN</a>
                <a className={ghostBtn + " px-6 py-2.5 text-[12px]"} href="#">SHOP WOMEN</a>
              </div>
            </div>
            {/* slider dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`w-2 h-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/40"}`} />
              ))}
            </div>
          </div>
        </section>

        {/* Collection tiles */}
        <section className="bg-cream px-4 md:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {collectionTiles.map((c) => (
              <a key={c.title} href="#" className="relative group overflow-hidden aspect-[3/4]">
                <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex flex-col items-center justify-end p-6 z-10 text-center">
                  <h3 className="text-lg md:text-xl font-normal text-white mb-3 tracking-wide">{c.title}</h3>
                  <span className={ghostBtn}>{c.cta}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Our Favorites */}
        <section className="px-4 md:px-8 lg:px-12 py-14">
          <h2 className="text-[40px] font-normal text-charcoal text-center mb-4 leading-tight">Our Favorites</h2>
          <div className="flex justify-center gap-8 mb-8 text-[12px] uppercase tracking-[0.8px]">
            <button className="border-b-2 border-charcoal pb-1 font-medium">NEW ARRIVALS</button>
            <button className="text-warm-gray hover:text-charcoal transition">BEST SELLERS</button>
          </div>
          <div className="relative">
            <button aria-label="Scroll left" className="absolute left-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {products.map((p, i) => (
                <div key={i} className="snap-start"><ProductCard p={p} /></div>
              ))}
            </div>
            <button aria-label="Scroll right" className="absolute right-2 top-1/3 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-sm hidden md:flex">
              <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </section>

        {/* Your Easy, Breezy MVP */}
        <section className="px-4 md:px-8 lg:px-12 py-10">
          <h2 className="text-[40px] font-normal text-charcoal text-center mb-10 leading-tight">Your Easy, Breezy MVP</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { eyebrow: "NATURALLY EASY", title: "Cloud Runner", text: "Our lightest shoe ever. Knit from recycled materials for all-day ease.", img: "/images/product-9.jpg", bg: "linear-gradient(160deg, #8a7d6b 0%, #c4b59a 40%, #e8dfd0 100%)" },
              { eyebrow: "LIGHT ON YOUR FEET", title: "Breeze Slip-On", text: "Slip in and go. Eucalyptus fiber keeps things cool, naturally.", img: "/images/product-15.jpg", bg: "linear-gradient(160deg, #5c6b4f 0%, #8a9a7a 40%, #c5cfbb 100%)" },
            ].map((c) => (
              <div key={c.title} className="relative overflow-hidden group" style={{ background: c.bg, minHeight: 520 }}>
                <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                  <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-white/70 mb-2">{c.eyebrow}</p>
                  <h3 className="text-2xl font-normal text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/80 mb-6 max-w-xs leading-relaxed">{c.text}</p>
                  <a className={ghostBtn} href="#">EXPLORE MORE</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Three column gradient cards */}
        <section className="px-4 md:px-8 lg:px-12 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Trail Collection", img: "/images/product-3.jpg", bg: "linear-gradient(170deg, #3d5a3d 0%, #5c7a5c 40%, #8a9a7a 100%)" },
              { title: "Everyday Essentials", img: "/images/product-4.jpg", bg: "linear-gradient(170deg, #8a7d6b 0%, #c4b59a 40%, #e8dfd0 100%)" },
              { title: "Sale", img: "/images/product-7.jpg", bg: "linear-gradient(170deg, #6b3d3d 0%, #8a5c5c 40%, #c49a9a 100%)" },
            ].map((c) => (
              <div key={c.title} className="relative overflow-hidden group" style={{ background: c.bg, aspectRatio: "3 / 4" }}>
                <img src={c.img} alt={c.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-center">
                  <h3 className="text-xl font-normal text-white mb-4 tracking-wide">{c.title}</h3>
                  <div className="flex gap-3 justify-center">
                    <a className={ghostBtn} href="#">SHOP MEN</a>
                    <a className={ghostBtn} href="#">SHOP WOMEN</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seller Hub Pro CTA */}
        <section className="px-4 md:px-8 lg:px-12 py-10">
          <div className="relative overflow-hidden bg-charcoal text-white px-8 md:px-14 py-12 md:py-16 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-white/60 mb-3 flex items-center gap-2">
                <BarChart3 className="h-3.5 w-3.5" strokeWidth={1.5} /> Dla sprzedawców
              </p>
              <h3 className="text-2xl md:text-3xl font-normal mb-3 leading-tight">Seller Hub Pro — poznaj swoją realną marżę</h3>
              <p className="text-sm text-white/70 leading-relaxed max-w-xl">
                Zwroty, tickety i prowizja w jednym miejscu. Sprawdź, ile naprawdę zarabiasz na FashionHero.
              </p>
            </div>
            <Link
              to="/seller?tab=pro"
              className="inline-flex items-center justify-center px-6 py-3 text-[12px] font-medium uppercase tracking-[0.6px] text-charcoal bg-white rounded-full hover:bg-white/90 transition shrink-0"
            >
              Otwórz Seller Hub Pro
            </Link>
          </div>
        </section>



        {/* Features (3 column text) */}
        <section className="bg-cream px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {features.map((f) => (
              <div key={f.tag}>
                <p className="text-[11px] font-medium uppercase tracking-[0.8px] text-warm-gray mb-3">{f.tag}</p>
                <h3 className="text-2xl font-normal text-charcoal mb-3 leading-tight">{f.title}</h3>
                <p className="text-sm text-warm-gray leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
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
            { title: "Company", links: ["About", "Sellers", "Careers", "Press"] },
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
    </div>
  );
};

export default Index;
