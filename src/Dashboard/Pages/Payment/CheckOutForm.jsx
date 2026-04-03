import { CardNumberElement, CardExpiryElement, CardCvcElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import useWinnerData from "../../../hooks/useWinnerData";

const CheckoutForm = ({ loadedContest }) => {
  const { winningCount } = useWinnerData();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxios();
  const { user } = useAuth();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // পেমেন্ট ইনটেন্ট তৈরি করা
    if (loadedContest?.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: loadedContest.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        })
        .catch((err) => {
          console.error("Client Secret Error:", err);
          setError("Failed to initialize payment.");
        });
    }
  }, [axiosSecure, loadedContest]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError("");

    if (!stripe || !elements || !clientSecret) {
      setProcessing(false);
      return;
    }

    const cardNumber = elements.getElement(CardNumberElement);
    const taskSubmission = event.target.task.value; // Textarea থেকে ডাটা নেওয়া

    // পেমেন্ট কনফার্ম করা
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardNumber,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      // ডাটাবেসে পাঠানোর জন্য অবজেক্ট তৈরি
      const registration = {
        email: user?.email,
        name: user?.displayName,
        image: user?.photoURL,
        price: loadedContest.price,
        contestName: loadedContest.contestName,
        creatorEmail: loadedContest.creatorEmail,
        creatorName: loadedContest.creatorName,
        contestId: loadedContest._id,
        transactionId: paymentIntent.id,
        contestImage: loadedContest?.image,
        deadline: loadedContest.deadline,
        date: new Date(),
        status: "pending",
        task: taskSubmission, // এখানে ইউজারের দেয়া টাস্ক সেভ হবে
      };

      try {
        const res = await axiosSecure.post("/registrations", registration);
        
        if (res.data.insertedId) {
          // এটেনডেন্স আপডেট করা
          await axiosSecure.put(`/contests/attendance/${loadedContest._id}`, {
            attendance: (loadedContest.attendance || 0) + 1,
          });

          Swal.fire({
            title: "Success!",
            text: "Payment and Registration Successful!",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
          navigate("/dashboard/myParticipatedContest");
        }
      } catch (err) {
        console.error("Registration Error:", err);
        setError("Payment successful but database update failed.");
      }
      setProcessing(false);
    }
  };

  const isExist = winningCount?.filter(win => win?.contestId === loadedContest._id) || [];

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        "::placeholder": { color: "#aab7c4" },
      },
      invalid: { color: "#9e2146" },
    },
  };

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[calc(100vh-150px)] p-4">
      <div className="p-8 max-w-lg w-full bg-white shadow-2xl rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Complete Payment</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label font-semibold">Task Submission</label>
            <textarea 
              name="task" 
              className="textarea textarea-bordered w-full h-20" 
              required 
              placeholder="Paste your task link or details here..."
            ></textarea>
          </div>

          <div className="space-y-4">
            <div className="p-3 border rounded-lg bg-gray-50">
              <label className="text-xs font-bold text-gray-500 uppercase">Card Number</label>
              <CardNumberElement options={elementOptions} />
            </div>
            
            <div className="flex gap-4">
              <div className="p-3 border rounded-lg bg-gray-50 flex-1">
                <label className="text-xs font-bold text-gray-500 uppercase">Expiration Date</label>
                <CardExpiryElement options={elementOptions} />
              </div>
              <div className="p-3 border rounded-lg bg-gray-50 flex-1">
                <label className="text-xs font-bold text-gray-500 uppercase">CVC</label>
                <CardCvcElement options={elementOptions} />
              </div>
            </div>
          </div>

          {isExist.length > 0 ? (
            <button disabled className="btn btn-block">Already Registered</button>
          ) : (
            <button 
              className="btn btn-primary btn-block text-white font-bold text-lg mt-4" 
              type="submit" 
              // disabled={!stripe || !clientSecret || processing}
            >
              {/* {processing ? "Processing..." : `Pay $${loadedContest?.price}`} */}
              {processing ? "Processing..." : `Pay $`}
            </button>
          )}
        </form>

        {error && <p className="text-red-500 mt-4 text-center font-medium">{error}</p>}
        {transactionId && <p className="text-green-600 mt-2 text-center">Payment ID: {transactionId}</p>}
      </div>
    </div>
  );
};

export default CheckoutForm;