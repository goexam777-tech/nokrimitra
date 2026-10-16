export const MEDICAL_CATALOG = {
  product: "medical-masterbook",
  bundleId: "medical-masterbook",
  catalogVersion: "1",
  price: 149,
  mrp: 1999,
  name: "Medical Masterbook",
  tagline: "5,000+ MEDICINES • 200+ DISEASES • 500+ PAGES • ALL IN ONE PDF",
  headline: "Medical Masterbook — 5,000+ Medicines. 200+ Diseases. 500+ Pages. All in One PDF.",
  subheadline:
    "The Only Medical Reference You'll Ever Need. 5,000+ medicines. 200 diseases. 500+ pages. Dosage. Uses. Side effects. All in one PDF.",
  description:
    "Built for medical students, nurses, pharmacists & doctors - in Simple English & Hindi so you actually understand it.",
  paymentLabel: "Medical Masterbook",
} as const;

export const BOOK_MODULES = [
  {
    id: "clinical-examination",
    icon: "🩺",
    badge: "Clinical Skills",
    title: "Clinical Examination & Patient History",
    desc: "General physical examination, systemic examination, vital signs assessment, symptom analysis aur accurate diagnosis techniques.",
    highlights: ["General Physical Exam & Vitals", "Systemic Examination Guides", "Symptom Analysis & Red Flags", "Doctor-Patient Communication"],
  },
  {
    id: "pharmacology-dosages",
    icon: "💊",
    badge: "Pharmacology",
    title: "Essential Drug Dosages & Formulations",
    desc: "Antibiotics, analgesics, antipyretics, emergency injections, adult & pediatric dosage calculations aur contraindications.",
    highlights: ["Commonly Prescribed Drugs", "Pediatric & Adult Dosages", "Emergency Injections & Dilutions", "Drug Interactions & Side Effects"],
  },
  {
    id: "emergency-protocols",
    icon: "🚨",
    badge: "Emergency Care",
    title: "Emergency Medicine & ICU Protocols",
    desc: "Anaphylaxis, acute chest pain, trauma care, shock management, acute asthma attack aur CPR step-by-step flowcharts.",
    highlights: ["BLS & ACLS Protocols", "Acute MI & Shock Management", "Poisoning & Snake Bite Protocol", "Trauma & Burn First Response"],
  },
  {
    id: "opd-diagnosis",
    icon: "📋",
    badge: "OPD Practice",
    title: "OPD Diagnosis & Treatment Charts",
    desc: "Fever workup, cough, hypertension, diabetes mellitus, gastrointestinal disorders aur daily OPD cases ka practical treatment.",
    highlights: ["Fever Workup & Differential Diagnosis", "Hypertension & Diabetes Management", "Gastritis, GERD & Diarrhea Protocol", "Respiratory Infections"],
  },
  {
    id: "lab-investigations",
    icon: "🔬",
    badge: "Diagnostics",
    title: "Lab Investigations & Interpretation",
    desc: "CBC, LFT, KFT, lipid profile, urine routine, arterial blood gas (ABG) analysis, normal values aur abnormalities ka matlab.",
    highlights: ["Complete Blood Count (CBC) Decoded", "LFT & KFT Diagnostic Markers", "ECG Basics & Common Arrhythmias", "Chest X-Ray Reading Fundamentals"],
  },
  {
    id: "minor-procedures",
    icon: "🩹",
    badge: "Practical Skills",
    title: "Minor Procedures & Bedside Skills",
    desc: "IV cannulation, catheterization, suturing basics, wound dressing, NG tube insertion aur injection techniques.",
    highlights: ["IV Cannulation & Infusion", "Suturing & Knot Tying Basics", "Catheterization & NG Tube", "Sterile Techniques & Infection Control"],
  },
];

export const WHO_IS_FOR = [
  { text: "MBBS, BDS, BAMS, BHMS ke medical students", tag: "Medical Students" },
  { text: "Interns aur Junior Residents", tag: "Interns & JRs" },
  { text: "Nursing staff aur healthcare professionals", tag: "Nursing" },
  { text: "General practitioners aur clinic chalane wale doctors", tag: "Doctors" },
  { text: "Emergency room aur ICU staff", tag: "Emergency Care" },
  { text: "Pharmacists aur clinical officers", tag: "Clinical Officers" },
  { text: "Apni practical medical & clinical skills improve karne wale", tag: "Practitioners" },
  { text: "Quick revision aur bedside clinical references chahne wale", tag: "Quick Reference" },
];

export const TOPIC_TAGS = [
  { icon: "🩺", title: "Clinical Examination" },
  { icon: "💊", title: "Essential Pharmacology" },
  { icon: "🚨", title: "Emergency Protocols" },
  { icon: "📋", title: "OPD Practice & Treatment" },
  { icon: "🔬", title: "Lab Investigations" },
  { icon: "📈", title: "ECG & Chest X-Ray Basics" },
  { icon: "🩹", title: "Minor Bedside Procedures" },
  { icon: "📑", title: "Standard Treatment Guidelines" },
  { icon: "💉", title: "Emergency Injections & Dosages" },
  { icon: "👶", title: "Pediatric Clinical Pearls" },
  { icon: "⚡", title: "High-Yield Clinical Flowcharts" },
];

export const TESTIMONIALS = [
  {
    name: "Dr. Amit Verma",
    role: "Junior Resident",
    location: "New Delhi",
    quote:
      "OPD duty aur night duties ke time drug dosages aur emergency flowcharts verify karne ke liye ye Medical Masterbook bohot useful hai. Concepts bohot simple aur practical hain.",
    rating: 5,
    highlight: "Emergency & Pharmacology Sections",
  },
  {
    name: "Dr. Priya Patel",
    role: "Medical Officer",
    location: "Ahmedabad, Gujarat",
    quote:
      "Clinical investigations aur lab report interpretation bohot clear hai. MBBS interns aur young doctors ke liye bedside clinical handbook ki tarah kaam karti hai.",
    rating: 5,
    highlight: "Lab Interpretation & OPD Charts",
  },
  {
    name: "Rahul Sharma",
    role: "Final Year MBBS Student",
    location: "Jaipur, Rajasthan",
    quote:
      "Viva aur clinical postings ke liye best resource hai. Examination steps, diagnosis flowcharts aur treatments sab ek jagah organized mil jata hai.",
    rating: 5,
    highlight: "Clinical Postings & Viva Prep",
  },
];

export const FAQS = [
  {
    q: "Medical Masterbook mein exactly kya-kya cover kiya gaya hai?",
    a: "Is complete Medical Masterbook mein 6 comprehensive clinical domains practical aur high-yield format mein cover kiye gaye hain: (1) Clinical Examination & Patient History, (2) Essential Drug Dosages & Pharmacology, (3) Emergency Medicine & ICU Protocols, (4) OPD Diagnosis & Treatment Charts, (5) Lab Investigations & Interpretation (CBC, LFT, KFT, ECG), aur (6) Minor Procedures & Bedside Skills. Saath hi flowcharts aur checklists shamil hain.",
  },
  {
    q: "Kya ye book beginners aur medical students ke liye suitable hai?",
    a: "Haan, bilkul! Ye book MBBS, BAMS, BHMS, Nursing students se lekar practicing doctors sabhi ke liye step-by-step aur clear format mein likhi gayi hai. Complex medical concepts ko practical aur easy-to-understand tareeqe se explain kiya gaya hai.",
  },
  {
    q: "Payment confirm hone ke baad mujhe access kaise milega?",
    a: "Payment confirm hote hi turant screen par direct instant access / download link mil jayega, aur aapke entered email par bhi complete details bhej di jaayengi. Aap isko Mobile, Tablet ya Laptop par kabhi bhi padh sakte hain aur lifetime access rehta hai.",
  },
  {
    q: "Payment ke options kya hain aur kya ye 100% safe hai?",
    a: "Payment 100% safe aur encrypted hai via Cashfree / UPI. Aap UPI (Google Pay, PhonePe, Paytm, BHIM), Debit Card, Credit Card ya Net Banking se secure checkout kar sakte hain. Payment hote hi turant access unlock ho jata hai.",
  },
];
