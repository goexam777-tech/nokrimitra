"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Nunito, Poppins } from "next/font/google";
import { ArrowRight, CheckCircle2, Download, Loader2, Mail, ShieldAlert } from "lucide-react";

import { MEDICAL_CATALOG } from "@/lib/medicalMasterbookCatalog";
import {
  MEDICAL_GA_ITEM,
  trackMedicalGaEvent,
  trackMedicalMetaEvent,
} from "@/lib/medicalMasterbookTracking";
import styles from "./thank-you.module.css";

const nunito = Nunito({ subsets: ["latin"], weight: ["400", "600", "700", "800"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["600"], display: "swap", variable: "--font-title" });

const SUPPORT_EMAIL = "vadaviyarohit785@gmail.com";
const SUPPORT_PHONE = "+91 9998191490";

type VerifiedOrder = {
  amountPaid: string;
  downloadPath: string;
  customerEmail: string;
  emailDelivered: boolean;
  downloads?: Array<{ label: string; path: string }>;
};

function ThankYouContent() {
  const router = useRouter();
  const params = useSearchParams();
  const started = useRef(false);
  // Stops the pending re-check loop if the user leaves the page
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const orderId = params.get("order_id") || "";
  const isMock = params.get("mock") === "true";
  const queryEmail = params.get("email") || "";
  const isPending = params.get("pending") === "1";

  const [status, setStatus] = useState<"checking" | "pending" | "ready" | "failed">("checking");
  const [order, setOrder] = useState<VerifiedOrder | null>(null);

  // Browser tab title follows the real order status
  useEffect(() => {
    const labels = {
      checking: "Verifying Payment",
      pending: "Payment Processing",
      ready: "Payment Successful",
      failed: "Payment Pending",
    } as const;
    document.title = `${labels[status]} | Medical Masterbook`;
  }, [status]);

  useEffect(() => {
    if (!orderId) {
      router.replace("/medical-masterbook/checkout");
      return;
    }
    if (started.current) return;
    started.current = true;

    const cacheKey = `medical_order_${orderId}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setOrder(JSON.parse(cached) as VerifiedOrder);
        setStatus("ready");
        return;
      }
    } catch {
      // storage is optional
    }

    const isGone = () => !alive.current;
    const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const callVerify = async () => {
      const res = await fetch("/api/checkout/cashfree/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: orderId,
          email: queryEmail,
          product: MEDICAL_CATALOG.product,
        }),
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, data };
    };

    (async () => {
      try {
        let { ok, data } = await callVerify();

        // Payment still processing (e.g. UPI): re-check every 5s for ~1 minute
        if (!ok && isPending) {
          setStatus("pending");
          for (let i = 0; i < 12 && !ok && !isGone(); i++) {
            await sleep(5000);
            ({ ok, data } = await callVerify());
          }
        }
        if (isGone()) return;

        if (!ok || !data.verified || !data.downloadPath) {
          console.warn("Medical Masterbook payment not verified:", data);
          if (data.notPaid && !isPending) {
            // No payment on this order: back to checkout with an error message
            router.replace("/medical-masterbook/checkout?payment_status=failed");
            return;
          }
          // Pending too long, or verification error: money may be debited, show support
          setStatus("failed");
          return;
        }

        const verified: VerifiedOrder = {
          amountPaid: String(data.amountPaid ?? MEDICAL_CATALOG.price),
          downloadPath: String(data.downloadPath),
          customerEmail: String(data.customerEmail || queryEmail),
          emailDelivered: Boolean(data.emailDelivered),
          downloads: Array.isArray(data.downloads) ? data.downloads : undefined,
        };
        setOrder(verified);
        setStatus("ready");

        // Fire Purchase once per order (survives refresh via localStorage)
        const trackedKey = `medical_purchase_tracked_${orderId}`;
        let alreadyTracked = false;
        try {
          alreadyTracked = localStorage.getItem(trackedKey) === "1";
        } catch {
          // ignore
        }
        if (!alreadyTracked && !isMock) {
          const value = Number(verified.amountPaid) || MEDICAL_CATALOG.price;
          const hasAddon =
            (verified.downloads && verified.downloads.length > 1) ||
            value > MEDICAL_CATALOG.price;
          const purchaseItems = [
            { ...MEDICAL_GA_ITEM, price: MEDICAL_CATALOG.price },
            ...(hasAddon
              ? [
                  {
                    item_id: "opd-bundle",
                    item_name: "OPD Mastery + Emergency Medicine Handbook",
                    item_category: "Addon",
                    price: 99,
                    quantity: 1,
                  },
                ]
              : []),
          ];

          trackMedicalMetaEvent(
            "Purchase",
            {
              value,
              currency: "INR",
              content_name: hasAddon
                ? "Medical Masterbook + OPD Bundle"
                : MEDICAL_CATALOG.name,
              content_type: "product",
            },
            orderId
          );
          // transaction_id also lets GA4 drop duplicates on its side
          trackMedicalGaEvent("purchase", {
            transaction_id: orderId,
            value,
            currency: "INR",
            payment_type: "cashfree",
            items: purchaseItems,
          });
          try {
            localStorage.setItem(trackedKey, "1");
          } catch {
            // ignore
          }
        }

        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(verified));
        } catch {
          // ignore
        }
      } catch (err) {
        console.error("Medical Masterbook verification error:", err);
        if (!isGone()) setStatus("failed");
      }
    })();
  }, [orderId, isMock, isPending, queryEmail, router]);

  return (
    <div className={`${styles.page} ${nunito.className} ${poppins.variable}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <span className={styles.headerTitle}>ORDER STATUS</span>
        </div>
      </header>
      <main className={styles.main}>
        {status === "checking" && (
          <div className={styles.center}>
            <Loader2 size={32} className={styles.spin} aria-hidden="true" />
            <h1 className={styles.title}>Verifying payment...</h1>
            <p className={styles.text}>Please do not refresh or close this page.</p>
          </div>
        )}

        {status === "pending" && (
          <div className={styles.center}>
            <Loader2 size={32} className={styles.spin} aria-hidden="true" />
            <h1 className={styles.title}>Payment is processing...</h1>
            <p className={styles.text}>
              Awaiting confirmation from your bank. Please do not make another payment and keep this page open.
            </p>
          </div>
        )}

        {status === "failed" && (
          <div>
            <ShieldAlert size={36} className={styles.warnIcon} aria-hidden="true" />
            <h1 className={styles.title}>Payment verification pending</h1>
            <p className={styles.text}>
              If money was debited from your account, your purchase is completely safe. Please share your Order ID with our support team, and we will send your access link immediately.
            </p>
            {orderId && (
              <p className={styles.orderId}>
                Order ID: <strong>{orderId}</strong>
              </p>
            )}
            <a
              className={styles.primaryBtn}
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                `Medical Masterbook payment - Order ${orderId}`
              )}`}
            >
              Email support
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <p className={styles.support}>{SUPPORT_PHONE}</p>
          </div>
        )}

        {status === "ready" && order && (
          <div>
            <CheckCircle2 size={44} className={styles.okIcon} aria-hidden="true" />
            <h1 className={styles.title}>Payment successful</h1>
            <p className={styles.text}>
              {order.downloads && order.downloads.length > 1
                ? "Your Medical Masterbook PDF and OPD & Emergency Handbooks are ready. Click the buttons below to download."
                : "Your Medical Masterbook PDF is ready. Click the button below to download."}
            </p>

            {/* Order details, same style as checkout summary */}
            <dl className={styles.summary}>
              <div className={styles.row}>
                <dt>Book</dt>
                <dd>
                  {order.downloads && order.downloads.length > 1
                    ? `${MEDICAL_CATALOG.name} + OPD & Emergency Bundle`
                    : MEDICAL_CATALOG.name}
                </dd>
              </div>
              <div className={styles.row}>
                <dt>Order ID</dt>
                <dd className={styles.mono}>{orderId}</dd>
              </div>
              <div className={`${styles.row} ${styles.totalRow}`}>
                <dt>Amount paid</dt>
                <dd>₹{order.amountPaid}</dd>
              </div>
            </dl>

            {/* Download buttons: multiple if upsell purchased, single otherwise */}
            {order.downloads && order.downloads.length > 0 ? (
              <div className={styles.downloadsList}>
                {order.downloads.map((item, idx) => (
                  <a
                    key={item.path}
                    className={`${styles.primaryBtn} ${idx > 0 ? styles.addonBtn : ""}`}
                    href={`${item.path}${item.path.includes("?") ? "&" : "?"}dl=1`}
                  >
                    <span>Download {item.label}</span>
                    <Download size={20} aria-hidden="true" />
                  </a>
                ))}
              </div>
            ) : (
              <a
                className={styles.primaryBtn}
                href={`${order.downloadPath}${order.downloadPath.includes("?") ? "&" : "?"}dl=1`}
              >
                Download PDF
                <Download size={20} aria-hidden="true" />
              </a>
            )}

            {order.customerEmail && (
              <p className={styles.emailNote}>
                <Mail size={15} aria-hidden="true" />
                <span>
                  {order.emailDelivered ? (
                    <>
                      Book link has also been sent to <strong>{order.customerEmail}</strong>.
                    </>
                  ) : (
                    <>
                      Confirmation email will arrive at <strong>{order.customerEmail}</strong> shortly. You can bookmark this page.
                    </>
                  )}
                </span>
              </p>
            )}

            <p className={styles.support}>
              Need assistance? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              <br />
              <a href="tel:+919998191490">{SUPPORT_PHONE}</a>
            </p>
          </div>
        )}

        <Link href="/medical-masterbook" className={styles.back}>
          Back to Medical Masterbook
        </Link>
      </main>
    </div>
  );
}

export default function MedicalThankYouPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fff" }} />}>
      <ThankYouContent />
    </Suspense>
  );
}
