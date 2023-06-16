import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";
import Swal from "sweetalert2";

const CheckoutForm = ({ price, item }) => {
  const stripe = useStripe();
  const elements = useElements();
  const {user}= useAuth();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setProcessing(true)

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'unknown',
                    name: user?.displayName || 'anonymous'
                },
            },
        },
    );

    if (confirmError) {
        // console.log(confirmError);
        setCardError(confirmError)
    }

    setProcessing(false)

    if (paymentIntent.status === 'succeeded') {
        setTransactionId(paymentIntent.id);
        // save Data to database server
        const payment = {
            email: user?.email,
            transactionId: paymentIntent.id,
            className: item.className,
            imageURL: item.imageURL,
            availableSeat: item.seats,
            date: new Date(),
            id: item._id,
            enrolledStuNum: 0
        }

        axiosSecure.patch('/payments', payment)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire(
                        'Good job!',
                        'You clicked the button!',
                        'success'
                      )
                }
            })
    }

  };
  return (
    <>
      <form className="w-full m-8" onSubmit={handleSubmit}>
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
        <button
          className="btn btn-primary btn-sm mt-4"
          type="submit"
            disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 ml-8">{cardError}</p>}
      {transactionId && <p className="text-green-500 ml-8">Transaction complete with transactionId: {transactionId}</p>}
    </>
  );
};

export default CheckoutForm;
