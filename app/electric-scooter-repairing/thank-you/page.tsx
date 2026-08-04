"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Download, Mail, ShieldCheck } from "lucide-react";
import styles from "./ty.module.css";

const DEFAULT_PRODUCT_NAME =
  "Electric Scooter Repairing Complete Practical Guide (Hindi)";

function Content() {
  const sp = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [downloadPath, setDownloadPath] = useState("");
  const done = useRef(false);

  const orderId = sp.get("orderId") || sp.get("razorpay_order_id") || "N/A";
  const paymentId = sp.get("razorpay_payment_id") || "";
  const productName = sp.get("productName") || DEFAULT_PRODUCT_NAME;
  const amountPaid = sp.get("amountPaid") || "149";
  const email = sp.get("email") || "";
  const name = sp.get("name") || "";

  useEffect(() => {
    if (done.current) return;
    done.current = true;

    const isMock =
      sp.get("mock") === "true" || orderId.startsWith("order_mock_");
    const signature = sp.get("razorpay_signature") || "";

    // One order must be counted (and emailed) only once, even if the buyer
    // refreshes or reopens this page later.
    const storageKey = `nm_escooter_purchase_${orderId}`;

    // Stores the signed download path, so a refresh keeps working without
    // re-verifying, re-sending the email or re-firing purchase events.
    const readProcessed = () => {
      try {
        return window.localStorage.getItem(storageKey);
      } catch {
        return null;
      }
    };

    const markProcessed = (path: string) => {
      try {
        window.localStorage.setItem(storageKey, path || "done");
      } catch {
        // Private mode or storage disabled: tracking simply isn't deduplicated.
      }
    };

    const track = () => {
      const w = window as unknown as {
        fbq?: (...a: unknown[]) => void;
        gtag?: (...a: unknown[]) => void;
      };
      if (typeof window !== "undefined" && w.fbq) {
        w.fbq(
          "track",
          "Purchase",
          {
            value: Number(amountPaid),
            currency: "INR",
            content_name: productName,
          },
          // Same eventID lets Meta drop duplicates of this order.
          { eventID: `escooter_${orderId}` }
        );
      }
      if (typeof window !== "undefined" && w.gtag) {
        w.gtag("event", "purchase", {
          transaction_id: orderId,
          value: Number(amountPaid),
          currency: "INR",
          items: [{ item_name: productName }],
        });
      }
    };

    // Already handled earlier: show the success state without re-verifying,
    // re-sending the email, or re-firing purchase events.
    const stored = orderId !== "N/A" ? readProcessed() : null;
    if (stored) {
      if (stored !== "done") setDownloadPath(stored);
      setLoading(false);
      return;
    }

    // Without Razorpay's payment id and signature there is nothing to verify,
    // so no download link is issued.
    if (!isMock && (!paymentId || !signature)) {
      setError(
        "इस order की payment details नहीं मिलीं. अगर आपने payment किया है तो अपना Order ID WhatsApp पर भेजें."
      );
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            // Mock orders (local dev) carry no Razorpay ids; the server only
            // honours them while Razorpay keys are placeholders.
            razorpay_payment_id: paymentId || (isMock ? `pay_mock_${orderId}` : ""),
            razorpay_order_id: orderId,
            razorpay_signature: signature || (isMock ? "mock" : ""),
            name,
            email,
            amountPaid,
            product: "escooter",
            productName,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Verification fail हो गया.");
        const path = typeof data.downloadPath === "string" ? data.downloadPath : "";
        if (path) setDownloadPath(path);
        setLoading(false);
        markProcessed(path);
        track();
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Payment verify करने में समस्या आई."
        );
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Payment verify हो रहा है…</p>
        <p className={styles.loadingNote}>
          कृपया यह page बंद या refresh न करें.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {error ? (
          <>
            <div className={styles.stripFail}>Verification pending</div>
            <div className={styles.body}>
              <h1 className={styles.titleFail}>Verification पूरा नहीं हो सका</h1>
              <p className={styles.sub}>{error}</p>
              <p className={styles.note}>
                अगर आपके पैसे कट गए हैं तो चिंता न करें. अपना Order ID (
                <b>{orderId}</b>) WhatsApp पर भेजें, हम तुरंत मदद करेंगे.
              </p>
              <a
                className={styles.primaryBtn}
                href={`https://wa.me/919104826422?text=${encodeURIComponent(
                  `नमस्ते, मेरा Electric Scooter Repairing Guide का payment verification fail हो गया है. Order ID: ${orderId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Support
              </a>
            </div>
          </>
        ) : (
          <>
            <div className={styles.strip}>
              <span className={styles.stripLabel}>Payment successful</span>
              <h1 className={styles.title}>
                धन्यवाद{name ? `, ${name}` : ""}! आपकी PDF तैयार है
              </h1>
              <p className={styles.stripSub}>{productName}</p>
            </div>

            <div className={styles.body}>
              {downloadPath ? (
                <a
                  className={styles.primaryBtn}
                  href={downloadPath}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download size={19} />
                  अभी PDF Download करें
                </a>
              ) : (
                <div className={styles.tipBox}>
                  <Mail size={19} />
                  <div>
                    <strong>Download link आपके email पर भेजा गया है</strong>
                    <p>
                      इस page से link नहीं खुल रहा हो तो email में मिला download
                      button इस्तेमाल करें.
                    </p>
                  </div>
                </div>
              )}

              {email ? (
                <p className={styles.emailNote}>
                  <Mail size={15} />
                  <span>
                    Download link आपके email <strong>{email}</strong> पर भी भेज
                    दिया गया है.
                  </span>
                </p>
              ) : null}

              <p className={styles.cardIndex}>Order details</p>
              <div className={styles.details}>
                <div className={styles.row}>
                  <span>Order ID</span>
                  <span className={styles.val}>{orderId}</span>
                </div>
                {paymentId ? (
                  <div className={styles.row}>
                    <span>Payment ID</span>
                    <span className={styles.val}>{paymentId}</span>
                  </div>
                ) : null}
                <div className={styles.row}>
                  <span>Product</span>
                  <span className={styles.val}>{productName}</span>
                </div>
                <div className={styles.row}>
                  <span>चुकाई गई रकम</span>
                  <span className={`${styles.val} ${styles.valAmount}`}>
                    ₹{amountPaid}/-
                  </span>
                </div>
              </div>

              <div className={styles.tipBox}>
                <ShieldCheck size={19} />
                <div>
                  <strong>PDF को save कर लें</strong>
                  <p>
                    File अपने phone या computer में save रखें. Email न दिखे तो
                    Spam या Promotions folder ज़रूर चेक करें.
                  </p>
                </div>
              </div>

              <div className={styles.footRow}>
                <a
                  className={styles.ghostBtn}
                  href={`https://wa.me/919104826422?text=${encodeURIComponent(
                    "नमस्ते, मुझे Electric Scooter Repairing Complete Practical Guide (Hindi) के download में मदद चाहिए."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download में मदद चाहिए?
                </a>
                <a href="/electric-scooter-repairing" className={styles.back}>
                  मुख्य page पर जाएँ
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function EscooterThankYou() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          <div className={styles.spinner} />
        </div>
      }
    >
      <Content />
    </Suspense>
  );
}
