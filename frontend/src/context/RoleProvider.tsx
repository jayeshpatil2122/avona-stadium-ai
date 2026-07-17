import { useMemo, useState, type ReactNode } from "react";
import { RoleContext, type RoleContextValue } from "./roleContext";
import {
  getRoleByValue,
  stadiumRoles,
  type StadiumRole,
} from "../types/role";

const ROLE_STORAGE_KEY = "avona-stadiumai-role";

function getInitialRole() {
  if (typeof window === "undefined") {
    return null;
  }

  return getRoleByValue(window.localStorage.getItem(ROLE_STORAGE_KEY));
}

function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<StadiumRole | null>(getInitialRole);

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      roles: stadiumRoles,
      selectRole: (nextRole) => {
        const selectedRole = getRoleByValue(nextRole);

        if (!selectedRole) {
          return;
        }

        window.localStorage.setItem(ROLE_STORAGE_KEY, selectedRole.value);
        setRole(selectedRole);
      },
      clearRole: () => {
        window.localStorage.removeItem(ROLE_STORAGE_KEY);
        setRole(null);
      },
    }),
    [role],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export default RoleProvider;
