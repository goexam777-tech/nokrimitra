import type { Metadata } from "next";
import LegalPage from "@/app/components/LegalPage";

export const metadata: Metadata = {
  title: "ડિસ્ક્લેમર | નોકરી મિત્ર",
  description:
    "નોકરી મિત્ર ડિસ્ક્લેમર — આ એક ખાનગી અભ્યાસ પ્લેટફોર્મ છે, સત્તાવાર GSRTC સાથે સંબંધિત નથી.",
};

export default function DisclaimerPage() {
  return (
    <LegalPage title="ડિસ્ક્લેમર" updated="જુલાઈ 2026">
      <div className="callout">
        નોકરી મિત્ર (nokrimitra.in) એ એક <strong>ખાનગી અભ્યાસ પ્લેટફોર્મ</strong>{" "}
        છે. અમે GSRTC, ગુજરાત સરકાર કે કોઈ પણ સરકારી સંસ્થા સાથે{" "}
        <strong>સંબંધિત, અધિકૃત કે સંલગ્ન નથી.</strong>
      </div>
      <h2>સામગ્રી વિશે</h2>
      <p>
        અહીં આપેલી બધી માહિતી અને PDF ફક્ત <strong>શૈક્ષણિક અને તૈયારીના
        હેતુ</strong> માટે છે. અમે માહિતી સચોટ રાખવા પ્રયત્ન કરીએ છીએ, પરંતુ તેની
        સંપૂર્ણ ચોકસાઈ કે અદ્યતનતાની ખાતરી આપતા નથી.
      </p>
      <h2>સત્તાવાર માહિતી</h2>
      <p>
        ભરતી, તારીખ, જગ્યાઓ, અભ્યાસક્રમ કે ફી સંબંધિત અંતિम અને સત્તાવાર માહિતી
        માટે હંમેશા GSRTC તથા{" "}
        <a href="https://ojas.gujarat.gov.in" target="_blank" rel="noopener noreferrer">
          ojas.gujarat.gov.in
        </a>{" "}
        ની અધિકૃત વેબસાઈટ જ તપાસો.
      </p>
      <h2>પરિણામ</h2>
      <p>
        અમારી સામગ્રી વાપરવાથી પરીક્ષામાં સફળતાની કોઈ ખાતરી નથी. તૈયારી અને
        પરિણામ ઉમેદવારના પોતાના પ્રયત્ન પર આધારિત છે.
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
