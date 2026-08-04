import crypto from "crypto";

/**
 * Signed download tokens so /go links only work for buyers.
 *
 * A token is `base64url(product.orderId.expiry).hmac` and is created only
 * after a Razorpay signature has been verified server-side. Nothing is stored
 * in a database: the HMAC itself proves the token was issued by us, so the
 * same link keeps working from email on any device.
 */

// Valid for one year, so emailed links stay usable long after purchase.
const TOKEN_TTL_MS = 365 * 24 * 60 * 60 * 1000;

function getSecret(): string | null {
  const secret =
    process.env.DOWNLOAD_TOKEN_SECRET || process.env.RAZORPAY_KEY_SECRET;
  if (!secret || secret.includes("your_key_secret") || secret.trim() === "") {
    return null;
  }
  return secret;
}

function sign(payload: string, secret: string): string {
  return crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
}

/** Returns a download token, or null when no signing secret is configured. */
export function createDownloadToken(
  product: string,
  orderId: string,
  ttlMs: number = TOKEN_TTL_MS
): string | null {
  const secret = getSecret();
  if (!secret || !orderId) return null;

  const payload = `${product}.${orderId}.${Date.now() + ttlMs}`;
  const encoded = Buffer.from(payload, "utf8").toString("base64url");
  return `${encoded}.${sign(payload, secret)}`;
}

export type TokenCheck =
  | { valid: true; orderId: string }
  | { valid: false; reason: "missing" | "malformed" | "invalid" | "expired" };

/** Validates a token for one product without touching any datastore. */
export function verifyDownloadToken(
  product: string,
  token: string | null
): TokenCheck {
  if (!token) return { valid: false, reason: "missing" };

  const secret = getSecret();
  if (!secret) return { valid: false, reason: "invalid" };

  const split = token.lastIndexOf(".");
  if (split <= 0) return { valid: false, reason: "malformed" };

  const encoded = token.slice(0, split);
  const providedSig = token.slice(split + 1);

  let payload: string;
  try {
    payload = Buffer.from(encoded, "base64url").toString("utf8");
  } catch {
    return { valid: false, reason: "malformed" };
  }

  const parts = payload.split(".");
  if (parts.length !== 3) return { valid: false, reason: "malformed" };

  const [tokenProduct, orderId, expiry] = parts;
  const expected = sign(payload, secret);

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return { valid: false, reason: "invalid" };
  }
  if (tokenProduct !== product) return { valid: false, reason: "invalid" };

  const expiryMs = Number(expiry);
  if (!Number.isFinite(expiryMs)) return { valid: false, reason: "malformed" };
  if (Date.now() > expiryMs) return { valid: false, reason: "expired" };

  return { valid: true, orderId };
}
