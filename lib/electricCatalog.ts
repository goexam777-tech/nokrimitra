export const ELECTRIC_CATALOG = {
  product: "electric-repairing",
  bundleId: "electric-repairing-master-course",
  catalogVersion: "1",
  price: 99,
  mrp: 1999,
  name: "Complete Electric & Repairing Master Course",
  tagline: "ONE COMPLETE COURSE • MULTIPLE REPAIR SKILLS • A-Z LEARNING",
  headline: "Complete Electric & Repairing Master Course",
  subheadline:
    "AC, Fridge, Cooler, Fan, Motor, Pump, House Wiring & Mobile Repairing, Sab Kuch Ek Hi Complete Course Mein!",
  description:
    "Beginner se practical repair skills tak, step-by-step learning ke saath. Learn AC, Fridge, Cooler, Fan, Motor, Pump, House Wiring and Mobile Repairing from scratch.",
  paymentLabel: "Complete Electric & Repairing Master Course",
} as const;

export const COURSE_MODULES = [
  {
    id: "ac-fridge",
    icon: "❄️",
    badge: "HVAC & Cooling",
    title: "AC & Refrigerator Repairing",
    desc: "Servicing, common faults aur troubleshooting. Split & Window AC cleaning, gas leak detection, compressor testing, thermostat aur defrost cycle troubleshooting.",
    highlights: ["Gas Charging & Leak Finding", "Compressor & Relay Check", "Defrost & Thermostat Faults", "PCB & Sensor Error Codes"],
  },
  {
    id: "cooler-fan",
    icon: "💨",
    badge: "Appliance Basics",
    title: "Cooler & Fan Repairing",
    desc: "Motor, wiring aur repair basics. Ceiling fan capacitor change, coil test, table fan bearing/bush change aur desert cooler pump & multi-speed wiring.",
    highlights: ["Capacitor & Speed Regulator", "Ceiling & Exhaust Fan Fixes", "Cooler Submersible Pump", "Humming & Jam Motor Fixes"],
  },
  {
    id: "motor-pump",
    icon: "⚙️",
    badge: "Industrial & Domestic",
    title: "Motor & Pump Repairing",
    desc: "Connections, faults aur maintenance. Single phase & three phase motor fundamentals, water pump priming, starter connection aur capacitor matching.",
    highlights: ["Starter & Contactor Wiring", "Winding Resistance Testing", "Water Pump Impeller & Seal", "Thermal Overload Protection"],
  },
  {
    id: "house-wiring",
    icon: "💡",
    badge: "Home Electricals",
    title: "House Electrical Wiring",
    desc: "Switches, sockets, MCB aur wiring basics. Main distribution board, RCCB/ELCB safety, inverter connection, neutral-phase check aur proper earthing.",
    highlights: ["MCB & DB Box Wiring", "Two-Way Switch Connections", "Inverter & Battery Setup", "Proper Earthing & Safety Rules"],
  },
  {
    id: "mobile-repairing",
    icon: "📱",
    badge: "Electronics & PCB",
    title: "Mobile Repairing",
    desc: "Components, hardware aur common problems. Smartphone motherboard anatomy, charging jack replacement, battery diagnosis, display connector aur dead phone troubleshooting.",
    highlights: ["SMD Component Testing", "Charging Port & Mic/Speaker", "Shorting & Multimeter Diagnosis", "Dead Phone Step-by-Step Fix"],
  },
  {
    id: "appliance-repairing",
    icon: "🔌",
    badge: "Daily Utilities",
    title: "Electrical Appliance Repairing",
    desc: "Daily-use appliances ki repairing aur troubleshooting. Electric iron thermostat, mixer grinder bush/coupler, electric kettle, geyser element aur emergency lights.",
    highlights: ["Mixer Grinder Overload Switch", "Geyser Thermostat & Element", "Electric Iron Wiring & Coil", "Multimeter Continuity Checks"],
  },
];

export const WHO_IS_FOR = [
  { text: "Beginners jo zero se start karna chahte hain", tag: "Freshers" },
  { text: "Electrician skills seekhne wale", tag: "Skilling" },
  { text: "AC/Fridge/Cooler repairing seekhne wale", tag: "Technicians" },
  { text: "Motor & Pump repairing mein interest rakhne wale", tag: "Mechanics" },
  { text: "House wiring seekhne wale", tag: "Home Wiring" },
  { text: "Mobile repairing seekhne wale", tag: "Mobile Tech" },
  { text: "Apni repairing skills improve karna chahne wale", tag: "Pros" },
  { text: "Self-learning karne wale aur apna business shuru karne wale", tag: "Self Starter" },
];

export const SKILL_TAGS = [
  { icon: "⚡", title: "Electrical Basics" },
  { icon: "🏠", title: "House Wiring" },
  { icon: "❄️", title: "AC Repairing" },
  { icon: "🧊", title: "Fridge Repairing" },
  { icon: "💨", title: "Cooler Repairing" },
  { icon: "🌀", title: "Fan Repairing" },
  { icon: "⚙️", title: "Motor Repairing" },
  { icon: "💧", title: "Pump Repairing" },
  { icon: "📱", title: "Mobile Repairing" },
  { icon: "🔌", title: "Electrical Appliance Repairing" },
  { icon: "🛠️", title: "Troubleshooting & Practical Concepts" },
];

export const TESTIMONIALS = [
  {
    name: "Manoj Sharma",
    role: "Learner & Technician",
    location: "Jaipur, Rajasthan",
    quote:
      "AC repairing ka basic knowledge bhi nahi tha. Course ke modules ko step-by-step follow karke concepts samajhne mein kaafi help mili.",
    rating: 5,
    highlight: "AC & Fridge Modules",
  },
  {
    name: "Vimal Jat",
    role: "Electrical Workshop Owner",
    location: "Indore, MP",
    quote:
      "Fridge aur cooler repairing ke sections kaafi useful lage. Common problems ko samajhne mein help milti hai.",
    rating: 5,
    highlight: "Cooler & Motor Troubleshooting",
  },
  {
    name: "Rajesh Panchal",
    role: "House Electrician",
    location: "Ahmedabad, Gujarat",
    quote:
      "House wiring aur MCB distribution ke practical diagrams bohot crystal-clear hain. Ek hi course me mobile aur appliances milna sabse bada plus point hai.",
    rating: 5,
    highlight: "House Wiring & Mobile PCB",
  },
];

export const FAQS = [
  {
    q: "Is course mein exactly kya-kya sikhaya jayega?",
    a: "Is complete course mein aapko 6 major domains practical aur step-by-step cover kiye gaye hain: (1) AC & Refrigerator Repairing (gas leaks, compressor, wiring), (2) Cooler & Fan Repairing (motor, capacitor, speed wiring), (3) Motor & Pump Repairing (winding, starter, pump maintenance), (4) House Electrical Wiring (MCB, switchboard, inverter, earthing), (5) Mobile Repairing (motherboard components, charging jack, display, dead phone fix), aur (6) Daily Appliance Repairing (mixer, iron, geyser etc.). Saath hi troubleshooting ke A-Z concepts shamil hain.",
  },
  {
    q: "Kya beginner bhi ye course kar sakta hai?",
    a: "Haan, bilkul! Ye course zero se start hota hai. Agar aapko pehle se repairing ka koi experience nahi hai, tab bhi basic electrical concepts, tools ka use (jaise Multimeter, tester, soldering) aur safety guidelines simple Hinglish bhasha mein samjhaye gaye hain. Step-by-step seekh kar koi bhi practical skills develop kar sakta hai.",
  },
  {
    q: "Course lene ke baad mujhe kya-kya milega aur access kaise milega?",
    a: "Payment confirm hote hi aapko instant screen par access link mil jayega, aur aapke email par bhi download & access details bhej di jaayengi. Aapko Complete Course Modules, Circuit Diagrams, Troubleshooting Flowcharts, Quick Checklists aur Lifetime Access milega jise aap Mobile, Tablet ya Laptop par kabhi bhi dekh aur padh sakte hain.",
  },
  {
    q: "Payment ke options kya hain aur kya ye 100% safe hai?",
    a: "Payment 100% safe aur encrypted hai. Aap UPI (Google Pay, PhonePe, Paytm, BHIM), Debit Card, Credit Card ya Net Banking se secure checkout kar sakte hain. Payment hote hi turant access unlock ho jata hai.",
  },
];
