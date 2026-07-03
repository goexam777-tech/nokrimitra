export interface McqQuestion {
  id: number;
  question: string;
  options: [string, string, string, string];
  answer: number; // 0-based index
}

export interface McqSection {
  id: string;
  icon: string;
  title: string;
  shortTitle: string;
  questions: McqQuestion[];
}

export const mcqSections: McqSection[] = [
  // ──────────────────────────────────────────────
  // 1. સામાન્ય જ્ઞાન (General Knowledge) — 20 Q
  // ──────────────────────────────────────────────
  {
    id: "gk",
    icon: "🌍",
    title: "સામાન્ય જ્ઞાન",
    shortTitle: "સા. જ્ઞાન",
    questions: [
      { id: 1, question: "ગુજરાત રાજ્યની સ્થાપના ક્યારે થઈ હતી?", options: ["1 મે 1960", "15 ઓગસ્ટ 1947", "26 જાન્યુઆરી 1950", "1 નવેમ્બર 1956"], answer: 0 },
      { id: 2, question: "ગુજરાતની રાજધાની કઈ છે?", options: ["અમદાવાદ", "ગાંધીનગર", "સુરત", "રાજકોટ"], answer: 1 },
      { id: 3, question: "ગુજરાતનું રાજ્ય પ્રાણી કયું છે?", options: ["સિંહ", "વાઘ", "હાથી", "ચિત્તો"], answer: 0 },
      { id: 4, question: "ગુજરાતનું રાજ્ય ફૂલ કયું છે?", options: ["ગુલાબ", "કમળ", "ગલગોટો", "ચંપો"], answer: 2 },
      { id: 5, question: "ગુજરાતમાં કુલ કેટલા જિલ્લા છે?", options: ["30", "33", "36", "38"], answer: 1 },
      { id: 6, question: "ભારતનું બંધારણ ક્યારે અમલમાં આવ્યું?", options: ["15 ઓગસ્ટ 1947", "26 જાન્યુઆરી 1950", "26 નવેમ્બર 1949", "2 ઓક્ટોબર 1950"], answer: 1 },
      { id: 7, question: "GSRTC નું પૂરું નામ શું છે?", options: ["Gujarat State Road Transport Corporation", "Gujarat State Railway Transport Company", "Gujarat State Road Travel Corporation", "Gujarat Southern Road Transport Corporation"], answer: 0 },
      { id: 8, question: "ગુજરાતનો સૌથી લાંબો નદી કઈ છે?", options: ["સાબરમતી", "તાપી", "નર્મદા", "મહી"], answer: 2 },
      { id: 9, question: "સોમનાથ મંદિર ગુજરાતના કયા જિલ્લામાં આવેલું છે?", options: ["જૂનાગઢ", "ગીર સોમનાથ", "પોરબંદર", "અમરેલી"], answer: 1 },
      { id: 10, question: "ગુજરાતનું સૌથી મોટું શહેર (વસ્તી પ્રમાણે) કયું છે?", options: ["સુરત", "અમદાવાદ", "વડોદરા", "રાજકોટ"], answer: 1 },
      { id: 11, question: "મહાત્મા ગાંધીજીનો જન્મ ગુજરાતના કયા શહેરમાં થયો હતો?", options: ["અમદાવાદ", "રાજકોટ", "પોરબંદર", "જૂનાગઢ"], answer: 2 },
      { id: 12, question: "ગુજરાતમાં ગીર રાષ્ટ્રીય ઉદ્યાન શેના માટે પ્રખ્યાત છે?", options: ["વાઘ", "એશિયાટિક સિંહ", "ગેંડો", "હાથી"], answer: 1 },
      { id: 13, question: "ભારતનું પ્રથમ રાષ્ટ્રપતિ કોણ હતા?", options: ["ડૉ. રાજેન્દ્ર પ્રસાદ", "ડૉ. સર્વપલ્લી રાધાકૃષ્ણન", "જવાહરલાલ નેહરુ", "ડૉ. ઝાકિર હુસૈન"], answer: 0 },
      { id: 14, question: "ગુજરાતનો દરિયાકિનારો (coastline) લગભગ કેટલા કિ.મી. છે?", options: ["1000 કિ.મી.", "1600 કિ.મી.", "1200 કિ.મી.", "2000 કિ.મી."], answer: 1 },
      { id: 15, question: "સ્ટેચ્યુ ઓફ યુનિટી કઈ નદી પર બનાવવામાં આવ્યું છે?", options: ["સાબરમતી", "તાપી", "નર્મદા", "મહી"], answer: 2 },
      { id: 16, question: "ગુજરાતના કયા શહેરને 'ડાયમંડ સિટી' કહેવાય છે?", options: ["અમદાવાદ", "સુરત", "રાજકોટ", "ભાવનગર"], answer: 1 },
      { id: 17, question: "ભારતનો રાષ્ટ્રીય ખેલ કયો છે?", options: ["ક્રિકેટ", "ફૂટબોલ", "હોકી", "બેડમિન્ટન"], answer: 2 },
      { id: 18, question: "ગુજરાતમાં 'રણ ઉત્સવ' કયા જિલ્લામાં યોજાય છે?", options: ["કચ્છ", "બનાસકાંઠા", "પાટણ", "સુરેન્દ્રનગર"], answer: 0 },
      { id: 19, question: "GSRTC ની સ્થાપના કયા વર્ષમાં થઈ હતી?", options: ["1947", "1960", "1961", "1969"], answer: 2 },
      { id: 20, question: "ભારતનું રાષ્ટ્રીય ગીત 'વંદે માતરમ' ના રચયિતા કોણ છે?", options: ["રવીન્દ્રનાથ ટાગોર", "બંકિમચંદ્ર ચટ્ટોપાધ્યાય", "મહાત્મા ગાંધી", "સુભાષ ચંદ્ર બોઝ"], answer: 1 },
    ],
  },

  // ──────────────────────────────────────
  // 2. કોમ્પ્યુટર (Computer) — 20 Q
  // ──────────────────────────────────────
  {
    id: "computer",
    icon: "💻",
    title: "કોમ્પ્યુટર",
    shortTitle: "કોમ્પ્યુટર",
    questions: [
      { id: 21, question: "CPU નું પૂરું નામ શું છે?", options: ["Central Processing Unit", "Central Program Unit", "Computer Personal Unit", "Central Processor Utility"], answer: 0 },
      { id: 22, question: "RAM નું પૂરું નામ શું છે?", options: ["Read Access Memory", "Random Access Memory", "Run Application Memory", "Ready Access Module"], answer: 1 },
      { id: 23, question: "કોમ્પ્યુટરનો 'બ્રેઈન' (મગજ) કયો ભાગ કહેવાય છે?", options: ["RAM", "Hard Disk", "CPU", "Monitor"], answer: 2 },
      { id: 24, question: "1 KB (કિલોબાઈટ) = કેટલા Bytes?", options: ["100", "512", "1024", "1000"], answer: 2 },
      { id: 25, question: "MS Word માં ફાઇલ સેવ કરવાની શોર્ટકટ કી કઈ છે?", options: ["Ctrl + S", "Ctrl + V", "Ctrl + P", "Ctrl + X"], answer: 0 },
      { id: 26, question: "ઇન્ટરનેટ પર વેબસાઈટ ખોલવા માટે કયો સોફ્ટવેર વપરાય છે?", options: ["MS Word", "Web Browser", "MS Excel", "Notepad"], answer: 1 },
      { id: 27, question: "કોમ્પ્યુટરની Input ડિવાઈસ કઈ છે?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: 2 },
      { id: 28, question: "USB નું પૂરું નામ શું છે?", options: ["Universal Serial Bus", "Ultra Speed Bus", "Unified System Bus", "Universal System Buffer"], answer: 0 },
      { id: 29, question: "MS Excel માં Cell Address કઈ રીતે લખાય?", options: ["Row-Column (1A)", "Column-Row (A1)", "Cell-Number", "Page-Cell"], answer: 1 },
      { id: 30, question: "કોમ્પ્યુટરમાં વાયરસ એટલે શું?", options: ["હાર્ડવેર ભાગ", "ખરાબ સોફ્ટવેર (Malware)", "ઓપરેટિંગ સિસ્ટમ", "ઈન્ટરનેટ કનેક્શન"], answer: 1 },
      { id: 31, question: "PDF નું પૂરું નામ શું છે?", options: ["Personal Document Format", "Portable Document Format", "Print Document File", "Page Display Format"], answer: 1 },
      { id: 32, question: "ઈ-મેલ (Email) નું પૂરું નામ શું છે?", options: ["Emergency Mail", "Electronic Mail", "Express Mail", "Easy Mail"], answer: 1 },
      { id: 33, question: "કોમ્પ્યુટર સ્ક્રીન ને શું કહેવાય છે?", options: ["CPU", "Keyboard", "Monitor", "Mouse"], answer: 2 },
      { id: 34, question: "Ctrl + C શોર્ટકટ કી શું કરે છે?", options: ["Cut", "Copy", "Close", "Create"], answer: 1 },
      { id: 35, question: "ઓપરેટિંગ સિસ્ટમ (OS) નું ઉદાહરણ કયું છે?", options: ["MS Word", "Google Chrome", "Windows", "Photoshop"], answer: 2 },
      { id: 36, question: "Wi-Fi નું પૂરું નામ શું છે?", options: ["Wireless Fidelity", "Wired Finder", "Wide Fiber", "Wireless Fiber"], answer: 0 },
      { id: 37, question: "કોમ્પ્યુટરમાં ડેટા કાયમ માટે ક્યાં સ્ટોર થાય છે?", options: ["RAM", "Hard Disk / SSD", "CPU Cache", "Monitor"], answer: 1 },
      { id: 38, question: "WWW નું પૂરું નામ શું છે?", options: ["Wide World Web", "World Wide Web", "Web World Wide", "Wireless World Web"], answer: 1 },
      { id: 39, question: "Ctrl + Z શોર્ટકટ કી શું કરે છે?", options: ["Zoom", "Redo", "Undo", "Save"], answer: 2 },
      { id: 40, question: "પ્રિન્ટર એ કઈ પ્રકારની ડિવાઈસ છે?", options: ["Input Device", "Output Device", "Processing Device", "Storage Device"], answer: 1 },
    ],
  },

  // ──────────────────────────────────────
  // 3. ભાડા ગણતરી (Fare Calculation) — 10 Q
  // ──────────────────────────────────────
  {
    id: "fare",
    icon: "🚌",
    title: "ભાડા ગણતરી",
    shortTitle: "ભાડા ગણતરી",
    questions: [
      { id: 41, question: "GSRTC બસમાં લઘુત્તમ ભાડું (Minimum Fare) કેટલું હોય છે?", options: ["₹5", "₹10", "₹7", "₹15"], answer: 1 },
      { id: 42, question: "જો 100 કિ.મી.ની ટિકિટ ₹150 હોય, તો 1 કિ.મી. નું ભાડું કેટલું થાય?", options: ["₹1", "₹1.50", "₹2", "₹0.50"], answer: 1 },
      { id: 43, question: "GSRTC માં બાળક (Child) ને મફત ટિકિટ કેટલી ઉંમર સુધી મળે છે?", options: ["3 વર્ષ", "5 વર્ષ", "7 વર્ષ", "10 વર્ષ"], answer: 1 },
      { id: 44, question: "સ્લીપર બસનું ભાડું સામાન્ય બસ કરતાં સામાન્ય રીતે કેટલા ગણું હોય છે?", options: ["1.5 ગણું", "2 ગણું", "2.5 ગણું", "3 ગણું"], answer: 1 },
      { id: 45, question: "કંડક્ટર દ્વારા ટિકિટ ન આપવામાં આવે તો મુસાફર શું કરી શકે?", options: ["ફરિયાદ કરી શકે", "ભાડું ન આપે", "બસ રોકી શકે", "ડ્રાઈવરને કહે"], answer: 0 },
      { id: 46, question: "GSRTC બસમાં વિદ્યાર્થી પાસ (Student Pass) થી કેટલા ટકા ડિસ્કાઉન્ટ મળે છે?", options: ["25%", "50%", "75%", "100%"], answer: 1 },
      { id: 47, question: "50 કિ.મી. ભાડું ₹60 છે. 3 મુસાફરોનું કુલ ભાડું કેટલું?", options: ["₹150", "₹180", "₹120", "₹200"], answer: 1 },
      { id: 48, question: "રિટર્ન ટિકિટ (Return Ticket) માં સામાન્ય રીતે કેટલું ડિસ્કાઉન્ટ મળે છે?", options: ["5%", "10%", "15%", "20%"], answer: 1 },
      { id: 49, question: "GSRTC માં વોલ્વો (Volvo) AC બસનું ભાડું સામાન્ય બસ કરતાં આશરે કેટલું વધુ હોય છે?", options: ["50% વધુ", "100% વધુ", "150-200% વધુ", "25% વધુ"], answer: 2 },
      { id: 50, question: "એક મુસાફર 80 કિ.મી.ની ટિકિટ ₹100 માં ખરીદે છે. જો તે 60 કિ.મી. પર ઉતરે, તો રિફંડ ગણતરી કેવી રીતે થાય?", options: ["નિયમ મુજબ ન વપરાયેલ કિ.મી.ની કિંમત", "કોઈ રિફંડ ન મળે", "50% રિફંડ", "પૂરું રિફંડ"], answer: 0 },
    ],
  },

  // ──────────────────────────────────────
  // 4. રોડ સેફ્ટી (Road Safety) — 10 Q
  // ──────────────────────────────────────
  {
    id: "safety",
    icon: "🚦",
    title: "રોડ સેફ્ટી",
    shortTitle: "રોડ સેફ્ટી",
    questions: [
      { id: 51, question: "ટ્રાફિક સિગ્નલમાં લાલ લાઈટ (Red Light) નો અર્થ શું છે?", options: ["ધીમે જાઓ", "રોકાઓ (Stop)", "આગળ વધો", "હોર્ન વગાડો"], answer: 1 },
      { id: 52, question: "ઝેબ્રા ક્રોસિંગ (Zebra Crossing) શેના માટે હોય છે?", options: ["વાહનો પાર્ક કરવા", "પગપાળા (પદયાત્રી) રોડ ક્રોસ કરવા", "વાહનો ઝડપ વધારવા", "ટ્રાફિક પોલીસ ઊભા રહેવા"], answer: 1 },
      { id: 53, question: "બસ ડ્રાઈવરે શાળા (School Zone) પાસે શું કરવું જોઈએ?", options: ["ઝડપ વધારવી", "હોર્ન વગાડવો", "ઝડપ ઓછી કરવી", "બસ રોકવી"], answer: 2 },
      { id: 54, question: "ભારતમાં સીટ બેલ્ટ પહેરવો ફરજિયાત છે?", options: ["ફક્ત ડ્રાઈવર માટે", "ફક્ત આગળ બેઠેલા માટે", "ડ્રાઈવર અને આગળ બેઠેલા બંને માટે", "કોઈના માટે નહીં"], answer: 2 },
      { id: 55, question: "ટ્રાફિક સિગ્નલમાં પીળી (Yellow) લાઈટનો અર્થ શું છે?", options: ["ઝડપ વધારો", "તૈયાર રહો / ધીમા પડો", "આગળ વધો", "U-Turn લો"], answer: 1 },
      { id: 56, question: "બસમાં ફર્સ્ટ એઈડ કીટ (First Aid Kit) રાખવી ફરજિયાત છે?", options: ["હા", "ના", "ફક્ત AC બસમાં", "ફક્ત લાંબા રૂટ પર"], answer: 0 },
      { id: 57, question: "ભારતમાં વાહન કઈ બાજુ ચલાવવું જોઈએ?", options: ["જમણી બાજુ (Right)", "ડાબી બાજુ (Left)", "વચ્ચે", "કોઈપણ બાજુ"], answer: 1 },
      { id: 58, question: "બસમાં આગ લાગે ત્યારે કયો સાધન વાપરવો જોઈએ?", options: ["પાણી", "અગ્નિશામક (Fire Extinguisher)", "રેતી", "ધાબળો"], answer: 1 },
      { id: 59, question: "રાત્રે વાહન ચલાવતી વખતે કયો પ્રકાશ (Light) વાપરવો જોઈએ?", options: ["હાઈ બીમ હંમેશા", "લો બીમ (Dim/Low)", "કોઈ લાઈટ નહીં", "ફ્લેશ લાઈટ"], answer: 1 },
      { id: 60, question: "ઓવરલોડિંગ (Overloading) ના કારણે શું થઈ શકે?", options: ["ઈંધણ બચે", "બસ ઝડપી ચાલે", "અકસ્માત અને ટાયર ફાટવાનો ખતરો", "કોઈ અસર ન થાય"], answer: 2 },
    ],
  },

  // ──────────────────────────────────────
  // 5. ફરજો અને સારવાર (Duties & First Aid) — 10 Q
  // ──────────────────────────────────────
  {
    id: "duties",
    icon: "🏥",
    title: "ફરજો અને સારવાર",
    shortTitle: "ફરજો",
    questions: [
      { id: 61, question: "GSRTC કંડક્ટરની મુખ્ય ફરજ શું છે?", options: ["બસ ચલાવવી", "ટિકિટ આપવી અને ભાડું ઉઘરાવવું", "બસ ધોવી", "ટાયર બદલવી"], answer: 1 },
      { id: 62, question: "પ્રાથમિક સારવાર (First Aid) માં 'ABC' નો અર્થ શું છે?", options: ["Always Be Careful", "Airway, Breathing, Circulation", "Ambulance, Bandage, Care", "Aid Before Care"], answer: 1 },
      { id: 63, question: "કંડક્ટરે બસમાં મુસાફરો સાથે કેવો વ્યવહાર કરવો જોઈએ?", options: ["કડક", "ઉદાર", "વિનમ્ર અને સહાયક", "ઉદાસીન"], answer: 2 },
      { id: 64, question: "જો કોઈ મુસાફરને હૃદય રોગનો હુમલો (Heart Attack) આવે, તો પ્રથમ શું કરવું?", options: ["પાણી પીવડાવવું", "108 એમ્બ્યુલન્સ બોલાવવી અને CPR આપવો", "દવા આપવી", "અવગણવું"], answer: 1 },
      { id: 65, question: "કંડક્ટરે બસ ઊપડતા પહેલાં શું ચેક કરવું જોઈએ?", options: ["ફક્ત ઈંધણ", "મુસાફરોની સંખ્યા, ટિકિટ મશીન, બસ નંબર", "કંઈ નહીં", "ફક્ત ટાયર"], answer: 1 },
      { id: 66, question: "દાઝી ગયેલા (Burn) ભાગ પર તરત શું કરવું જોઈએ?", options: ["બરફ મૂકવો", "ઠંડા પાણીથી ધોવું", "તેલ લગાવવું", "ટૂથપેસ્ટ લગાવવી"], answer: 1 },
      { id: 67, question: "કંડક્ટરે બસ ટ્રીપ પૂર્ણ થયા પછી શું સોંપવું જોઈએ?", options: ["ફક્ત ચાવી", "ટ્રિપ શીટ, કલેક્શન અને ટિકિટ મશીન", "કંઈ નહીં", "ફક્ત ભાડું"], answer: 1 },
      { id: 68, question: "જો કોઈ મુસાફરને રક્તસ્ત્રાવ (Bleeding) થાય, તો શું કરવું?", options: ["ઘા પર દબાણ (Pressure) આપવું અને પટ્ટી બાંધવી", "પાણી રેડવું", "અવગણવું", "દોડાવવું"], answer: 0 },
      { id: 69, question: "GSRTC કંડક્ટરે ગણવેશ (Uniform) પહેરવો ફરજિયાત છે?", options: ["હા", "ના", "ફક્ત રવિવારે", "ફક્ત AC બસમાં"], answer: 0 },
      { id: 70, question: "જો મુસાફરને સાંપ કરડે, તો પ્રાથમિક સારવારમાં શું કરવું?", options: ["કરડેલી જગ્યા ચૂસવી", "શાંત રાખવું અને હોસ્પિટલ લઈ જવું", "દોરડું બાંધવું", "ઘા ચીરવો"], answer: 1 },
    ],
  },

  // ──────────────────────────────────────
  // 6. ગુજરાતી (Gujarati Language) — 10 Q
  // ──────────────────────────────────────
  {
    id: "gujarati",
    icon: "✍️",
    title: "ગુજરાતી",
    shortTitle: "ગુજરાતી",
    questions: [
      { id: 71, question: "'નરસિંહ મહેતા' ગુજરાતી સાહિત્યમાં શેના તરીકે ઓળખાય છે?", options: ["આદિ કવિ", "રાષ્ટ્ર કવિ", "મહાકવિ", "લોક કવિ"], answer: 0 },
      { id: 72, question: "'વૈષ્ણવ જન તો તેને કહિએ' — આ ભજન કોણે લખ્યું?", options: ["મીરાંબાઈ", "નરસિંહ મહેતા", "મહાત્મા ગાંધી", "પ્રેમાનંદ"], answer: 1 },
      { id: 73, question: "'સમાનાર્થી' શબ્દ નો અર્થ શું છે?", options: ["વિરુદ્ધ અર્થ", "સરખો અર્થ", "અનેક અર્થ", "કોઈ અર્થ નહીં"], answer: 1 },
      { id: 74, question: "'અગ્નિ' નો સમાનાર્થી શબ્દ કયો છે?", options: ["પાણી", "આગ", "હવા", "પૃથ્વી"], answer: 1 },
      { id: 75, question: "'ચંદ્ર' નો વિરુદ્ધાર્થી શબ્દ કયો છે?", options: ["સૂર્ય", "તારો", "ગ્રહ", "આકાશ"], answer: 0 },
      { id: 76, question: "ગુજરાતી ભાષામાં કુલ કેટલા સ્વર છે?", options: ["10", "12", "14", "16"], answer: 2 },
      { id: 77, question: "'ઝવેરચંદ મેઘાણી' ને કયા ઉપનામથી ઓળખવામાં આવે છે?", options: ["કવિ શ્રેષ્ઠ", "રાષ્ટ્રીય શાયર", "મહાકવિ", "લોક સાહિત્યકાર"], answer: 1 },
      { id: 78, question: "'સરસ્વતીચંદ્ર' નવલકથા કોણે લખી?", options: ["ઝવેરચંદ મેઘાણી", "ગોવર્ધનરામ ત્રિપાઠી", "ક. મા. મુનશી", "પન્નાલાલ પટેલ"], answer: 1 },
      { id: 79, question: "નીચેનામાંથી 'નામ' (Noun) કયો શબ્દ છે?", options: ["સુંદર", "દોડવું", "પુસ્તક", "ઝડપથી"], answer: 2 },
      { id: 80, question: "'જળ' નો બહુવચન શું થાય?", options: ["જળો", "જળા", "જળ (યથાવત)", "જળું"], answer: 2 },
    ],
  },

  // ──────────────────────────────────────
  // 7. અંગ્રેજી (English) — 10 Q
  // ──────────────────────────────────────
  {
    id: "english",
    icon: "🔤",
    title: "અંગ્રેજી",
    shortTitle: "અંગ્રેજી",
    questions: [
      { id: 81, question: "Choose the correct spelling:", options: ["Accomodation", "Accommodation", "Acomodation", "Accomadation"], answer: 1 },
      { id: 82, question: "'Happy' નો Antonym (વિરુદ્ધાર્થી) કયો છે?", options: ["Glad", "Sad", "Joyful", "Cheerful"], answer: 1 },
      { id: 83, question: "'He ___ to school every day.' — ખાલી જગ્યા ભરો:", options: ["go", "goes", "going", "gone"], answer: 1 },
      { id: 84, question: "'Beautiful' નો Synonym (સમાનાર્થી) કયો છે?", options: ["Ugly", "Pretty", "Bad", "Dull"], answer: 1 },
      { id: 85, question: "'I ___ reading a book.' — યોગ્ય શબ્દ ભરો:", options: ["is", "am", "are", "be"], answer: 1 },
      { id: 86, question: "Singular of 'Children' is:", options: ["Childs", "Child", "Childrens", "Childen"], answer: 1 },
      { id: 87, question: "'Dog' is a ___ noun.", options: ["Proper", "Common", "Abstract", "Collective"], answer: 1 },
      { id: 88, question: "'She ___ completed her homework.' — Fill in the blank:", options: ["have", "has", "had", "having"], answer: 1 },
      { id: 89, question: "Past tense of 'Go' is:", options: ["Goes", "Gone", "Went", "Going"], answer: 2 },
      { id: 90, question: "'GSRTC' is an example of:", options: ["Abbreviation", "Acronym", "Suffix", "Prefix"], answer: 1 },
    ],
  },

  // ──────────────────────────────────────
  // 8. ગણિત & તર્ક (Math & Reasoning) — 10 Q
  // ──────────────────────────────────────
  {
    id: "math",
    icon: "📊",
    title: "ગણિત & તર્ક",
    shortTitle: "ગણિત",
    questions: [
      { id: 91, question: "15 × 12 = ?", options: ["170", "180", "190", "160"], answer: 1 },
      { id: 92, question: "256 ÷ 8 = ?", options: ["30", "32", "34", "36"], answer: 1 },
      { id: 93, question: "જો A = 1, B = 2, C = 3 ... તો CAB = ?", options: ["312", "321", "123", "231"], answer: 0 },
      { id: 94, question: "શ્રેણી પૂર્ણ કરો: 2, 6, 18, 54, ?", options: ["108", "162", "72", "216"], answer: 1 },
      { id: 95, question: "₹500 નો 10% કેટલા થાય?", options: ["₹50", "₹40", "₹60", "₹100"], answer: 0 },
      { id: 96, question: "એક બસ 4 કલાકમાં 240 કિ.મી. ચાલે છે. બસની સરેરાશ ઝડપ કેટલી?", options: ["50 km/hr", "55 km/hr", "60 km/hr", "65 km/hr"], answer: 2 },
      { id: 97, question: "15, 20, 25, 30, ? — આગળનો નંબર કયો?", options: ["32", "33", "35", "40"], answer: 2 },
      { id: 98, question: "ત્રિકોણના ત્રણ ખૂણાનો સરવાળો કેટલા ડિગ્રી હોય?", options: ["90°", "180°", "270°", "360°"], answer: 1 },
      { id: 99, question: "જો 5 કામદાર 10 દિવસમાં કામ પૂરું કરે, તો 10 કામદાર કેટલા દિવસમાં કરે?", options: ["20 દિવસ", "5 દિવસ", "15 દિવસ", "10 દિવસ"], answer: 1 },
      { id: 100, question: "1 ડઝન = કેટલા?", options: ["10", "11", "12", "24"], answer: 2 },
    ],
  },
];
