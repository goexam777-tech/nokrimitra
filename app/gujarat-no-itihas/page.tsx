import type { Metadata } from "next";
import Link from "next/link";
import styles from "./history.module.css";

export const metadata: Metadata = {
  title: "ગુજરાતનો ઇતિહાસ | GSRTC કંડક્ટર માટે ઉપયોગી | NokriMitra.in",
  description:
    "GSRTC કંડક્ટર પરીક્ષા માટે ગુજરાતનો સંપૂર્ણ ઇતિહાસ — સિંધુ સંસ્કૃતિથી ગુજરાત રાજ્યની સ્થાપના સુધી. મહત્વના મુદ્દા, તારીખો અને હેન્ડરિટન નોટ્સ PDF ડાઉનલોડ.",
};

const HANDWRITTEN_PDF = "/gujarat-itihas-handwritten-notes.pdf";

type Era = {
  icon: string;
  period: string;
  title: string;
  points: string[];
};

const timeline: Era[] = [
  {
    icon: "🏺",
    period: "ઈ.પૂ. 2500 આસપાસ",
    title: "સિંધુ ખીણ (હડપ્પા) સંસ્કૃતિ",
    points: [
      "ગુજરાતમાં લોથલ (અમદાવાદ પાસે, ભોગાવો નદી કિનારે) — વિશ્વનું સૌથી જૂનું જાણીતું ધક્કો (ડોકયાર્ડ/બંદર). વેપાર માટે વપરાતું.",
      "ધોળાવીરા (કચ્છ) — અદ્‌ભુત જળ સંગ્રહ અને ડ્રેનેજ વ્યવસ્થા માટે પ્રખ્યાત; 2021 માં UNESCO વર્લ્ડ હેરિટેજ સાઇટ જાહેર.",
      "રંગપુર, રોજડી, સુરકોટડા, ગોળા ધોરો પણ મહત્વના હડપ્પન સ્થળો.",
      "આ સંસ્કૃતિ મણકા બનાવવા, ધાતુકામ અને દરિયાઈ વેપારમાં આગળ હતી.",
    ],
  },
  {
    icon: "🏛️",
    period: "ઈ.પૂ. 322 – ઈ.સ. 500",
    title: "મૌર્ય, ક્ષત્રપ અને ગુપ્ત કાળ",
    points: [
      "મૌર્ય સમ્રાટ ચંદ્રગુપ્ત અને અશોકના શાસનમાં ગુજરાત આવ્યું; જૂનાગઢ (ગિરનાર) પર અશોકના શિલાલેખ આજે પણ છે.",
      "સુદર્શન તળાવ (ગિરનાર) — ચંદ્રગુપ્તના સૂબા પુષ્યગુપ્ત દ્વારા બંધાયું, પછી રુદ્રદામને સમારકામ કરાવ્યું.",
      "પશ્ચિમી ક્ષત્રપ શાસક રુદ્રદામન પ્રથમનો સંસ્કૃત શિલાલેખ મહત્વનો.",
      "ગુપ્ત સામ્રાજ્ય (ચંદ્રગુપ્ત વિક્રમાદિત્ય) સમયે ગુજરાત વેપાર-કળામાં સમૃદ્ધ.",
    ],
  },
  {
    icon: "👑",
    period: "ઈ.સ. 942 – 1244",
    title: "સોલંકી (ચૌલુક્ય) વંશ — સુવર્ણ યુગ",
    points: [
      "મૂળરાજ સોલંકીએ અણહિલવાડ પાટણને રાજધાની બનાવી વંશ સ્થાપ્યો.",
      "સિદ્ધરાજ જયસિંહ અને કુમારપાળના શાસનમાં ગુજરાત સમૃદ્ધિ, કળા અને સાહિત્યની ટોચે પહોંચ્યું.",
      "રાણી ઉદયમતીએ બંધાવેલી પાટણની 'રાણકી વાવ' — UNESCO હેરિટેજ; ₹100 ની નોટ પર છપાયેલી.",
      "મોઢેરાનું સૂર્ય મંદિર (ભીમદેવ પ્રથમ) — સ્થાપત્યનું ઉત્કૃષ્ટ ઉદાહરણ.",
      "જૈન વિદ્વાન હેમચંદ્રાચાર્ય કુમારપાળના દરબારમાં હતા.",
    ],
  },
  {
    icon: "🕌",
    period: "ઈ.સ. 1299 – 1573",
    title: "વાઘેલા અને સલ્તનત કાળ — અમદાવાદની સ્થાપના",
    points: [
      "સોલંકી પછી વાઘેલા વંશ; કરણ વાઘેલા છેલ્લો હિન્દુ રાજા.",
      "અહમદ શાહ પ્રથમે ઈ.સ. 1411 માં સાબરમતી કિનારે અમદાવાદ શહેર વસાવ્યું.",
      "ગુજરાત સ્વતંત્ર સલ્તનત બની; મહમૂદ બેગડો સૌથી પ્રખ્યાત અને શક્તિશાળી સુલતાન.",
      "આ કાળનું ઇન્ડો-ઇસ્લામિક સ્થાપત્ય — ઝૂલતા મિનારા, જામા મસ્જિદ, સીદી સૈયદની જાળી.",
    ],
  },
];

const timeline2: Era[] = [
  {
    icon: "⚔️",
    period: "ઈ.સ. 1573 – 1758",
    title: "મુઘલ અને મરાઠા કાળ",
    points: [
      "અકબરે ઈ.સ. 1573 માં ગુજરાત મુઘલ સામ્રાજ્યમાં ભેળવ્યું.",
      "સુરત મુઘલ કાળનું મુખ્ય બંદર અને આંતરરાષ્ટ્રીય વેપાર કેન્દ્ર બન્યું; અહીં અંગ્રેજ/ડચ કોઠીઓ સ્થપાઈ.",
      "18મી સદીમાં મરાઠા (ગાયકવાડ) નો પ્રભાવ વધ્યો — વડોદરા ગાયકવાડની રાજધાની.",
      "શિવાજીએ સુરત પર બે વાર છાપો માર્યો હતો.",
    ],
  },
  {
    icon: "🇬🇧",
    period: "ઈ.સ. 1818 – 1947",
    title: "બ્રિટિશ કાળ અને સ્વાતંત્ર્ય ચળવળ",
    points: [
      "બ્રિટિશ શાસન દરમિયાન ગુજરાત મોટાભાગે બોમ્બે પ્રેસિડેન્સીનો ભાગ હતું; ઘણા દેશી રજવાડાં પણ હતાં.",
      "મહાત્મા ગાંધી (જન્મ: પોરબંદર) અને સરદાર વલ્લભભાઈ પટેલ (નડિયાદ) — ગુજરાતના રત્નો.",
      "સાબરમતી આશ્રમ (અમદાવાદ) સ્વાતંત્ર્ય ચળવળનું કેન્દ્ર બન્યું.",
      "દાંડી કૂચ (1930) — ગાંધીજીએ સાબરમતી આશ્રમથી દાંડી સુધી પગપાળા મીઠાનો સત્યાગ્રહ કર્યો.",
      "બારડોલી સત્યાગ્રહ (1928) ની સફળતાથી વલ્લભભાઈને 'સરદાર' બિરુદ મળ્યું.",
    ],
  },
  {
    icon: "🗺️",
    period: "1 મે 1960",
    title: "ગુજરાત રાજ્યની સ્થાપના",
    points: [
      "આઝાદી પછી સરદાર પટેલે દેશી રજવાડાંને ભારતમાં ભેળવ્યાં (એકીકરણના શિલ્પી).",
      "'મહાગુજરાત આંદોલન' પછી બૃહદ મુંબઈ રાજ્યમાંથી ગુજરાત અલગ રાજ્ય બન્યું.",
      "સ્થાપના દિવસ: 1 મે 1960 (ગુજરાત સ્થાપના દિન / ગુજરાત ગૌરવ દિન).",
      "પ્રથમ મુખ્યમંત્રી: ડૉ. જીવરાજ મહેતા; પ્રથમ પાટનગર: અમદાવાદ.",
      "1970 માં ગાંધીનગર નવું આયોજિત પાટનગર બન્યું.",
    ],
  },
];

const keyFacts: string[] = [
  "ગુજરાત સ્થાપના દિન — 1 મે 1960.",
  "પ્રથમ મુખ્યમંત્રી — ડૉ. જીવરાજ મહેતા.",
  "વર્તમાન પાટનગર — ગાંધીનગર (1970); પ્રથમ પાટનગર — અમદાવાદ.",
  "અમદાવાદની સ્થાપના — અહમદ શાહ, ઈ.સ. 1411.",
  "લોથલ — વિશ્વનું જૂનું બંદર (ડોકયાર્ડ).",
  "ધોળાવીરા — UNESCO સાઇટ, કચ્છ (2021).",
  "રાણકી વાવ — પાટણ; ₹100 ની નોટ પર છપાયેલી.",
  "મોઢેરા સૂર્ય મંદિર — સોલંકી કાળ (ભીમદેવ પ્રથમ).",
  "અશોકના શિલાલેખ — જૂનાગઢ (ગિરનાર).",
  "દાંડી કૂચ — 1930, સાબરમતી આશ્રમથી દાંડી.",
  "બારડોલી સત્યાગ્રહ — 1928; 'સરદાર' બિરુદ.",
  "મહાગુજરાત આંદોલન — અલગ ગુજરાત રાજ્યની માંગ.",
  "ગાંધીજી — જન્મ પોરબંદર; સરદાર પટેલ — નડિયાદ.",
  "સૌથી શક્તિશાળી સુલતાન — મહમૂદ બેગડો.",
];

function HomeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function GujaratHistoryPage() {
  const allEras = [...timeline, ...timeline2];

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className="logo">
            <span className="logo-mark">NM</span>
            <span className="logo-name">
              <span className="logo-word">
                Nokri<span className="logo-accent">Mitra</span>
                <span className="logo-tld">.in</span>
              </span>
              <span className="logo-tag">GSRTC સ્પેશિયલ નોંધ</span>
            </span>
          </Link>
          <Link href="/" className={styles.homeLink}>
            <HomeIcon /> <span>મુખ્ય પેજ</span>
          </Link>
        </div>
      </header>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.badge}>📖 GSRTC કંડક્ટર — સામાન્ય જ્ઞાન</div>
          <h1>ગુજરાતનો ઇતિહાસ</h1>
          <p>
            સિંધુ ખીણ સંસ્કૃતિથી લઈને ગુજરાત રાજ્યની સ્થાપના સુધી — પરીક્ષામાં
            પુછાતા મહત્વના મુદ્દા, તારીખો અને હકીકતો સરળ ગુજરાતીમાં.
          </p>
          <a className={styles.heroDownload} href={HANDWRITTEN_PDF} download>
            <DownloadIcon /> હેન્ડરિટન નોટ્સ PDF ડાઉનલોડ કરો
          </a>
        </div>
      </div>

      <main className={styles.main}>
        {/* Why important */}
        <div className={styles.note}>
          <strong>💡 કેમ મહત્વનું?</strong> GSRTC કંડક્ટર પરીક્ષામાં "સામાન્ય
          જ્ઞાન / ગુજરાતનો ઇતિહાસ" વિભાગમાંથી નિયમિત પ્રશ્નો પુછાય છે. નીચેની
          ટાઈમલાઈન અને મુખ્ય મુદ્દા યાદ રાખવાથી આ વિભાગ સહેલાઈથી કવર થાય.
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {allEras.map((era, i) => (
            <div className={styles.eraRow} key={i}>
              <div className={styles.eraMarker}>
                <span className={styles.eraIcon}>{era.icon}</span>
                <span className={styles.eraNum}>{i + 1}</span>
              </div>
              <div className={styles.eraCard}>
                <span className={styles.eraPeriod}>{era.period}</span>
                <h2 className={styles.eraTitle}>{era.title}</h2>
                <ul className={styles.eraPoints}>
                  {era.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Key facts */}
        <h2 className={styles.factsHeading}>⭐ પરીક્ષા માટે મહત્વના મુદ્દા (One-liners)</h2>
        <div className={styles.factsGrid}>
          {keyFacts.map((f, i) => (
            <div className={styles.factCard} key={i}>
              <span className={styles.factCheck}>✓</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Download CTA */}
        <div className={styles.downloadCta}>
          <div className={styles.downloadIcon}>📝</div>
          <h2>સંપૂર્ણ હેન્ડરિટન નોટ્સ ડાઉનલોડ કરો</h2>
          <p>
            આ આખા "ગુજરાતનો ઇતિહાસ" પ્રકરણની હાથે લખેલી (handwritten) સ્માર્ટ
            નોટ્સ PDF સ્વરૂપે — ગમે ત્યાં, ઓફલાઇન અભ્યાસ કરો.
          </p>
          <a className={styles.downloadBtn} href={HANDWRITTEN_PDF} download>
            <DownloadIcon /> PDF ડાઉનલોડ કરો
          </a>
          <span className={styles.downloadNote}>મફત · તરત ડાઉનલોડ</span>
        </div>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>
          © {new Date().getFullYear()} NokriMitra.in · GSRTC કંડક્ટર તૈયારી.
          માહિતી ફક્ત અભ્યાસ માટે.
        </p>
      </footer>
    </div>
  );
}
