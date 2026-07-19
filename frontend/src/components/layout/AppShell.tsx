import StatusBadge from "../common/StatusBadge";
import { STADIUM_NAME } from "../../constants/stadium";

export type AppView =
  | "dashboard"
  | "navigation"
  | "crowd"
  | "operations"
  | "accessibility"
  | "multilingual";

type NavigationItem =
  | { label: string; view: AppView; status: "Ready" | "Operational" }
  | { label: string; status: "Coming Soon" };

interface AppShellProps {
  activeView: AppView;
  title: string;
  eyebrow: string;
  roleModeLabel: string;
  children: React.ReactNode;
  onNavigate: (view: AppView) => void;
  onSwitchRole: () => void;
  onGoWelcome: () => void;
}

const navigationItems: NavigationItem[] = [
  { label: "Command Center", view: "dashboard" as const, status: "Ready" },
  {
    label: "Navigation Intelligence",
    view: "navigation" as const,
    status: "Operational",
  },
  {
    label: "Crowd Intelligence",
    view: "crowd" as const,
    status: "Operational",
  },
  {
    label: "Operations Intelligence",
    view: "operations" as const,
    status: "Operational",
  },
  {
    label: "Accessibility",
    view: "accessibility" as const,
    status: "Operational",
  },
  {
    label: "Multilingual Assistant",
    view: "multilingual" as const,
    status: "Operational",
  },
];

function AppShell({
  activeView,
  title,
  eyebrow,
  roleModeLabel,
  children,
  onNavigate,
  onSwitchRole,
  onGoWelcome,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <aside className="sidebar" aria-label="Primary navigation">
        <button
          className="brand-lockup"
          type="button"
          onClick={() => onNavigate("dashboard")}
          aria-label="Open command center"
>
          <img
          src="/Avona_StadiumAI_logo.webp"
          alt=""
          className="brand-mark"
          />

          <span>
          <strong>Avona StadiumAI</strong>
          <small>AI-Powered Stadium Operations</small>
          </span>
        </button>

        <nav className="sidebar-nav">
          {navigationItems.map((item) => {
            const isAvailable = "view" in item;
            const isActive = isAvailable && item.view === activeView;

            if (isAvailable) {
              return (
                <button
                  className={`nav-item ${isActive ? "nav-item--active" : ""}`}
                  type="button"
                  key={item.label}
                  onClick={() => onNavigate(item.view)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{item.label}</span>
                  <small>{item.status}</small>
                </button>
              );
            }

            return (
              <div className="nav-item nav-item--disabled" key={item.label}>
                <span>{item.label}</span>
                <small>{item.status}</small>
              </div>
            );
          })}
        </nav>

        <div className="sidebar-card" aria-label="Platform metadata">
          <span className="sidebar-card__label">Tournament Mode</span>
            <strong>{STADIUM_NAME}</strong>
          <small>Verified demo route graph connected</small>
        </div>
      </aside>

      <div className="mobile-brand" aria-label="Mobile navigation summary">
        <button type="button" onClick={() => onNavigate("dashboard")} aria-label="Dashboard">
          Dashboard
        </button>
        <button type="button" onClick={() => onNavigate("navigation")} aria-label="Navigation">
          Route
        </button>
        <button type="button" onClick={() => onNavigate("crowd")} aria-label="Crowd">
          Crowd
        </button>
        <button type="button" onClick={() => onNavigate("operations")} aria-label="Operations">
          Ops
        </button>
        <button type="button" onClick={() => onNavigate("accessibility")} aria-label="Accessibility">
          Access
        </button>
        <button type="button" onClick={() => onNavigate("multilingual")} aria-label="Multilingual">
          Trans
        </button>
        <button type="button" onClick={onSwitchRole} aria-label="Switch Role">
          Role
        </button>
        <button type="button" onClick={onGoWelcome} aria-label="Welcome">
          Exit
        </button>
      </div>

      <div className="workspace" id="main-content" tabIndex={-1}>
        <header className="top-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className="top-header__meta" aria-label="System context">
            <span className="stadium-chip">{STADIUM_NAME}</span>
            <button
              className="switch-role-button app-header-button"
              type="button"
              onClick={onGoWelcome}
            >
              Return to Welcome Screen
            </button>
            <StatusBadge tone="operational" pulse>
              AI Systems Operational
            </StatusBadge>
            <span className="role-chip">{roleModeLabel}</span>
            <button
              className="switch-role-button app-header-button"
              type="button"
              onClick={onSwitchRole}
            >
              Switch Role
            </button>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}

export default AppShell;
