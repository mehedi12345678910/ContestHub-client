import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
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
  const navigate = useNavigate();
  useEffect(() => {
    if (loadedContest.price > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: loadedContest.price })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, loadedContest]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = event.target.task.value;

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        // now save the payment in the database
        const registration = {
          email: user.email,
          name: user.displayName,
          image: user.photoURL,
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
          task: task,
        };
        

        const res = await axiosSecure.post("/registrations", registration);
      
        if (res?.data) {
          axiosSecure
            .put(`/contests/attendance/${loadedContest._id}`, {
              attendance: loadedContest.attendance + 1,
            })
            .then((res) => {
              console.log(res.data);
              if (res.data.modifiedCount > 0) {
                Swal.fire("success", "payment successfully");
                navigate("/dashboard/myParticipatedContest");
              }
            });
        }
      }
    }
  };

  const isExist = winningCount.filter(
    (win) => win?.contestId === loadedContest._id
  );

  return (
    <div className="max-w-7xl mx-auto flex justify-center items-center min-h-[calc(100vh-150px)] p-4 md:p-10">
      <div className=" p-4 max-w-xl min-w-[405px] border-2 border-gray-500 bg-gray-100 rounded-2xl">
        <div className="mb-3">
          <img
            className="mask mask-parallelogram-2 w-full "
            src={loadedContest.image}
          />
          <h2 className="text-2xl font-semibold text-center text-gray-700">
            {loadedContest.contestName}
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text">Submit your task</span>
            </label>
            <textarea
              name="task"
              className="textarea textarea-info"
              placeholder="Submit your task."
              required
            ></textarea>
          </div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />

          {isExist.length > 0 ? (
            <button disabled className="btn btn-block ">
              Already Submitted
            </button>
          ) : (
            <button
              className="btn btn-primary my-8 font-bold btn-block"
              type="submit"
              disabled={!stripe || !clientSecret}
            >
              PAY ${loadedContest.price}
            </button>
          )}
        </form>
        <p className="text-red-600 text-xl">{error}</p>
        {transactionId && (
          <p className="text-lg text-green-600">
            your transition id: {transactionId}
          </p>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
