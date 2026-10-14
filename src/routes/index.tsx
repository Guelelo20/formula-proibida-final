import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, memo } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FunnelFooter } from "@/components/funnel-shared";
import { useDelayedCta } from "@/hooks/use-delayed-cta";
import { formatCountdown, useDemoCountdown } from "@/hooks/use-demo-countdown";
import { pageHead } from "@/lib/funnel";
import joaquim from "@/assets/joaquim-portrait.asset.json";
import adriano from "@/assets/adriano-portrait.asset.json";
import fernando from "@/assets/fernando-portrait.asset.json";
import joao from "@/assets/joao-portrait.asset.json";

const VTURB_PLAYER_ID = "vid-6acf3d7df6a57d8e37bca74a";
const VTURB_SCRIPT_SRC = "https://scripts.converteai.net/91631d8d-48d6-404d-9bf8-651168f7152e/players/6acf3d7df6a57d8e37bca74a/v4/player.js";

const testimonials = [
  { name: "Joaquim António", image: joaquim.url, text: "Estava com receio de adquirir o vosso produto porque já tentei de todo produto que existe para potência. Eu pensei que era mais uma burla, mas depois de fazer o pagamento, recebi o acesso ao truque do Nigeriano pelo meu e-mail de forma instantânea. Já estou usar a duas semanas e os resultados estão sendo incrível na cama com a minha parceira. Até não estou a acreditar que também o meu pénis aumentou de tamanho." },
  { name: "Adriano Miguel", image: adriano.url, text: "A informação chegou rapidamente e consegui começar no mesmo dia. Para mim, a mudança na confiança já valeu muito a pena." },
  { name: "Fernando Luís", image: fernando.url, text: "Eu procurava uma solução natural há bastante tempo. Estou a fazer tudo direitinho e gostei muito do que senti até agora." },
  { name: "João Baptista", image: joao.url, text: "Obrigado pela explicação clara no vídeo. Estou muito mais confiante e a minha esposa também percebeu a diferença." },
];

export const Route = createFileRoute("/")({
  head: () => pageHead("Fórmula Proibida — Conheça o PDF", "Conheça a Fórmula Proibida, um produto digital em PDF para adultos em Angola. Assista à apresentação. 5.900 Kz."),
  component: Index,
});

const VslPlayer = memo(function VslPlayer() {
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) return;
    scriptLoadedRef.current = true;

    const script = document.createElement("script");
    script.src = VTURB_SCRIPT_SRC;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      script.remove();
      scriptLoadedRef.current = false;
    };
  }, []);

  return (
    <div
      className="vsl-wrap"
      dangerouslySetInnerHTML={{
        __html: `<vturb-smartplayer id="${VTURB_PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"><div class="vturb-player-placeholder" style="position: relative; width: 100%; padding: 178.21782178217822% 0 0; z-index: 0; background-color: black;"></div></vturb-smartplayer>`,
      }}
    />
  );
});

const DemoTimer = memo(function DemoTimer() {
  const demoSeconds = useDemoCountdown();
  return (
    <div className="demo-timer-row">
      <span>{demoSeconds > 0 ? "ATENÇÃO: ESTA OFERTA TERMINA EM" : "SIMULAÇÃO CONCLUÍDA"}</span>
      <span className="demo-timer" role="timer" aria-label="Contador de demonstração">
        {formatCountdown(demoSeconds)}
      </span>
    </div>
  );
});

function Index() {
  const ctaVisible = useDelayedCta();

  return (
    <main className="sales-page">
      <div className="sales-topbar">
        <DemoTimer />
      </div>
      <header className="sales-hero">
        <h1>
          <span>O SEGREDO PARA</span>
          <span><em className="red">AUMENTAR SEU PÊNIS</em> E</span>
          <span className="yellow">DURAR MAIS DE 50 MINUTOS</span>
          <span><em className="yellow">NA CAMA</em> FOI REVELADO</span>
          <span>NESTE VÍDEO...</span>
        </h1>
      </header>
      <section className="vsl-section" aria-label="Apresentação da Fórmula Proibida">
        <VslPlayer />
        {ctaVisible && (
          <div className="delayed-cta">
            <Button variant="funnel" asChild>
              <Link to="/checkout">QUERO GARANTIR MEU ACESSO AGORA <ArrowRight aria-hidden="true" /></Link>
            </Button>
          </div>
        )}
      </section>
      <div className="sales-content">
        <section className="sales-testimonials" aria-label="Depoimentos de clientes">
          <h2>Mais relevantes</h2>
          {testimonials.map((testimonial) => (
            <article className="testimonial" key={testimonial.name}>
              <img src={testimonial.image} alt={testimonial.name} width={86} height={86} loading="lazy" />
              <div className="testimonial-bubble">
                <h3>{testimonial.name}</h3>
                <p>{testimonial.text}</p>
              </div>
            </article>
          ))}
          <p className="testimonial-disclaimer">Relatos individuais, publicados com autorização. Não representam resultados garantidos. A entrega atual do PDF é feita pelo WhatsApp após confirmação do pagamento.</p>
        </section>
        <section className="sales-information sales-faq">
          <h2>DÚVIDAS FREQUENTES</h2>
          <details><summary>Como vou receber o acesso?</summary><p>Após pagar por referência, envie o comprovativo pelo WhatsApp indicado na página de pagamento e solicite o PDF.</p></details>
          <details><summary>Qual é o valor do produto?</summary><p>A Fórmula Proibida custa 5.900 Kz. Os adicionais são opcionais e o total é apresentado antes do pagamento.</p></details>
          <details><summary>Existem resultados garantidos?</summary><p>Não. A experiência é individual e não são prometidos resultados médicos ou de desempenho.</p></details>
          <details><summary>Qual é a política de reembolso?</summary><p>Política de reembolso: informação a fornecer pelo vendedor. Nenhuma garantia de 15 dias foi confirmada.</p></details>
        </section>
      </div>
      <FunnelFooter />
    </main>
  );
}
