import { useState } from "react";
import { createPayment } from "../services/paymentService";

export default function PaymentForm({ onPaymentCreated }) {
  const [formData, setFormData] = useState({
    orderId: "",
    paymentMethod: "",
    amount: "",
    status: "PENDING",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      orderId: formData.orderId,
      paymentMethod: formData.paymentMethod,
      amount: parseFloat(formData.amount),
      status: formData.status,
    };

    try {
      await createPayment(payload);
      setFormData({
        orderId: "",
        paymentMethod: "",
        amount: "",
        status: "PENDING",
      });
      onPaymentCreated();
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("Failed to create payment. Check backend connection.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="orderId"
          placeholder="Order ID"
          value={formData.orderId}
          onChange={handleChange}
          required
        />
        <input
          name="paymentMethod"
          placeholder="Payment Method (e.g. CARD, UPI)"
          value={formData.paymentMethod}
          onChange={handleChange}
          required
        />
        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="PENDING">PENDING</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAILED">FAILED</option>
        </select>

        <button type="submit">Create Payment</button>
      </form>
    </div>
  );
}
