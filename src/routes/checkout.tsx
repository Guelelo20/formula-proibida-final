import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Check, Copy, MessageCircle, UserRound, Phone, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FunnelHeader, FunnelFooter, ProductSummary, StepTitle } from "@/components/funnel-shared";
import { PAYMENT_ENTITY, PAYMENT_REFERENCE, WHATSAPP_URL, formatKz, newOrderCode, orderTotal, pageHead, validCustomer } from "@/lib/funnel";
const checkoutImages = {
  banner: "/images/checkout/WhatsApp_Image_2026-10-14_at_08.38.41_(2).jpeg",
  consultation: "/images/checkout/WhatsApp_Image_2026-10-14_at_08.38.40.jpeg",
  guide: "/images/checkout/WhatsApp_Image_2026-10-14_at_08.38.41.jpeg",
};

export const Route = createFileRoute("/checkout")({
  head: () => pageHead("Checkout — Fórmula Proibida", "Finalize a compra do PDF Fórmula Proibida por 5.900 Kz. Escolha os adicionais opcionais e pague por referência em Angola."),
  component: Checkout,
});

function CopyValue({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setFailed(false);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setFailed(true);
    }
  }

  return <div className="payment-data-row"><div><span>{label}</span><strong>{value}</strong>{failed && <p className="form-note" role="status">Selecione o número para copiar manualmente.</p>}</div><Button variant="copy" size="icon" type="button" onClick={copy} aria-label={copied ? `${label} copiado` : `Copiar ${label.toLowerCase()}`} title={copied ? "Copiado!" : `Copiar ${label.toLowerCase()}`}>{copied ? <Check /> : <Copy />}</Button><span className="sr-only" role="status">{copied ? `${label} copiado` : ""}</span></div>;
}

function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consultation, setConsultation] = useState(false);
  const [guide, setGuide] = useState(false);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const total = orderTotal(consultation, guide);
  const valid = validCustomer(name, phone);
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!valid) return;
    setOrderCode(newOrderCode());
  }
  return <><FunnelHeader /><main className="checkout-main">
    <img className="checkout-banner" src={checkoutImages.banner} alt="Fórmula Proibida — apresentação do produto digital" />
    <ProductSummary />
    <form onSubmit={submit}>
      <section className="checkout-section"><StepTitle number={1}>DADOS PESSOAIS</StepTitle>
        <label className="field-label" htmlFor="customer-name">NOME COMPLETO <span>*</span></label>
        <div className="field-wrap"><UserRound aria-hidden="true" /><input id="customer-name" autoComplete="name" placeholder="Seu nome completo" value={name} onChange={(event) => setName(event.target.value)} required maxLength={120} /></div>
        <label className="field-label" htmlFor="customer-phone">TELEFONE <span>*</span></label>
        <div className="phone-grid"><div className="phone-prefix"><span aria-label="Angola">🇦🇴</span><span>+244</span><small>AO</small></div><div className="field-wrap"><Phone aria-hidden="true" /><input id="customer-phone" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="923 456 789" maxLength={11} value={phone.replace(/(\d{3})(?=\d)/g, "$1 ")} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 9))} required aria-describedby="phone-help" /></div></div>
      </section>
      <section className="checkout-section"><StepTitle number={2}>OFERTAS EXCLUSIVAS</StepTitle>
        <label className="bump-option"><input type="checkbox" checked={consultation} onChange={(event) => setConsultation(event.target.checked)} aria-label="Adicionar Consulta Presencial e Exclusiva Com A Doctora" /><img src={checkoutImages.consultation} alt="Profissional disponível para a consulta" /><span><strong>Consulta Presencial e Exclusiva Com A Doctora</strong><p>Por apenas 5.000 Kz</p><small>Detalhes da consulta: a fornecer.</small></span></label>
        <label className="bump-option"><input type="checkbox" checked={guide} onChange={(event) => setGuide(event.target.checked)} aria-label="Adicionar Guia de Como Fazer Ela Atingir o Orgasmo Em 2 Minutos" /><img src={checkoutImages.guide} alt="Capa do guia adicional" /><span><strong>Guia de Como Fazer Ela Atingir o Orgasmo Em 2 Minutos</strong><p>Por apenas 2.500 Kz</p></span></label>
      </section>
      <section className="checkout-section"><div className="total-row subtotal"><span>Subtotal</span><strong>{formatKz(total)}</strong></div><div className="total-row grand-total" aria-live="polite"><span>TOTAL A PAGAR</span><strong data-testid="checkout-total">{formatKz(total)}</strong></div>
        <Button type="submit" variant="funnel" className="purchase-button" disabled={!valid}><ShieldCheck aria-hidden="true" />FINALIZAR COMPRA</Button>
        <p className="form-note" id="phone-help">Preencha o nome completo e um telefone de 9 dígitos.<br />Depois, confirme para ver os dados de pagamento nesta mesma página.</p>
      </section>
    </form>
    {orderCode && <section className="checkout-section payment-section" aria-live="polite">
      <StepTitle number={3}>CONFIRMAÇÃO DO PEDIDO E PAGAMENTO</StepTitle>
      <div className="payment-method" aria-label="Método selecionado: Pagar por Referência"><div className="payment-method-top"><span className="multicaixa-mark" aria-hidden="true">✺</span><span className="selected" /></div><strong>Pagar por Referência</strong></div>
      <CopyValue label="ENTIDADE" value={PAYMENT_ENTITY} />
      <CopyValue label="REFERÊNCIA" value={PAYMENT_REFERENCE} />
      <CopyValue label="CÓDIGO DO PEDIDO" value={orderCode} />
      <p className="payment-instructions-intro">Faça o pagamento por referência usando a entidade, a referência e o total apresentados acima. Depois, envie o comprovativo pelo WhatsApp.</p>
      <Button variant="funnel" asChild className="payment-whatsapp"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />ENVIAR COMPROVATIVO</a></Button>
      <p className="form-note">WhatsApp: +244 958 958 970<br />Anexe o comprovativo à mensagem e indique o código do pedido.</p>
    </section>}
    <section className="checkout-section checkout-faq"><h2>DÚVIDAS FREQUENTES</h2><h3>Como vou receber o acesso?</h3><p>Depois do pagamento, envie o comprovativo pelo WhatsApp. Solicite o envio da Fórmula Proibida em PDF.</p><h3>Posso escolher apenas o produto?</h3><p>Sim. A consulta e o guia adicional são opcionais e não estão selecionados por padrão.</p><h3>Há uma garantia de reembolso?</h3><p>Política de reembolso: informação a fornecer pelo vendedor. Nenhuma garantia foi confirmada.</p></section>
  </main><FunnelFooter /></>;
}