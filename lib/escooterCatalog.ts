export const ESCOOTER_CATALOG = {
  product: "escooter",
  bundleId: "ev-repair-3-book-bundle",
  catalogVersion: "3",
  price: 149,
  name: "Electric Scooter Repairing 3-Book Digital Bundle",
  paymentLabel: "EV Repair 3-Book Bundle",
  books: [
    {
      title: "The Ultimate Electric Scooter Repair Masterclass",
      description: "Step-by-step diagnostics, battery, controller and BLDC motor systems.",
    },
    {
      title: "The E-Bike Conversion & Repair Guide",
      description: "Core components, wiring flow and practical conversion planning.",
    },
    {
      title: "The EV Technician's Quick Toolkit",
      description: "BMS testing, error-code lookup and workshop-ready checklists.",
    },
  ],
} as const;
