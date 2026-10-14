import { Globe, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function FunnelHeader() {
  return <header className="funnel-header"><div className="funnel-header-inner">
    <div className="header-secure"><ShieldCheck aria-hidden="true" /><span>FINALIZE A SUA COMPRA</span></div>
    <nav className="funnel-nav" aria-label="Navegação do funil"><Link to="/">Início</Link><Link to="/checkout">Checkout</Link></nav>
    <div className="header-country"><Globe aria-hidden="true" /><span>AO Angola</span></div>
  </div></header>;
}
export function FunnelFooter() {
  return <footer className="funnel-footer">Fórmula Proibida · Produto digital em PDF · Angola<br />Conteúdo para maiores de 18 anos. Resultados variam de pessoa para pessoa.</footer>;
}
export function StepTitle({ number, children }: { number: number; children: ReactNode }) {
  return <h2 className="section-title"><span className="section-step">{number}</span>{children}</h2>;
}
export function ProductSummary() {
  return <section className="checkout-section"><p className="eyebrow">VOCÊ ESTÁ ADQUIRINDO:</p>
    <div className="product-summary"><img src="/images/checkout/WhatsApp_Image_2026-10-14_at_08.38.41_(1).jpeg" alt="Fórmula Proibida" /><div>
      <h1>FÓRMULA PROIBIDA</h1><p>Produto digital em PDF com orientações sobre bem-estar e intimidade. Conteúdo destinado a adultos.</p><p className="price">5.900 Kz</p>
    </div></div>
  </section>;
}