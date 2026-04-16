// src/data/bloomDates.ts
export type BloomLocation = {
  id: string;
  name: string;
  country: string;
  region: string;
  start: Date;
  peak: Date;
  end: Date;
};

export const bloomData: BloomLocation[] = [
  // Japan Locations (Update these annually)
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Kanto Region",
    start: new Date(2026, 2, 22),
    peak:  new Date(2026, 2, 27),
    end:   new Date(2026, 3, 4),
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "Kansai Region",
    start: new Date(2026, 2, 25),
    peak:  new Date(2026, 2, 30),
    end:   new Date(2026, 3, 7),
  },
  {
    id: "osaka",
    name: "Osaka",
    country: "Japan",
    region: "Kansai Region",
    start: new Date(2026, 2, 24),
    peak:  new Date(2026, 2, 29),
    end:   new Date(2026, 3, 6),
  },
  {
    id: "sapporo",
    name: "Sapporo",
    country: "Japan",
    region: "Hokkaido",
    start: new Date(2026, 4, 1),
    peak:  new Date(2026, 4, 6),
    end:   new Date(2026, 4, 12),
  },

  // Washington, DC
  {
    id: "dc",
    name: "Washington, DC",
    country: "USA",
    region: "Tidal Basin",
    start: new Date(2026, 2, 25),
    peak:  new Date(2026, 2, 31),
    end:   new Date(2026, 3, 8),
  },
];