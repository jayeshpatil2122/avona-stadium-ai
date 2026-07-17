import StatusBadge from "../common/StatusBadge";

export type AppView = "dashboard" | "navigation";

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
}

const navigationItems: NavigationItem[] = [
  { label: "Command Center", view: "dashboard" as const, status: "Ready" },
  {
    label: "Navigation Intelligence",
    view: "navigation" as const,
    status: "Operational",
  },
  { label: "Crowd Intelligence", status: "Coming Soon" },
  { label: "Operations Intelligence", status: "Coming Soon" },
  { label: "Accessibility", status: "Coming Soon" },
  { label: "Multilingual Assistant", status: "Coming Soon" },
];

function AppShell({
  activeView,
  title,
  eyebrow,
  roleModeLabel,
  children,
  onNavigate,
  onSwitchRole,
}: AppShellProps) {
  return (
    <div className="app-shell">
      <aside className="sidebar" aria-label="Primary navigation">
        <button
          className="brand-lockup"
          type="button"
          onClick={() => onNavigate("dashboard")}
          aria-label="Open command center"
        >
          <span className="brand-mark" aria-hidden="true">
            A
          </span>
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
          <strong>Demo World Cup Stadium</strong>
          <small>Verified demo route graph connected</small>
        </div>
      </aside>

      <div className="mobile-brand" aria-label="Mobile navigation summary">
        <button type="button" onClick={() => onNavigate("dashboard")}>
          Avona StadiumAI
        </button>
        <button type="button" onClick={() => onNavigate("navigation")}>
          Navigation
        </button>
        <button type="button" onClick={onSwitchRole}>
          Role
        </button>
      </div>

      <div className="workspace">
        <header className="top-header">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
          </div>
          <div className="top-header__meta" aria-label="System context">
            <span className="stadium-chip">Demo World Cup Stadium</span>
            <StatusBadge tone="operational" pulse>
              AI Systems Operational
            </StatusBadge>
            <span className="role-chip">{roleModeLabel}</span>
            <button className="switch-role-button" type="button" onClick={onSwitchRole}>
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
