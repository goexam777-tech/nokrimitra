"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Download,
  FileText,
  Globe,
  Infinity as InfinityIcon,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Star,
  Zap,
} from "lucide-react";

import coverImg from "@/public/evguide.webp";
import trustImg from "@/public/trust.webp";
import reviewerImg from "@/public/rahul-patel.webp";
import { ESCOOTER_CATALOG } from "@/lib/escooterCatalog";
import styles from "./checkout.module.css";

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as unknown as { Razorpay?: unknown }).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function EscooterCheckout() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const analytics = window as unknown as {
      fbq?: (...args: unknown[]) => void;
      gtag?: (...args: unknown[]) => void;
    };
    analytics.fbq?.("track", "InitiateCheckout", {
      value: ESCOOTER_CATALOG.price,
      currency: "INR",
      content_name: ESCOOTER_CATALOG.name,
    });
    analytics.gtag?.("event", "begin_checkout", {
      value: ESCOOTER_CATALOG.price,
      currency: "INR",
      items: [{ item_name: ESCOOTER_CATALOG.name, price: ESCOOTER_CATALOG.price }],
    });
  }, []);

  const handleBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/electric-scooter-repairing");
  };

  const handlePay = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Please enter your name and email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: ESCOOTER_CATALOG.product, name, email }),
      });
      const order = await response.json();
      if (!response.ok) throw new Error(order.error || "Order creation failed");

      const orderTotal = Number(order.total ?? ESCOOTER_CATALOG.price);
      const goToThankYou = (extra: Record<string, string>) => {
        const query = new URLSearchParams({
          name: name.trim(),
          email: email.trim(),
          amountPaid: String(orderTotal),
          product: ESCOOTER_CATALOG.product,
          ...extra,
        });
        router.push(`/electric-scooter-repairing/thank-you?${query}`);
      };

      if (order.mock) {
        setTimeout(() => goToThankYou({ orderId: order.orderId, mock: "true" }), 900);
        return;
      }

      if (!(await loadRazorpay())) {
        throw new Error("Could not load the secure payment window. Please retry.");
      }
      const razorpay = new (window as unknown as {
        Razorpay: new (options: unknown) => { open: () => void };
      }).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || order.keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "NokriMitra",
        description: ESCOOTER_CATALOG.paymentLabel,
        order_id: order.orderId,
        prefill: { name: name.trim(), email: email.trim() },
        theme: { color: "#17192B" },
        modal: { ondismiss: () => setLoading(false) },
        handler: (result: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => goToThankYou(result),
      });
      razorpay.open();
    } catch (paymentError) {
      setError(
        paymentError instanceof Error
          ? paymentError.message
          : "Payment could not be started. Please try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.bar}>
        <div className={styles.barInner}>
          <button className={styles.back} type="button" onClick={handleBack}><ArrowLeft size={17} /> Back</button>
          <span className={styles.brand}>Nokri<span>Mitra</span></span>
          <span className={styles.secure}><LockKeyhole size={14} /> Secure checkout</span>
        </div>
      </header>

      <main className={styles.wrap}>
        <div className={styles.grid}>
          <section className={styles.product}>
            <p className={styles.eyebrow}>Your digital bundle</p>
            <h1>Master EV Scooter Repairing - All in One Bundle</h1>
            <div className={styles.socialProof}>
              <span className={styles.spStars} aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#f5a623" stroke="none" />
                ))}
              </span>
              <span className={styles.spRating}>4.9/5</span>
              <span className={styles.spDivider} aria-hidden="true" />
              <span className={styles.spText}>
                Trusted by <b>2000+</b> EV technicians &amp; students
              </span>
            </div>
            <div className={styles.productRow}>
              <Image className={styles.cover} src={coverImg} alt="Electric Scooter Repairing bundle" priority />
              <div>
                <strong>{ESCOOTER_CATALOG.name}</strong>
                <p><FileText size={14} /> 3 digital PDF books</p>
              </div>
            </div>
            <ul className={styles.included}>
              {ESCOOTER_CATALOG.books.map((book, index) => (
                <li key={book.title}>
                  <span className={styles.bookNum}>{index + 1}</span>
                  {book.title}
                </li>
              ))}
            </ul>
            <ul className={styles.chips}>
              <li><Zap size={15} /> Instant download</li>
              <li><Globe size={15} /> Hindi &amp; English</li>
              <li><InfinityIcon size={15} /> Lifetime access</li>
              <li><ShieldCheck size={15} /> Secure payment</li>
            </ul>
          </section>

          <section className={styles.checkoutCard} aria-labelledby="checkout-title">
            <p className={styles.step}>Complete your order</p>
            <h2 id="checkout-title">Enter your details</h2>
            <p className={styles.cardLead}>
              Your bundle link will be sent to this email after payment.
            </p>
            <form onSubmit={handlePay}>
              {error && <div className={styles.error} role="alert">{error}</div>}
              <label className={styles.field}>
                <span>Full name</span>
                <input type="text" autoComplete="name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} required />
              </label>
              <label className={styles.field}>
                <span>Email address</span>
                <input type="email" autoComplete="email" inputMode="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} required />
              </label>

              <div className={styles.orderLine}><span>3-Book Digital Bundle</span><strong>₹{ESCOOTER_CATALOG.price}</strong></div>
              <div className={styles.total}><span>Total <small>One-time payment</small></span><strong>₹{ESCOOTER_CATALOG.price}</strong></div>

              <button className={styles.payButton} type="submit" disabled={loading}>
                {loading ? (
                  "Please wait..."
                ) : (
                  <>
                    <LockKeyhole size={18} /> Get 3 eBooks - ₹
                    {ESCOOTER_CATALOG.price}
                  </>
                )}
              </button>
              <Image
                className={styles.trust}
                src={trustImg}
                alt="Trusted, secure checkout"
                sizes="360px"
              />
              <p className={styles.note}><ShieldCheck size={14} /> Payment details are handled securely by Razorpay.</p>
            </form>
            <div className={styles.steps}>
              <p className={styles.stepsTitle}>What happens next</p>
              <ol>
                <li>
                  <span className={styles.stepNum}><LockKeyhole size={15} /></span>
                  <div>
                    <strong>Pay securely</strong>
                    <small>Complete your ₹{ESCOOTER_CATALOG.price} payment via Razorpay.</small>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}><Mail size={15} /></span>
                  <div>
                    <strong>Get your email</strong>
                    <small>Your download link is emailed instantly.</small>
                  </div>
                </li>
                <li>
                  <span className={styles.stepNum}><Download size={15} /></span>
                  <div>
                    <strong>Download &amp; start</strong>
                    <small>Open all 3 books right away, on any device.</small>
                  </div>
                </li>
              </ol>
            </div>
            <div className={styles.guarantee}>
              <BadgeCheck size={20} />
              <p>
                <strong>Instant delivery guarantee.</strong> Your download
                appears right after payment and is emailed to you. Any problem?
                Write to{" "}
                <a href="mailto:support@nokrimitra.in">support@nokrimitra.in</a>.
              </p>
            </div>
            <nav className={styles.legal} aria-label="Legal links">
              <a href="/electric-scooter-repairing/privacy-policy">Privacy</a>
              <a href="/electric-scooter-repairing/refund-policy">Refund</a>
              <a href="/electric-scooter-repairing/terms">Terms</a>
              <a href="/electric-scooter-repairing/disclaimer">Disclaimer</a>
            </nav>
          </section>
        </div>

        <figure className={styles.review}>
          <span className={styles.reviewStars} aria-label="Rated 5 out of 5">
            ★★★★★
          </span>
          <blockquote>
            Electric scooters were coming into my shop with dead batteries and
            motor grinding issues. After reading this guide I traced a BMS fault
            in 10 minutes. Extremely useful handbook.
          </blockquote>
          <figcaption>
            <Image
              className={styles.reviewAvatar}
              src={reviewerImg}
              alt="Ramesh Kumar"
            />
            <span>
              <strong>Ramesh Kumar</strong>
              <small>EV Technician, Lucknow</small>
            </span>
          </figcaption>
        </figure>
      </main>
    </div>
  );
}
