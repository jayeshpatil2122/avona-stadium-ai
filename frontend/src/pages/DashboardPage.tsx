import heroAsset from "../assets/hero.png";
import ModuleCard from "../components/dashboard/ModuleCard";
import SystemMetric from "../components/dashboard/SystemMetric";

interface DashboardPageProps {
  onOpenNavigation: () => void;
}

const modules = [
  {
    title: "Navigation Intelligence",
    description: "AI-assisted verified routing for fans across stadium touchpoints.",
    icon: "NAV",
    status: "Operational" as const,
  },
  {
    title: "Crowd Intelligence",
    description: "Density-aware insights for safer concourse and gate operations.",
    icon: "CRD",
    status: "Coming Soon" as const,
  },
  {
    title: "Operations Intelligence",
    description: "Decision support for venue teams during match-day incidents.",
    icon: "OPS",
    status: "Coming Soon" as const,
  },
  {
    title: "Accessibility Intelligence",
    description: "Inclusive routing and assistance workflows for every visitor.",
    icon: "ACC",
    status: "Coming Soon" as const,
  },
  {
    title: "Multilingual Assistance",
    description: "Language-aware help experiences for global tournament audiences.",
    icon: "L10",
    status: "Coming Soon" as const,
  },
];

function DashboardPage({ onOpenNavigation }: DashboardPageProps) {
  return (
    <main className="dashboard-page">
      <section className="hero-panel" aria-labelledby="dashboard-hero-title">
        <div className="hero-panel__content">
          <p className="eyebrow">Avona StadiumAI Command Center</p>
          <h2 id="dashboard-hero-title">
            Intelligence for Every Moment of the Match
          </h2>
          <p>
            AI-powered navigation, operational insights, and intelligent decision
            support for the next generation of stadium experiences.
          </p>
          <button className="primary-action" type="button" onClick={onOpenNavigation}>
            <span aria-hidden="true">Open</span>
            Open Navigation Intelligence
          </button>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <img src={heroAsset} alt="" />
          <div className="stadium-orbit stadium-orbit--one" />
          <div className="stadium-orbit stadium-orbit--two" />
          <div className="intel-node intel-node--a" />
          <div className="intel-node intel-node--b" />
          <div className="intel-node intel-node--c" />
        </div>
      </section>

      <section aria-labelledby="modules-title">
        <div className="section-heading">
          <p className="eyebrow">Intelligence Modules</p>
          <h2 id="modules-title">Operational Surface</h2>
        </div>
        <div className="module-grid">
          {modules.map((module) => (
            <ModuleCard
              key={module.title}
              {...module}
              onOpen={
                module.status === "Operational" ? onOpenNavigation : undefined
              }
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="overview-title">
        <div className="section-heading">
          <p className="eyebrow">System Overview</p>
          <h2 id="overview-title">Truthful Demo Metadata</h2>
        </div>
        <div className="metric-grid">
          <SystemMetric label="AI Provider" value="Groq" detail="Connected through FastAPI" />
          <SystemMetric label="Active Modules" value="1" detail="Navigation Intelligence" />
          <SystemMetric label="Platform Status" value="Operational" detail="Frontend connected to API" />
          <SystemMetric label="Navigation Data" value="Verified Demo Routes" detail="No fake live crowd stats" />
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
