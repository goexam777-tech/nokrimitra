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

import styles from "./ty.module.css";

const PRODUCT_NAME = "OPD Mastery E-book (2026 Edition)";

type VerifiedDownload = {
  label: string;
  path: string;
};

function OpdThankYouContent() {
  const router = useRouter();
  const params = useSearchParams();
  const verified = useRef(false);

  const [status, setStatus] = useState<"checking" | "ready" | "failed">(
    "checking"
  );
  const [downloadPath, setDownloadPath] = useState("");
  const [downloads, setDownloads] = useState<VerifiedDownload[]>([]);
  const [confirmedAmount, setConfirmedAmount] = useState(
    params.get("amountPaid") || "99"
  );

  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const amountPaid = params.get("amountPaid") || "99";
  const addons = params.get("addons") || "";
  const orderId =
    params.get("razorpay_order_id") ||
    params.get("order_id") ||
    params.get("orderId") ||
    "";
  const paymentId =
    params.get("razorpay_payment_id") ||
    params.get("payment_id") ||
    "";
  const signature = params.get("razorpay_signature") || "";
  const isMock = params.get("mock") === "true";

  useEffect(() => {
    // If no order ID, user didn't initiate payment -> redirect to checkout
    if (!orderId) {
      router.replace("/opd-mastery/checkout");
      return;
    }

    if (verified.current) return;
    verified.current = true;

    const cacheKey = orderId ? `opd_order_${orderId}` : "";

    // A page refresh keeps the same query string.
    if (cacheKey) {
      try {
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const saved = JSON.parse(cached) as {
            amountPaid?: string;
            downloadPath?: string;
            downloads?: VerifiedDownload[];
          };
          setDownloadPath(saved.downloadPath || "");
          setDownloads(saved.downloads || []);
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
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId || (isMock ? "pay_mock_direct" : ""),
            razorpay_order_id: orderId,
            razorpay_signature: signature || (isMock ? "mock_signature" : ""),
            name,
            email,
            amountPaid,
            product: "opd",
            productName: PRODUCT_NAME,
            addons,
          }),
        });
        const data = await res.json();

        // If payment was cancelled, failed, or unverified -> return to checkout
        if (!res.ok || !data.verified) {
          console.warn("OPD Razorpay order not verified or cancelled:", data);
          router.replace("/opd-mastery/checkout?payment_status=cancelled");
          return;
        }

        const verifiedDownloads: VerifiedDownload[] = Array.isArray(data.downloads)
          ? data.downloads
          : [];
        const paidAmount = String(data.amountPaid ?? amountPaid);
        setDownloadPath(data.downloadPath || "");
        setDownloads(verifiedDownloads);
        setConfirmedAmount(paidAmount);
        setStatus("ready");

        if (cacheKey) {
          try {
            sessionStorage.setItem(
              cacheKey,
              JSON.stringify({
                amountPaid: paidAmount,
                downloadPath: data.downloadPath || "",
                downloads: verifiedDownloads,
              })
            );
          } catch {
            // Storage is optional
          }
        }

        if (data.alreadyFulfilled) {
          return;
        }

        let trackAttempts = 0;
        const firePurchase = () => {
          const w = window as unknown as {
            fbq?: (...a: unknown[]) => void;
            gtag?: (...a: unknown[]) => void;
          };

          if (!w.fbq && !w.gtag && trackAttempts < 15) {
            trackAttempts++;
            window.setTimeout(firePurchase, 200);
            return;
          }

          if (w.fbq) {
            w.fbq(
              "track",
              "Purchase",
              {
                value: Number(paidAmount),
                currency: "INR",
                content_name: PRODUCT_NAME,
              },
              { eventID: orderId }
            );
          }

          if (w.gtag) {
            w.gtag("event", "purchase", {
              transaction_id: orderId || `ord_${Date.now()}`,
              value: Number(paidAmount),
              currency: "INR",
              items: verifiedDownloads.length
                ? verifiedDownloads.map((item) => ({
                    item_name: item.label,
                    price: Number(paidAmount),
                    quantity: 1,
                  }))
                : [
                    {
                      item_name: PRODUCT_NAME,
                      price: Number(paidAmount),
                      quantity: 1,
                    },
                  ],
            });
          }
        };

        firePurchase();
      } catch (err) {
        console.error("OPD verification error:", err);
        setStatus("failed");
      }
    };

    run();
  }, [router, name, email, amountPaid, addons, orderId, paymentId, signature, isMock]);

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        {status === "failed" ? (
          <>
            <span className={`${styles.icon} ${styles.iconWarn}`}>
              <ShieldAlert size={16} /> Payment unconfirmed
            </span>
            <h1>We could not confirm this payment</h1>
            <p className={styles.lead}>
              If money was debited, your order is safe. Send us your order
              details and we will share the download link.
            </p>
            <a
              className={styles.primary}
              href="mailto:goexam777@gmail.com?subject=OPD%20Mastery%20order%20help"
            >
              <Mail size={18} /> Contact support
            </a>
          </>
        ) : (
          <>
            <span className={styles.icon}>
              <CheckCircle2 size={16} /> Order confirmed
            </span>
            <h1>{name ? `Thank you, ${name}!` : "Thank you!"}</h1>
            <p className={styles.lead}>
              Your payment of <strong>₹{confirmedAmount}</strong> is confirmed.
              {downloads.length > 1
                ? " Both of your PDFs are ready to download below."
                : ` Your copy of ${PRODUCT_NAME} is ready.`}
            </p>

            {status === "checking" ? (
              <p className={styles.pending}>Confirming your payment...</p>
            ) : downloads.length ? (
              <div className={styles.downloads}>
                {downloads.map((item) => (
                  <a className={styles.primary} href={item.path} key={item.path}>
                    <Download size={18} /> Download {item.label}
                  </a>
                ))}
              </div>
            ) : downloadPath ? (
              <a className={styles.primary} href={downloadPath}>
                <Download size={18} /> Download OPD Mastery E-book
              </a>
            ) : (
              <p className={styles.pending}>
                Your download link has been emailed to you.
              </p>
            )}

            {email && (
              <p className={styles.emailNote}>
                <Mail size={14} /> A copy of the link was sent to{" "}
                <strong>{email}</strong>
              </p>
            )}

            {orderId && <p className={styles.order}>Order ID: {orderId}</p>}
          </>
        )}

        <Link className={styles.backLink} href="/opd-mastery">
          <ArrowLeft size={15} /> Back to OPD Mastery
        </Link>

        <p className={styles.disclaimer}>
          For education and quick reference only, not medical advice. Follow
          current guidelines and qualified clinical judgement.
        </p>
      </div>
    </main>
  );
}

export default function OpdThankYou() {
  return (
    <Suspense
      fallback={
        <main className={styles.page}>
          <div className={styles.card}>
            <p className={styles.pending}>Loading order status...</p>
          </div>
        </main>
      }
    >
      <OpdThankYouContent />
    </Suspense>
  );
}
