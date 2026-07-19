export const STADIUM_NAME = "Demo World Cup Stadium";

export const STADIUM_LOCATIONS = [
  "Main Entrance",
  "Security Checkpoint",
  "Central Plaza",
  "North Concourse",
  "East Concourse",
  "Gate A",
  "Gate B",
  "Medical Center",
] as const;

export type StadiumLocation = (typeof STADIUM_LOCATIONS)[number];

export const ROUTE_LOCATIONS: StadiumLocation[] = [
  "Main Entrance",
  "Gate A",
];

export const ROUTE_DESTINATIONS: StadiumLocation[] = [
  "Gate A",
  "Gate B",
  "Medical Center",
];

export interface CrowdZone {
  name: StadiumLocation;
  occupancy: number;
  capacity: number;
}

export const CROWD_ZONES: CrowdZone[] = [
  { name: "Main Entrance", occupancy: 850, capacity: 2000 },
  { name: "Security Checkpoint", occupancy: 1200, capacity: 1500 },
  { name: "Central Plaza", occupancy: 2400, capacity: 3000 },
  { name: "North Concourse", occupancy: 1700, capacity: 2000 },
  { name: "East Concourse", occupancy: 900, capacity: 2000 },
  { name: "Gate A", occupancy: 750, capacity: 1000 },
  { name: "Gate B", occupancy: 350, capacity: 1000 },
  { name: "Medical Center", occupancy: 40, capacity: 150 },
];

export const VERIFIED_ROUTES: Record<string, StadiumLocation[]> = {
  "Main Entrance__Gate A": [
    "Main Entrance",
    "Security Checkpoint",
    "Central Plaza",
    "North Concourse",
    "Gate A",
  ],
  "Main Entrance__Gate B": [
    "Main Entrance",
    "Security Checkpoint",
    "Central Plaza",
    "East Concourse",
    "Gate B",
  ],
  "Main Entrance__Medical Center": [
    "Main Entrance",
    "Security Checkpoint",
    "Central Plaza",
    "Medical Center",
  ],
  "Gate A__Medical Center": [
    "Gate A",
    "North Concourse",
    "Central Plaza",
    "Medical Center",
  ],
};
