import { createContext } from "react";
import type { StadiumRole, RoleValue } from "../types/role";

export interface RoleContextValue {
  role: StadiumRole | null;
  roles: StadiumRole[];
  selectRole: (role: RoleValue) => void;
  clearRole: () => void;
}

export const RoleContext = createContext<RoleContextValue | null>(null);
