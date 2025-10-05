import { useEffect, useState } from "react";
import { fetchPayments } from "./services/paymentService";
import PaymentForm from "./components/PaymentForm";
import PaymentList from "./components/PaymentList";
import "./index.css";

export default function App() {
  const [payments, setPayments] = useState([]);

  const loadPayments = async () => {
    const data = await fetchPayments();
    setPayments(data);
  };

  useEffect(() => {
    loadPayments();
  }, []);

  return (
    <div className="container">
      <h1>Payment Management</h1>
      <PaymentForm onPaymentCreated={loadPayments} />
      <PaymentList payments={payments} />
    </div>
  );
}
