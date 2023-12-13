import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
const stripe = new Stripe("sk_test_51OIvAGSD2kCc8s2SYDHpuMhpgVK2IU1uVauX7vMa9Ry6MDOaHrI5cisyya3ap9WYm5G0IHf35qwAU5untJdqUTPB00iM4uhOTN");

export async function POST(request: NextRequest) {
    const course = await request.json();
    // console.log(course);
    
    const { title:name, description, thumbnail:image, price } = course.course;
    const amount = Math.round(price * 100); // Convert to the smallest currency unit

    try {
        const session = await stripe.checkout.sessions.create({
          mode: 'payment',
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                product_data: {
                  name: name,
                  description: description,
                  images: [image],
                },
                unit_amount: amount,
                currency: "INR",
              },
              quantity: 1,
            },
          ],
          success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${request.headers.get('origin')}/payment/canceled`,
        });
    
        return  NextResponse.json({sessionId:session.id});
      } catch (error) {
        return new Response(JSON.stringify({ error: { message: error.message } }), { status: 400 });
      }
}
