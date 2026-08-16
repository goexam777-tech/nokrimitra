"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
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

export default function OpdThankYou() {
  const params = useSearchParams();
  const verified = useRef(false);

  const [status, setStatus] = useState<"checking" | "ready" | "failed">(
    "checking"
  );
  const [downloadPath, setDownloadPath] = useState("");
  const [downloads, setDownloads] = useState<VerifiedDownload[]>([]);
  const [confirmedAmount, setConfirmedAmount] = useState(
    params.get("amountPaid") || "199"
  );

  const name = params.get("name") || "";
  const email = params.get("email") || "";
  const amountPaid = params.get("amountPaid") || "199";
  const addons = params.get("addons") || "";
  const orderId =
    params.get("razorpay_order_id") || params.get("orderId") || "";

  useEffect(() => {
    if (verified.current) return;
    verified.current = true;

    const paymentId = params.get("razorpay_payment_id");
    const signature = params.get("razorpay_signature");
    const isMock = params.get("mock") === "true";
    const cacheKey = orderId ? `opd_order_${orderId}` : "";

    // A page refresh keeps the same query string. Without this guard the verify
    // call would run again, re-sending the delivery email and double-counting
    // the Purchase conversion.
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
        // Ignore unavailable/blocked storage and verify normally.
      }
    }

    const run = async () => {
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id: paymentId || `pay_mock_${Date.now()}`,
            razorpay_order_id: orderId || `order_mock_${Date.now()}`,
            razorpay_signature: signature || "mock_signature",
            name,
            email,
            amountPaid,
            product: "opd",
            productName: PRODUCT_NAME,
            addons,
          }),
        });
        const data = await res.json();

        if (!res.ok || !data.verified) {
          setStatus("failed");
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
            // Storage is optional; verification already succeeded.
          }
        }

        const w = window as unknown as {
          fbq?: (...a: unknown[]) => void;
          gtag?: (...a: unknown[]) => void;
        };
        w.fbq?.("track", "Purchase", {
          value: Number(paidAmount),
          currency: "INR",
        });
        w.gtag?.("event", "purchase", {
          transaction_id: orderId || paymentId || `ord_${Date.now()}`,
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
      } catch {
        setStatus("failed");
      }

      void isMock;
    };

    run();
  }, [params, name, email, amountPaid, addons, orderId]);

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
