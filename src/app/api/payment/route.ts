import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe';
import prisma from '../../../../prisma/client'
import { addJobs } from "@/app/packages/config/Producer";
const stripe = new Stripe("sk_test_51OIvAGSD2kCc8s2SYDHpuMhpgVK2IU1uVauX7vMa9Ry6MDOaHrI5cisyya3ap9WYm5G0IHf35qwAU5untJdqUTPB00iM4uhOTN");

export async function POST(request: NextRequest) {
  console.log(Date.now());
  
    console.log('requestMADEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
    
    const {session_id, userId} = await request.json();
  const user= await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
    // Return a successful response immediately
    NextResponse.json({received: true});
  
    // Then handle the payment
    const { payment_intent } = await stripe?.checkout.sessions.retrieve(session_id);
    const session = await stripe.checkout.sessions.retrieve(session_id);
    //@ts-ignore
    const courseId = session.metadata.courseId;
    //@ts-ignore
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);
  
    if(!courseId){
      return NextResponse.json({msg:'No courseId Provided'})
    }
  const course= await prisma.course.findUnique({
    where: {
      id: courseId
    }
  })
    if (paymentIntent.status === 'succeeded') {
        const existingPurchase = await prisma.purchase.findFirst({
            where: {
              userId: userId,
              courseId: courseId,
            },
          });
          if(!existingPurchase){
            console.log('TFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF');
            
            const payment = await prisma.payment.create({
                data: {
                  userId: userId,
                  courseId: courseId,
                  status: 'succeeded',
                  paymentMethod:paymentIntent.payment_method_types[0] ,
                  currency: paymentIntent.currency,
                },
              });
          
              const purchase = await prisma.purchase.create({
                data: {
                  userId,
                  courseId,
                },
              });
          
              await prisma.user.update({
                where: { id:userId},
                data: { purchases: { connect: { id: purchase.id } } },
              });
          
              await prisma.course.update({
                where: { id: courseId },
                data: { purchases: { connect: { id: purchase.id } } },
              });
          addJobs(user.email,`Regarding Successfully purchase of the Course ${course.title}`,`Thanks for purchasing the Course from Courseify, You have paid Rs ${course.price}.`)
              return  NextResponse.json({msg:'succeeded'})
            }
          }
    else{
      return NextResponse.json({msg:'failed'})
    }
  }
