import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51OIvAGSD2kCc8s2SYDHpuMhpgVK2IU1uVauX7vMa9Ry6MDOaHrI5cisyya3ap9WYm5G0IHf35qwAU5untJdqUTPB00iM4uhOTN", {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  // Only accept POST requests


  // Get the raw request body as a string
  const reqBody = await req.text();
  console.log(reqBody,'reqbodydyyyyyyyyyy');
  
  // Get the signature header
  const signature = req.headers["stripe-signature"] as string;
  console.log(signature,'signatureeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  
  // Get the webhook secret from the environment variables
  const webhookSecret = "whsec_0geP2FgFZeEsAQSUeQ9jmsfLzBeIFEHR";
  let event;

  // Verify the event data
  try {
    event = stripe.webhooks.constructEvent(
      reqBody,
      signature,
      webhookSecret
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({msg:`Webhook Error: ${err.message}`});
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      // Here you should implement your business logic
      const session = event.data.object; // Get the session object
      handleCheckoutSession(session); // Call a function to handle the session
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}

// Define a function to handle the checkout session
async function handleCheckoutSession(session) {
  // Retrieve the line items from the session
  const checkoutSession = await stripe.checkout.sessions.retrieve(
    session.id,
    { expand: ["line_items"] }
  );
  const lineItems = checkoutSession.line_items.data;
  console.log(lineItems);

  // Save the line items to your database
  // Your logic for saving the items to the database goes here
}
