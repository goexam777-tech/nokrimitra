import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "રિફંડ પોલિસી | નોકરી મિત્ર",
  description:
    "નોકરી મિત્ર રિફંડ પોલિસી — ડિજિટલ PDF પ્રોડક્ટ હોવાથી ખરીદી પછી રિફંડ મળતું નથી.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="રિફંડ પોલિસી" updated="જુલાઈ 2026">
      <div className="callout">
        ⚠️ અમારી બધી પ્રોડક્ટ <strong>ડિજિટલ (PDF) સામગ્રી</strong> છે. એક વાર
        ખરીદી અને ડાઉનલોડ થઈ ગયા પછી <strong>કોઈ પણ સંજોગોમાં રિફંડ મળતું નથી.</strong>
      </div>
      <h2>રિફંડ કેમ નથી?</h2>
      <p>
        ડિજિટલ પ્રોડક્ટ ખરીદ્યા પછી તરત જ ડાઉનલોડ કરી શકાય છે અને તેને પરત કરી
        શકાતી નથી. તેથી ખરીદી અંતિમ ગણાય છે અને રિફંડ, રિટર્ન કે એક્સચેન્જ
        આપવામાં આવતું નથી.
      </p>
      <h2>ખરીદતાં પહેલાં</h2>
      <ul>
        <li>ખરીદતાં પહેલાં અમે આપેલા <strong>ફ્રી સેમ્પલ</strong> અવશ્ય તપાસો.</li>
        <li>પ્રોડક્ટની વિગત અને "શું મળશે" section ધ્યાનથી વાંચો.</li>
        <li>કોઈ શંકા હોય તો ખરીદતાં પહેલાં અમને WhatsApp પર પૂછો.</li>
      </ul>
      <h2>અપવાદ</h2>
      <p>
        જો પેમેન્ટ કપાઈ ગયું હોય પણ ટેક્નિકલ સમસ્યાને કારણે તમને PDF/ડાઉનલોડ
        લિંક <strong>ના મળી હોય</strong>, તો અમારો સંપર્ક કરો — અમે તમને સામગ્રી
        પહોંચાડીશું અથવા યોગ્ય ઉકેલ આપીશું.
      </p>
      <h2>સંપર્ક</h2>
      <p>
        WhatsApp:{" "}
        <a href="https://wa.me/919104826422" target="_blank" rel="noopener noreferrer">
          +91 91048 26422
        </a>
      </p>
    </LegalPage>
  );
}
