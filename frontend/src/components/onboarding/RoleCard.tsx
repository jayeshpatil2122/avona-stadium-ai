import type { StadiumRole } from "../../types/role";

interface RoleCardProps {
  role: StadiumRole;
  selected: boolean;
  onSelect: (role: StadiumRole) => void;
}

function RoleCard({ role, selected, onSelect }: RoleCardProps) {
  return (
    <button
      className={`role-card ${selected ? "role-card--selected" : ""}`}
      type="button"
      onClick={() => onSelect(role)}
      aria-pressed={selected}
    >
      <span className="role-card__icon" aria-hidden="true">
        {role.icon}
      </span>
      <span className="role-card__body">
        <strong>{role.label}</strong>
        <span>{role.description}</span>
      </span>
      <span className="role-card__capabilities" aria-label={`${role.label} capabilities`}>
        {role.capabilities.map((capability) => (
          <span key={capability}>{capability}</span>
        ))}
      </span>
    </button>
  );
}

export default RoleCard;
