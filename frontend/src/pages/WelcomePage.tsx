interface WelcomePageProps {
  onEnter: () => void;
}

function WelcomePage({ onEnter }: WelcomePageProps) {
  return (
    <main className="onboarding-page welcome-page">
      <section className="welcome-panel" aria-labelledby="welcome-title">
        <div className="welcome-panel__content">
          <p className="eyebrow">Avona StadiumAI</p>
          <h1 id="welcome-title">Intelligence for Every Moment of the Match</h1>
          <p>
            AI-powered navigation, operational intelligence, and decision support
            for smarter stadium experiences.
          </p>
          <div className="welcome-actions">
            <button className="primary-action" type="button" onClick={onEnter}>
              <span aria-hidden="true">Enter</span>
              Enter StadiumAI
            </button>
            <button className="secondary-action" type="button" onClick={onEnter}>
              Explore Demo
            </button>
          </div>
        </div>
        <div className="welcome-array" aria-hidden="true">
          <span className="welcome-core">AI</span>
          <span className="array-ring array-ring--one" />
          <span className="array-ring array-ring--two" />
          <span className="array-dot array-dot--one" />
          <span className="array-dot array-dot--two" />
          <span className="array-dot array-dot--three" />
        </div>
      </section>
    </main>
  );
}

export default WelcomePage;
