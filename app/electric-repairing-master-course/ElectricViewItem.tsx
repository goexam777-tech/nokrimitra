"use client";

import { useEffect, useRef } from "react";
import { ELECTRIC_CATALOG } from "@/lib/electricCatalog";
import {
  ELECTRIC_GA_ITEM,
  trackElectricGaEvent,
  trackElectricMetaEvent,
} from "@/lib/electricTracking";

/** Fires the "viewed the product" step once when the landing page opens. */
export default function ElectricViewItem() {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    trackElectricGaEvent("view_item", {
      value: ELECTRIC_CATALOG.price,
      currency: "INR",
      items: [{ ...ELECTRIC_GA_ITEM, price: ELECTRIC_CATALOG.price }],
    });
    trackElectricMetaEvent("ViewContent", {
      value: ELECTRIC_CATALOG.price,
      currency: "INR",
      content_name: ELECTRIC_CATALOG.name,
      content_type: "product",
    });
  }, []);

  return null;
}
