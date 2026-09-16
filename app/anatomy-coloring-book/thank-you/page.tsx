"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  Mail,
  ShieldAlert,
} from "lucide-react";

import styles from "../../opd-mastery-ebook/thank-you/thank-you.module.css";

const PRODUCT_NAME = "500+ Human Anatomy Coloring Book Bundle";

function AnatomyThankYouContent() {
  const router = useRouter();
  const params = useSearchParams();
  const verified = useRef(false);
  const purchaseTracked = useRef(false);

  const [status, setStatus] = useState<"checking" | "ready" | "failed">(
    "checking"
  );
  const [downloadPath, setDownloadPath] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState(
    params.get("amountPaid") || "149"
  );

  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const amountPaid = params.get("amountPaid") || "149";
  const orderId =
    params.get("order_id") ||
    params.get("orderId") ||
    params.get("cf_order_id") ||
    "";

  useEffect(() => {
    if (!orderId) {
      router.replace("/anatomy-coloring-book/checkout");
      return;
    }

    if (verified.current) return;
    verified.current = true;

    const cacheKey = orderId ? `anatomy_order_${orderId}` : "";

    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const saved = JSON.parse(cached) as {
            amountPaid?: string;
            downloadPath?: string;
          };
          setDownloadPath(saved.downloadPath || "");
          setConfirmedAmount(saved.amountPaid || amountPaid);
          setStatus("ready");
          return;
        }
      } catch {
        // Storage unavailable
      }
    }

    const run = async () => {
      try {
        const res = await fetch("/api/checkout/cashfree/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order_id: orderId,
            name,
            email,
            amountPaid,
            product: "anatomy",
            productName: PRODUCT_NAME,
          }),
        });
        const data = await res.json();

        if (!res.ok || !data.verified) {
          console.warn("Anatomy Cashfree order not verified or cancelled:", data);
          setStatus("failed");
          return;
        }

        const paidAmount = String(data.amountPaid ?? amountPaid);
        setDownloadPath(data.downloadPath || "");
        setConfirmedAmount(paidAmount);
        setStatus("ready");

        if (cacheKey) {
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({
                amountPaid: paidAmount,
                downloadPath: data.downloadPath || "",
              })
            );
          } catch {
            // Storage is optional
          }
        }

        if (!purchaseTracked.current && typeof window !== "undefined") {
          purchaseTracked.current = true;

          const w = window as unknown as {
            dataLayer?: unknown[];
            gtag?: (...args: unknown[]) => void;
            fbq?: (...args: unknown[]) => void;
          };

          const finalPaid = Number(paidAmount) || 149;

          w.dataLayer = w.dataLayer || [];
          if (typeof w.gtag !== "function") {
            w.gtag = function () {
              w.dataLayer?.push(arguments);
            };
          }
          w.gtag("event", "purchase", {
            transaction_id: orderId || `ord_${Date.now()}`,
            value: finalPaid,
            currency: "INR",
            items: [
              {
                item_id: "anatomy-coloring-book",
                item_name: PRODUCT_NAME,
                price: finalPaid,
                quantity: 1,
              },
            ],
          });

          const fireFbPurchase = (attempts = 0) => {
            if (typeof w.fbq === "function") {
              w.fbq(
                "track",
                "Purchase",
                {
                  value: finalPaid,
                  currency: "INR",
                  content_name: PRODUCT_NAME,
                  content_type: "product",
                },
                { eventID: orderId || `ord_${Date.now()}` }
              );
            } else if (attempts < 15) {
              setTimeout(() => fireFbPurchase(attempts + 1), 250);
            }
          };
          fireFbPurchase();
        }
      } catch (err) {
        console.error("Anatomy verification error:", err);
        setStatus("failed");
      }
    };

    run();
  }, [router, name, email, amountPaid, orderId]);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {status === "failed" ? (
          <>
            <div className={`${styles.iconStrip} ${styles.iconStripWarn}`}>
              <ShieldAlert size={17} />
              <span>Payment Received • Access Pending</span>
            </div>
            <div className={styles.cardBody}>
              <h1 className={styles.title}>Payment Under Verification</h1>
              <p className={styles.lead}>
                If amount was debited from your account,{" "}
                <strong>your order is 100% safe!</strong> Tap below to message
                our support directly on WhatsApp to receive your instant PDF
                link.
              </p>
              {orderId && (
                <div className={styles.orderMeta}>
                  Order ID: <strong>{orderId}</strong>
                </div>
              )}
              <a
                className={styles.whatsappBtn}
                href={`https://wa.me/919104826422?text=${encodeURIComponent(
                  `Hi Support, I paid for the Anatomy Coloring Book Bundle. Order ID: ${orderId || "N/A"}. Please send my PDF download link.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Get PDF on WhatsApp Instantly
              </a>
              <Link className={styles.backLink} href="/anatomy-coloring-book">
                <ArrowLeft size={15} /> Back to Anatomy Coloring Book
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className={styles.iconStrip}>
              <CheckCircle2 size={17} />
              <span>Order Confirmed • Instant PDF Ready</span>
            </div>
            <div className={styles.cardBody}>
              <h1 className={styles.title}>
                {name ? `Thank you, ${name}!` : "Thank you!"}
              </h1>
              <p className={styles.lead}>
                Your payment of <strong>₹{confirmedAmount}</strong> is
                confirmed. Your copy of {PRODUCT_NAME} is ready.
              </p>

              {status === "checking" ? (
                <div className={styles.pending}>
                  Confirming your secure access...
                </div>
              ) : downloadPath ? (
                <div className={styles.downloads}>
                  <a className={styles.downloadBtn} href={downloadPath}>
                    <Download size={18} /> Download Your Anatomy Bundle
                  </a>
                </div>
              ) : (
                <div className={styles.pending}>
                  Your download link has been emailed to you.
                </div>
              )}

              {email && (
                <div className={styles.emailBox}>
                  <Mail size={15} className={styles.emailIcon} />
                  <span>
                    A backup download link was sent to <strong>{email}</strong>
                  </span>
                </div>
              )}

              {orderId && (
                <div className={styles.orderMeta}>
                  Order ID: <strong>{orderId}</strong>
                </div>
              )}

              <a
                className={styles.whatsappBtn}
                href={`https://wa.me/919104826422?text=${encodeURIComponent(
                  `Hi Support, I need help downloading my Anatomy Coloring Book PDF. Order ID: ${orderId || "N/A"}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Need download help? Chat on WhatsApp
              </a>

              <div>
                <Link className={styles.backLink} href="/anatomy-coloring-book">
                  <ArrowLeft size={15} /> Back to Anatomy Coloring Book
                </Link>
              </div>
            </div>
          </>
        )}

        <p className={styles.disclaimer}>
          For education and self-study purposes only. Use alongside your regular
          textbooks and study materials.
        </p>
      </div>
    </main>
  );
}

export default function AnatomyThankYou() {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <div className={styles.pending}>Loading order status...</div>
            </div>
          </div>
        </main>
      }
    >
      <AnatomyThankYouContent />
    </Suspense>
  );
}
