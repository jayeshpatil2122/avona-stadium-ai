type StatusTone = "operational" | "soon" | "neutral";

interface StatusBadgeProps {
  children: string;
  tone?: StatusTone;
  pulse?: boolean;
}

function StatusBadge({
  children,
  tone = "neutral",
  pulse = false,
}: StatusBadgeProps) {
  return (
    <span className={`status-badge status-badge--${tone}`}>
      {pulse && <span className="status-badge__pulse" aria-hidden="true" />}
      {children}
    </span>
  );
}

export default StatusBadge;
