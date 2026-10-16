"use client";

import { useEffect, useRef } from "react";
import { MEDICAL_CATALOG } from "@/lib/medicalMasterbookCatalog";
import {
  MEDICAL_GA_ITEM,
  trackMedicalGaEvent,
  trackMedicalMetaEvent,
} from "@/lib/medicalMasterbookTracking";

/** Fires the "viewed the product" step once when the landing page opens. */
export default function MedicalViewItem() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    trackMedicalGaEvent("view_item", {
      value: MEDICAL_CATALOG.price,
      currency: "INR",
      items: [{ ...MEDICAL_GA_ITEM, price: MEDICAL_CATALOG.price }],
    });
    trackMedicalMetaEvent("ViewContent", {
      value: MEDICAL_CATALOG.price,
      currency: "INR",
      content_name: MEDICAL_CATALOG.name,
      content_type: "product",
    });
  }, []);

  return null;
}
