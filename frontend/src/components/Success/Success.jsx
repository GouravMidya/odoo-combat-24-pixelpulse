import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);
  const payment_intent = params.get("payment_intent");

  useEffect(() => {
    const confirmPayment = async () => {
      try {
        // Assuming your endpoint for confirming payment is `/api/reservations/confirm-payment`
        await axios.put("/api/reservations/confirm-payment", { payment_intent });
        setTimeout(() => {
          navigate("/orders"); // Redirect to the orders page after 5 seconds
        }, 5000);
      } catch (err) {
        console.error("Error confirming payment:", err);
        // Handle error if needed
      }
    };

    confirmPayment();
  }, [payment_intent, navigate]);

  return (
    <div>
      Payment successful. You are being redirected to the orders page. Please do not close the page.
    </div>
  );
};

export default Success;
