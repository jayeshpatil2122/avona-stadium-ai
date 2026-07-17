export type RoleValue = "fan" | "volunteer" | "venue_staff" | "operations";

export interface StadiumRole {
  value: RoleValue;
  label: string;
  modeLabel: string;
  icon: string;
  description: string;
  capabilities: string[];
  priorities: string[];
}

export const stadiumRoles: StadiumRole[] = [
  {
    value: "fan",
    label: "Fan",
    modeLabel: "Fan Mode",
    icon: "FAN",
    description: "Personal wayfinding and match-day assistance for visitors.",
    capabilities: ["Navigation", "Accessibility", "Multilingual Assistance"],
    priorities: ["Navigation Intelligence"],
  },
  {
    value: "volunteer",
    label: "Volunteer",
    modeLabel: "Volunteer Mode",
    icon: "VOL",
    description: "Fast guidance for volunteers supporting guests across the venue.",
    capabilities: ["Navigation", "Multilingual Assistance", "Fan Support"],
    priorities: ["Navigation Intelligence", "Multilingual Assistance"],
  },
  {
    value: "venue_staff",
    label: "Venue Staff",
    modeLabel: "Venue Staff Mode",
    icon: "STF",
    description: "Stadium team context for movement, incidents, and guest support.",
    capabilities: ["Crowd Intelligence", "Navigation", "Incident Support"],
    priorities: ["Crowd Intelligence", "Navigation Intelligence"],
  },
  {
    value: "operations",
    label: "Operations",
    modeLabel: "Operations Mode",
    icon: "OPS",
    description: "Command-level view for operational decisions and crowd management.",
    capabilities: [
      "Operational Intelligence",
      "Crowd Management",
      "Decision Support",
    ],
    priorities: ["Operations Intelligence", "Crowd Intelligence"],
  },
];

export function getRoleByValue(value: string | null): StadiumRole | null {
  return stadiumRoles.find((role) => role.value === value) ?? null;
}
