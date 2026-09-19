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

import { trackAnatomyMetaEvent } from "@/lib/anatomyTracking";
import styles from "../../opd-mastery-ebook/thank-you/thank-you.module.css";

const PRODUCT_NAME = "500+ Human Anatomy Coloring Book Bundle";
const PRICE = 149;

type CachedOrder = {
  amountPaid: string;
  downloadPath: string;
  customerName: string;
  customerEmail: string;
  emailDelivered: boolean;
};

function AnatomyThankYouContent() {
  const router = useRouter();
  const params = useSearchParams();
  const verificationStarted = useRef(false);
  const purchaseTracked = useRef(false);

  const [status, setStatus] = useState<"checking" | "ready" | "failed">(
    "checking"
  );
  const [downloadPath, setDownloadPath] = useState("");
  const [confirmedAmount, setConfirmedAmount] = useState(String(PRICE));
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [emailDelivered, setEmailDelivered] = useState(false);

  const orderId = params.get("order_id") || params.get("orderId") || "";
  const queryPaymentId = params.get("razorpay_payment_id") || "";
  const querySignature = params.get("razorpay_signature") || "";
  const queryMock = params.get("mock") === "true";

  useEffect(() => {
    if (!orderId) {
      router.replace("/anatomy-coloring-book/checkout");
      return;
    }
    if (verificationStarted.current) return;
    verificationStarted.current = true;

    const cacheKey = `anatomy_order_${orderId}`;
    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        const saved = JSON.parse(cached) as CachedOrder;
        setConfirmedAmount(saved.amountPaid || String(PRICE));
        setDownloadPath(saved.downloadPath || "");
        setCustomerName(saved.customerName || "");
        setCustomerEmail(saved.customerEmail || "");
        setEmailDelivered(Boolean(saved.emailDelivered));
        setStatus("ready");
        return;
      }
    } catch {
      // Storage is optional.
    }

    let paymentProof: {
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      mock?: string;
      name?: string;
      email?: string;
    } = {};
    try {
      const savedProof = sessionStorage.getItem(
        `anatomy_payment_proof_${orderId}`
      );
      if (savedProof) paymentProof = JSON.parse(savedProof);
    } catch {
      // Browser storage may be unavailable; webhook delivery remains active.
    }

    const paymentId =
      queryPaymentId || String(paymentProof.razorpay_payment_id || "");
    const signature =
      querySignature || String(paymentProof.razorpay_signature || "");
    const isMock = queryMock || paymentProof.mock === "true";
    const proofName = String(paymentProof.name || "");
    const proofEmail = String(paymentProof.email || "");

    const verifyPayment = async () => {
      try {
        const response = await fetch("/api/checkout/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_payment_id:
              paymentId || (isMock ? `pay_mock_${orderId}` : ""),
            razorpay_order_id: orderId,
            razorpay_signature: signature || (isMock ? "mock_signature" : ""),
            product: "anatomy",
            name: proofName,
            email: proofEmail,
            amountPaid: PRICE,
          }),
        });
        const data = await response.json();

        if (!response.ok || !data.verified || !data.downloadPath) {
          console.warn("Anatomy Razorpay payment was not verified:", data);
          setStatus("failed");
          return;
        }

        const paidAmount = String(data.amountPaid ?? PRICE);
        const verifiedName = String(data.customerName || proofName || "Student");
        const verifiedEmail = String(data.customerEmail || proofEmail || "");
        const verifiedDownloadPath = String(data.downloadPath);
        const wasEmailDelivered = Boolean(data.emailDelivered);

        setConfirmedAmount(paidAmount);
        setCustomerName(verifiedName);
        setCustomerEmail(verifiedEmail);
        setDownloadPath(verifiedDownloadPath);
        setEmailDelivered(wasEmailDelivered);
        setStatus("ready");

        if (!purchaseTracked.current) {
          purchaseTracked.current = true;
          const windowWithTracking = window as unknown as {
            dataLayer?: unknown[];
            gtag?: (...args: unknown[]) => void;
          };
          windowWithTracking.dataLayer = windowWithTracking.dataLayer || [];
          if (typeof windowWithTracking.gtag !== "function") {
            windowWithTracking.gtag = function () {
              windowWithTracking.dataLayer?.push(arguments);
            };
          }

          windowWithTracking.gtag("event", "purchase", {
            transaction_id: orderId,
            value: Number(paidAmount) || PRICE,
            currency: "INR",
            items: [
              {
                item_id: "anatomy-coloring-book",
                item_name: PRODUCT_NAME,
                price: Number(paidAmount) || PRICE,
                quantity: 1,
              },
            ],
          });

          trackAnatomyMetaEvent(
            "Purchase",
            {
              value: Number(paidAmount) || PRICE,
              currency: "INR",
              content_name: PRODUCT_NAME,
              content_type: "product",
            },
            orderId
          );
        }

        if (wasEmailDelivered) {
          try {
            const cache: CachedOrder = {
              amountPaid: paidAmount,
              downloadPath: verifiedDownloadPath,
              customerName: verifiedName,
              customerEmail: verifiedEmail,
              emailDelivered: true,
            };
            sessionStorage.setItem(cacheKey, JSON.stringify(cache));
            sessionStorage.removeItem(`anatomy_payment_proof_${orderId}`);
          } catch {
            // Storage is optional.
          }
        }
      } catch (error) {
        console.error("Anatomy Razorpay verification error:", error);
        setStatus("failed");
      }
    };

    void verifyPayment();
  }, [router, orderId, queryPaymentId, querySignature, queryMock]);

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
                If the amount was debited, <strong>your order is safe.</strong>{" "}
                Contact support with the Order ID below and we will verify it.
              </p>
              {orderId && (
                <div className={styles.orderMeta}>
                  Order ID: <strong>{orderId}</strong>
                </div>
              )}
              <a
                className={styles.whatsappBtn}
                href={`https://wa.me/919104826422?text=${encodeURIComponent(
                  `Hi Support, I paid for the Anatomy Coloring Book Bundle. Order ID: ${orderId || "N/A"}. Please verify my payment and send the PDF link.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact WhatsApp Support
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
                {customerName ? `Thank you, ${customerName}!` : "Thank you!"}
              </h1>
              <p className={styles.lead}>
                Your payment of <strong>₹{confirmedAmount}</strong> is
                confirmed. Your {PRODUCT_NAME} is ready.
              </p>

              {status === "checking" ? (
                <div className={styles.pending}>
                  Verifying your Razorpay payment and preparing access...
                </div>
              ) : (
                <div className={styles.downloads}>
                  <a className={styles.downloadBtn} href={downloadPath}>
                    <Download size={18} /> Download Your Anatomy Bundle
                  </a>
                </div>
              )}

              {customerEmail && status === "ready" && (
                <div className={styles.emailBox}>
                  <Mail size={15} className={styles.emailIcon} />
                  <span>
                    {emailDelivered ? (
                      <>
                        A backup download link was sent to{" "}
                        <strong>{customerEmail}</strong>
                      </>
                    ) : (
                      <>
                        Your download is ready above. Email delivery to{" "}
                        <strong>{customerEmail}</strong> is pending; keep your
                        Order ID for support.
                      </>
                    )}
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
                  `Hi Support, I need help downloading my Anatomy Coloring Book PDF. Order ID: ${orderId}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
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
          For education and self-study only. Use alongside your regular
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
