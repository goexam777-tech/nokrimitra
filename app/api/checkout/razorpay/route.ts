import { NextResponse } from "next/server";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";

const OPD_BASE_PRICE = 199;
const OPD_ADDON_ID = "emergency-handbook";
const OPD_ADDON_PRICE = 49;

const PSY_BASE_PRICE = 149;
const PSY_ADDON_ID = "therapeutic-interventions";
const PSY_ADDON_PRICE = 99;

const NURSING_PRICE = 199;

const XRAY_PRICE = 199;
const XRAY_ADDON_ID = "lab-test-master-guide";
const XRAY_ADDON_PRICE = 79;

const REELS_PRICE = 148;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    const isOpd = body.product === "opd";
    const isPsychology = body.product === "psychology";
    const isNursing = body.product === "nursing";
    const isXray = body.product === "xray";
    const isReels = body.product === "reels";
    const isEscooter = body.product === ESCOOTER_CATALOG.product;
    const requestedAddons = Array.isArray(body.addons) ? body.addons.map(String) : [];
    const unknownAddons = isOpd
      ? requestedAddons.filter((id: string) => id !== OPD_ADDON_ID)
      : isPsychology
        ? requestedAddons.filter((id: string) => id !== PSY_ADDON_ID)
        : isXray
          ? requestedAddons.filter((id: string) => id !== XRAY_ADDON_ID)
        : isEscooter
          ? requestedAddons
          : [];

    if (unknownAddons.length) {
      return NextResponse.json({ error: "Invalid add-on selected" }, { status: 400 });
    }

    const addons = isOpd
      ? requestedAddons.filter((id: string) => id === OPD_ADDON_ID).slice(0, 1)
      : isPsychology
        ? requestedAddons.filter((id: string) => id === PSY_ADDON_ID).slice(0, 1)
        : isXray
          ? requestedAddons.filter((id: string) => id === XRAY_ADDON_ID).slice(0, 1)
        : [];
    const amount = isOpd
      ? OPD_BASE_PRICE + (addons.length ? OPD_ADDON_PRICE : 0)
      : isPsychology
        ? PSY_BASE_PRICE + (addons.length ? PSY_ADDON_PRICE : 0)
        : isNursing
          ? NURSING_PRICE
          : isXray
            ? XRAY_PRICE + (addons.length ? XRAY_ADDON_PRICE : 0)
          : isReels
            ? REELS_PRICE
          : isEscooter
            ? ESCOOTER_CATALOG.price
            : Number(body.amount || 99);

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid order amount" }, { status: 400 });
    }

    const amountInPaise = Math.round(amount * 100);
    const isMock = !keyId || keyId.includes("your_key_id") || !keySecret || keySecret.includes("your_key_secret");
    if (isMock) {
      return NextResponse.json({ orderId: `order_mock_${Math.random().toString(36).substring(2, 11)}`, amount: amountInPaise, total: amount, addons, currency: "INR", mock: true });
    }

    const notes = isOpd
      ? { product: "opd", addons: addons.join(","), catalogVersion: "1" }
      : isPsychology
      ? {
          product: "psychology",
          addons: addons.join(","),
          catalogVersion: "1",
          customerEmail: String(body.email || "").trim().toLowerCase(),
          customerName: String(body.name || "").trim().slice(0, 120),
        }
      : isNursing
      ? {
          product: "nursing",
          catalogVersion: "1",
          customerEmail: String(body.email || "").trim().toLowerCase(),
          customerName: String(body.name || "").trim().slice(0, 120),
        }
      : isXray
      ? {
          product: "xray",
          addons: addons.join(","),
          catalogVersion: "1",
          customerEmail: String(body.email || "").trim().toLowerCase(),
          customerName: String(body.name || "").trim().slice(0, 120),
        }
      : isReels
      ? {
          product: "reels",
          catalogVersion: "1",
          customerEmail: String(body.email || "").trim().toLowerCase(),
          customerName: String(body.name || "").trim().slice(0, 120),
        }
      : isEscooter
        ? {
            product: ESCOOTER_CATALOG.product,
            bundle: ESCOOTER_CATALOG.bundleId,
            catalogVersion: ESCOOTER_CATALOG.catalogVersion,
            // Recording the price here keeps verification correct even after
            // the catalogue price changes later.
            price: String(ESCOOTER_CATALOG.price),
          }
        : undefined;

    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${keyId}:${keySecret}`).toString("base64"),
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`,
        ...(notes ? { notes } : {}),
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.description || "Razorpay API error");

    return NextResponse.json({
      orderId: data.id,
      amount: data.amount,
      total: amount,
      addons,
      currency: data.currency,
      mock: false,
    });
  } catch (error: unknown) {
    console.error("Razorpay order API error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to create order" },
      { status: 500 }
    );
  }
}
