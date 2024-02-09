import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51OIvAGSD2kCc8s2SYDHpuMhpgVK2IU1uVauX7vMa9Ry6MDOaHrI5cisyya3ap9WYm5G0IHf35qwAU5untJdqUTPB00iM4uhOTN");

interface Course {
  id:string,
  title: string;
  description: string;
  thumbnail: string;
  price: number;
}

interface CheckoutSessionResponse {
  sessionId: string;
}

interface LineItem {
  price_data: {
    product_data: {
      name: string;
      description: string;
      images: string[];
    };
    unit_amount: number;
    currency: string;
  };
  quantity: number;
}

export async function POST(request: NextRequest) {
  try {
    const course: { course: Course } = await request.json();
    // console.log(course,'courseeeeeeeeeeeeeeeeeeeeeeeeeeeee');
    
    
    const {id, title, description, thumbnail, price } = course.course;
    console.log(id,'iddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd');
    
    const amount = Math.round(price * 100); // Convert to the smallest currency unit

    const lineItem: LineItem = {
      price_data: {
        product_data: {
          name: title,
          description: description,
          images: [thumbnail],
        },
        unit_amount: amount,
        currency: "INR",
      },
      quantity: 1,
    };

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [lineItem],
      success_url: `${request.headers.get('origin')}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/payment/canceled`,
      metadata:{
courseId:id
      }
    });

    const response: CheckoutSessionResponse = { sessionId: session.id };
    
    return NextResponse.json(response);
  } catch (error) {
    return new Response(JSON.stringify({ error: { message: error } }), { status: 400 });
  }
}
