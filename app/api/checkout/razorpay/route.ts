import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    // Check if we are in mock mode (using placeholders)
    const isMock =
      !keyId ||
      keyId.includes("your_key_id") ||
      !keySecret ||
      keySecret.includes("your_key_secret");

    if (isMock) {
      console.log("Razorpay mock mode: Using simulated Order ID");
      return NextResponse.json({
        orderId: `order_mock_${Math.random().toString(36).substring(2, 11)}`,
        amount: 14800,
        currency: "INR",
        mock: true,
      });
    }

    const body = await req.json().catch(() => ({}));
    const amount = body.amount ? Number(body.amount) : 148;
    const amountInPaise = amount * 100;

    // Call Razorpay API to create an order
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
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.description || "Razorpay API error");
    }

    return NextResponse.json({
      orderId: data.id,
      amount: data.amount,
      currency: data.currency,
      mock: false,
    });
  } catch (error: any) {
    console.error("Razorpay order API error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create order" },
      { status: 500 }
    );
  }
}
