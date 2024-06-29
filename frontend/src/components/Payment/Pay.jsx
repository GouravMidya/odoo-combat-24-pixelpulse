import React, { useEffect, useState } from "react";
import "./pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PWwrrRuh0l7mfz944mYsXJXOMzE8JbrKGAc2VDjSR8NDzS7qMf65gCsmynkvvBuONQrU1V4kP3APfiHlQRL11lm00926SjboJ"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await axios.post(`/api/reservations/create-payment-intent/${id}`);
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error('Error fetching client secret:', error);
        // Handle error fetching client secret
      }
    };

    fetchClientSecret();
  }, [id]);

  const appearance = {
    theme: 'stripe', // Adjust appearance based on your styling needs
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
