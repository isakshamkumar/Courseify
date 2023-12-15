import { loadStripe } from "@stripe/stripe-js";

// export type course = {
//     thumbnail: string,
//     description: string,
//     title: string,
//     rating: number,
//     reviews: number,
//     price: number,
//     instructor: string
    
// };

export const makePayment = async (course: any) => {
  const stripe = await loadStripe(
    "pk_test_51OIvAGSD2kCc8s2SsDpoYtNUZX7rsHp0fkrTUPcRwlDgVGtY6ytSUOeXryDsmbtW4xr6aBsaaMa4A6SgFBPYmwDP00MiQpKuP7"
  );
  const body = {
    course: course,
  };
  const header = {
    "Content-Type": "application/json",
  };
  const response = await fetch(
    "/api/create-checkout-session",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: header,
    }
  );
  const session = await response.json();
  console.log(session ,'session from stripe');
  
  const result = stripe?.redirectToCheckout({
    sessionId: session.sessionId,
  });
  if(await result){
    console.log(await result);
    
  }
  
  if((await result).error){
    console.log((await result).error);
    
  }
};
