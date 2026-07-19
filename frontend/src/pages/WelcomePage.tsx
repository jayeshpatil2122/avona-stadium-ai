import { useEffect, useMemo, useState } from "react";

interface WelcomePageProps {
  onEnter: () => void;
}

function WelcomePage({ onEnter }: WelcomePageProps) {
  const [mounted, setMounted] = useState(false);
  const [canContinue, setCanContinue] = useState(false);

  const particles = useMemo(
    () =>
      [
        { key: "p1", colorClass: "particle--cyan", ringClass: "orbit--one" },
        { key: "p2", colorClass: "particle--aqua", ringClass: "orbit--two" },
        { key: "p3", colorClass: "particle--amber", ringClass: "orbit--three" },
        { key: "p4", colorClass: "particle--blue", ringClass: "orbit--four" },
        { key: "p5", colorClass: "particle--cyan2", ringClass: "orbit--five" },
      ] as const,
    [],
  );

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });

    const t = window.setTimeout(() => {
      setCanContinue(true);
    }, 3600);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <main className="welcome-splash" aria-label="Avona StadiumAI welcome screen">
      <div className={`welcome-splash__bg ${mounted ? "is-mounted" : ""}`} />

      <div className="welcome-splash__stage" aria-hidden="true">
        <div className="welcome-orbits">
          <span className="orbit orbit--one" />
          <span className="orbit orbit--two" />
          <span className="orbit orbit--three" />
          <span className="orbit orbit--four" />
          <span className="orbit orbit--five" />
        </div>

        <div className="welcome-particles">
          {particles.map((p) => (
            <span
              key={p.key}
              className={`particle ${p.colorClass} ${p.ringClass}`}
            />
          ))}
        </div>

        <div className="welcome-logo-wrap">
          <div
            className={`welcome-diamond ${mounted ? "is-in" : ""}`}
            role="img"
            aria-label="Avona StadiumAI"
          >
            <img
              className="welcome-diamond__logo"
              src="/Avona_StadiumAI_logo.webp"
              alt="Avona StadiumAI"
              draggable={false}
            />
          </div>
        </div>
      </div>

      <section
        className={`welcome-intro ${mounted ? "is-mounted" : ""}`}
        aria-labelledby="welcome-intro-title"
      >
        <p className="welcome-intro__kicker">Avona StadiumAI</p>
        <h1 id="welcome-intro-title">Welcome to Avona StadiumAI</h1>
        <p className="welcome-intro__subtitle">
          Intelligent Stadium Management, Powered by AI
        </p>
      </section>

      <div className="welcome-splash__cta" aria-live="polite">
        {canContinue ? (
          <div className="welcome-cta-row">
            <button
              className="primary-action welcome-primary"
              type="button"
              onClick={onEnter}
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="welcome-loading">Initializing stadium intelligence…</div>
        )}
      </div>

      <button
        className="welcome-splash__skip"
        type="button"
        onClick={onEnter}
        aria-label="Skip animation"
      >
        Skip Intro
      </button>
    </main>
  );
}

export default WelcomePage;
