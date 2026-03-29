import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckOutForm";

const Payment = () => {
  const loadedContest = useLoaderData();
 
  const stripePromise = loadStripe(import.meta.env.VITE_payment_api);
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm loadedContest={loadedContest}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
