import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Copy, MessageCircle, ReceiptText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FunnelHeader, FunnelFooter, StepTitle } from "@/components/funnel-shared";
import { PAYMENT_ENTITY, PAYMENT_REFERENCE, WHATSAPP_URL, formatKz, orderTotal, pageHead, parseOrderSearch } from "@/lib/funnel";

export const Route = createFileRoute("/pagamento")({
  validateSearch: parseOrderSearch,
  head: () => pageHead("Instruções de pagamento — Fórmula Proibida", "Pague a Fórmula Proibida por referência e envie o comprovativo pelo WhatsApp para solicitar o seu PDF."),
  component: Payment,
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
    } catch { setFailed(true); }
  }
  return <div className="payment-data-row"><div><span>{label}</span><strong>{value}</strong>{failed && <p className="form-note" role="status">Selecione o número para copiar manualmente.</p>}</div><Button variant="copy" size="icon" type="button" onClick={copy} aria-label={copied ? `${label} copiado` : `Copiar ${label.toLowerCase()}`} title={copied ? "Copiado!" : `Copiar ${label.toLowerCase()}`}>{copied ? <Check /> : <Copy />}</Button><span className="sr-only" role="status">{copied ? `${label} copiado` : ""}</span></div>;
}
function Payment() {
  const { consulta, guia, pedido } = Route.useSearch();
  const total = orderTotal(consulta, guia);
  return <><FunnelHeader /><main className="checkout-main">
    <header className="payment-heading"><div className="payment-icon"><ReceiptText aria-hidden="true" /></div><h1>Conclua o seu pagamento</h1><p>Utilize os dados abaixo para pagar por referência.<br />O pagamento ainda não foi confirmado.</p></header>
    <section className="checkout-section"><StepTitle number={1}>DADOS PARA PAGAMENTO</StepTitle><CopyValue label="ENTIDADE" value={PAYMENT_ENTITY} /><CopyValue label="REFERÊNCIA" value={PAYMENT_REFERENCE} />{pedido ? <CopyValue label="CÓDIGO DO PEDIDO" value={pedido} /> : <div className="payment-data-row"><div><span>CÓDIGO DO PEDIDO</span><strong>Por gerar no checkout</strong></div></div>}</section>
    <section className="checkout-section"><p className="eyebrow">RESUMO DO PEDIDO</p><div className="total-row subtotal"><span>Fórmula Proibida</span><strong>5.900 Kz</strong></div>{consulta && <div className="total-row mt-5"><span>Consulta</span><strong>5.000 Kz</strong></div>}{guia && <div className="total-row mt-5"><span>Guia adicional</span><strong>2.500 Kz</strong></div>}<div className="total-row grand-total mb-0" aria-live="polite"><span>TOTAL DO PEDIDO</span><strong data-testid="payment-total">{formatKz(total)}</strong></div></section>
    <section className="checkout-section"><StepTitle number={2}>ENVIE O COMPROVATIVO</StepTitle><ol className="payment-instructions"><li>Faça o pagamento por referência com a entidade, referência e total apresentados.</li><li>Guarde o comprovativo do pagamento.</li><li>Envie o comprovativo pelo WhatsApp e indique o código do pedido para solicitar o PDF.</li></ol><Button variant="funnel" asChild className="payment-whatsapp"><a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"><MessageCircle aria-hidden="true" />ENVIAR COMPROVATIVO</a></Button><p className="form-note">WhatsApp: +244 958 958 970<br />Anexe o comprovativo à mensagem antes de enviar.</p></section>
    <Link to="/checkout" className="back-link"><ArrowLeft size={16} />Voltar ao checkout</Link>
  </main><FunnelFooter /></>;
}