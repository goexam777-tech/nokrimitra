"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Nunito, Poppins } from "next/font/google";
import { ArrowRight, CheckCircle2, Download, Loader2, Mail, ShieldAlert } from "lucide-react";

import { ELECTRIC_CATALOG } from "@/lib/electricCatalog";
import {
  ELECTRIC_GA_ITEM,
  trackElectricGaEvent,
  trackElectricMetaEvent,
} from "@/lib/electricTracking";
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
    document.title = `${labels[status]} | Electric Repairing Course`;
  }, [status]);

  useEffect(() => {
    if (!orderId) {
      router.replace("/electric-repairing-master-course/checkout");
      return;
    }
    if (started.current) return;
    started.current = true;

    const cacheKey = `electric_order_${orderId}`;
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
          product: ELECTRIC_CATALOG.product,
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
          console.warn("Electric payment not verified:", data);
          if (data.notPaid && !isPending) {
            // No payment on this order: back to checkout with an error message
            router.replace("/electric-repairing-master-course/checkout?payment_status=failed");
            return;
          }
          // Pending too long, or verification error: money may be debited, show support
          setStatus("failed");
          return;
        }

        const verified: VerifiedOrder = {
          amountPaid: String(data.amountPaid ?? ELECTRIC_CATALOG.price),
          downloadPath: String(data.downloadPath),
          customerEmail: String(data.customerEmail || queryEmail),
          emailDelivered: Boolean(data.emailDelivered),
        };
        setOrder(verified);
        setStatus("ready");

        // Fire Purchase once per order (survives refresh via localStorage)
        const trackedKey = `electric_purchase_tracked_${orderId}`;
        let alreadyTracked = false;
        try {
          alreadyTracked = localStorage.getItem(trackedKey) === "1";
        } catch {
          // ignore
        }
        if (!alreadyTracked && !isMock) {
          const value = Number(verified.amountPaid) || ELECTRIC_CATALOG.price;
          trackElectricMetaEvent(
            "Purchase",
            { value, currency: "INR", content_name: ELECTRIC_CATALOG.name, content_type: "product" },
            orderId
          );
          // transaction_id also lets GA4 drop duplicates on its side
          trackElectricGaEvent("purchase", {
            transaction_id: orderId,
            value,
            currency: "INR",
            payment_type: "cashfree",
            items: [{ ...ELECTRIC_GA_ITEM, price: value }],
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
        console.error("Electric verification error:", err);
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
            <h1 className={styles.title}>Payment verify ho raha hai...</h1>
            <p className={styles.text}>Kripya ye page band ya refresh na karein.</p>
          </div>
        )}

        {status === "pending" && (
          <div className={styles.center}>
            <Loader2 size={32} className={styles.spin} aria-hidden="true" />
            <h1 className={styles.title}>Payment process ho raha hai...</h1>
            <p className={styles.text}>
              Bank se confirmation aane mein thoda time lag sakta hai. Kripya dobara payment na
              karein aur ye page khula rakhein.
            </p>
          </div>
        )}

        {status === "failed" && (
          <div>
            <ShieldAlert size={36} className={styles.warnIcon} aria-hidden="true" />
            <h1 className={styles.title}>Payment verify nahi ho paya</h1>
            <p className={styles.text}>
              Agar aapke account se paise kat gaye hain, to aapka order safe hai. Neeche diye
              email ya number par apna Order ID bhejein, hum turant course link bhej denge.
            </p>
            {orderId && (
              <p className={styles.orderId}>
                Order ID: <strong>{orderId}</strong>
              </p>
            )}
            <a
              className={styles.primaryBtn}
              href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
                `Electric course payment - Order ${orderId}`
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
            <p className={styles.text}>Aapka course PDF ready hai. Neeche button se download karein.</p>

            {/* Order details, same style as checkout summary */}
            <dl className={styles.summary}>
              <div className={styles.row}>
                <dt>Course</dt>
                <dd>{ELECTRIC_CATALOG.name}</dd>
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

            {/* dl=1 makes /go send the PDF as a direct download */}
            <a
              className={styles.primaryBtn}
              href={`${order.downloadPath}${order.downloadPath.includes("?") ? "&" : "?"}dl=1`}
            >
              Download PDF
              <Download size={20} aria-hidden="true" />
            </a>

            {order.customerEmail && (
              <p className={styles.emailNote}>
                <Mail size={15} aria-hidden="true" />
                <span>
                  {order.emailDelivered ? (
                    <>
                      Course link <strong>{order.customerEmail}</strong> par bhi bhej diya hai.
                    </>
                  ) : (
                    <>
                      Email <strong>{order.customerEmail}</strong> par thodi der mein aayega. Tab
                      tak is page ka link save kar lein.
                    </>
                  )}
                </span>
              </p>
            )}

            <p className={styles.support}>
              Help chahiye? <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
              <br />
              <a href="tel:+919998191490">{SUPPORT_PHONE}</a>
            </p>
          </div>
        )}

        <Link href="/electric-repairing-master-course" className={styles.back}>
          Back to course
        </Link>
      </main>
    </div>
  );
}

export default function ElectricThankYouPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: "#fff" }} />}>
      <ThankYouContent />
    </Suspense>
  );
}
