import StatusBadge from "../common/StatusBadge";

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  status: "Operational" | "Coming Soon";
  onOpen?: () => void;
}

function ModuleCard({
  title,
  description,
  icon,
  status,
  onOpen,
}: ModuleCardProps) {
  const isOperational = status === "Operational";
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
      <button className="module-card module-card--button" type="button" onClick={onOpen}>
        {content}
      </button>
    );
  }

  return <article className="module-card">{content}</article>;
}

export default ModuleCard;
