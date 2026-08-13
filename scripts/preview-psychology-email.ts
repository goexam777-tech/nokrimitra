import { writeFileSync } from "node:fs";
import {
  buildPsychologyEmail,
  buildPsychologyEmailText,
} from "../lib/psychologyEmailTemplate";

const base = {
  customerName: "Aditi Sharma",
  orderId: "order_Qk8sample123",
  downloadUrl: "https://nokrimitra.in/psychology-notes/go",
};

// Without upsell
const single = {
  ...base,
  productName: "Psychology Notes",
  amount: 149,
};

// With the ₹99 upsell
const withAddon = {
  ...base,
  productName: "Psychology Notes + 800 Therapeutic Interventions",
  amount: 248,
  downloads: [
    { label: "Psychology Notes", url: "https://nokrimitra.in/psychology-notes/go" },
    {
      label: "800 Therapeutic Interventions",
      url: "https://nokrimitra.in/psychology-notes/go?item=therapeutic-interventions",
    },
  ],
};

writeFileSync("email-preview-psychology.html", buildPsychologyEmail(single), "utf8");
writeFileSync("email-preview-psychology.txt", buildPsychologyEmailText(single), "utf8");
writeFileSync("email-preview-psychology-upsell.html", buildPsychologyEmail(withAddon), "utf8");
writeFileSync("email-preview-psychology-upsell.txt", buildPsychologyEmailText(withAddon), "utf8");

console.log("Wrote email-preview-psychology(.html/.txt) and email-preview-psychology-upsell(.html/.txt)");
