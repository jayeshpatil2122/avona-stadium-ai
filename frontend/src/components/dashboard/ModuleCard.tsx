import StatusBadge from "../common/StatusBadge";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  status: "Operational" | "Coming Soon";
  prioritized?: boolean;
  onOpen?: () => void;
}

function ModuleCard({
  title,
  description,
  icon,
  status,
  prioritized = false,
  onOpen,
}: ModuleCardProps) {
  const isOperational = status === "Operational";
  const className = `module-card ${prioritized ? "module-card--prioritized" : ""}`;
  const content = (
    <>
      <span className="module-card__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="module-card__content">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <StatusBadge tone={isOperational ? "operational" : "soon"}>
        {status}
      </StatusBadge>
    </>
  );

  if (onOpen) {
    return (
      <button className={`${className} module-card--button`} type="button" onClick={onOpen}>
        {content}
      </button>
    );
  }

  return <article className={className}>{content}</article>;
}

export default ModuleCard;
