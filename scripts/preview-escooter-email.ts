import { writeFileSync } from "node:fs";
import {
  buildEscooterEmail,
  buildEscooterEmailText,
} from "../lib/escooterEmailTemplate";
import { ESCOOTER_CATALOG } from "../lib/escooterCatalog";

const sample = {
  customerName: "Ramesh Kumar",
  productName: ESCOOTER_CATALOG.name,
  orderId: "order_Qk8sample123",
  amount: ESCOOTER_CATALOG.price,
  downloadUrl:
    "https://nokrimitra.in/electric-scooter-repairing/go?t=sample-token",
};

writeFileSync("email-preview-escooter.html", buildEscooterEmail(sample), "utf8");
writeFileSync(
  "email-preview-escooter.txt",
  buildEscooterEmailText(sample),
  "utf8"
);

console.log("Wrote email-preview-escooter.html and email-preview-escooter.txt");
