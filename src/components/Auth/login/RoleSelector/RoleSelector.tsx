// src/components/login/RoleSelector/RoleSelector.tsx

import "./RoleSelector.css";

// ── Types ──────────────────────────────────────────────────────────────────
export type Role = "admin" | "laundry" | "client";

interface RoleOption {
  id: Role;
  label: string;
  icon: React.ReactNode;
}

interface RoleSelectorProps {
  selectedRole: Role;
  onRoleChange: (role: Role) => void;
}

// ── Data ───────────────────────────────────────────────────────────────────
const ROLE_OPTIONS: RoleOption[] = [
  {
    id: "admin",
    label: "مدير",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
        <path d="M12 14c-6 0-8 2.5-8 4v1h16v-1c0-1.5-2-4-8-4z" />
        <path d="M17 8l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "laundry",
    label: "صاحب مغسلة",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <circle cx="12" cy="13" r="1.5" />
        <path d="M5 7h2M9 7h1" />
      </svg>
    ),
  },
  {
    id: "client",
    label: "عميل",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
  },
];

// ── Component ──────────────────────────────────────────────────────────────
const RoleSelector = ({ selectedRole, onRoleChange }: RoleSelectorProps) => {
  return (
    <div className="role-selector">
      {ROLE_OPTIONS.map((role) => (
        <button
          key={role.id}
          type="button"
          aria-pressed={selectedRole === role.id}
          className={`role-selector__tab ${
            selectedRole === role.id ? "role-selector__tab--active" : ""
          }`}
          onClick={() => onRoleChange(role.id)}
        >
          <span className="role-selector__icon">{role.icon}</span>
          <span className="role-selector__label">{role.label}</span>
        </button>
      ))}
    </div>
  );
};

export default RoleSelector;