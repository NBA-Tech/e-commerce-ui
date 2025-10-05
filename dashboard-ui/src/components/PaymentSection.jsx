import { useEffect, useState } from "react";
import { fetchPayments, createPayment } from "../services/paymentService";

export default function PaymentSection() {
  const [payments, setPayments] = useState([]);
  const [formData, setFormData] = useState({
    payerName: "",
    paymentMethod: "",
    amount: "",
    status: "PENDING",
  });

  const loadPayments = async () => {
    const data = await fetchPayments();
    setPayments(data);
  };

  useEffect(() => { loadPayments(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPayment({
      ...formData,
      amount: parseFloat(formData.amount),
    });
    setFormData({ payerName: "", paymentMethod: "", amount: "", status: "PENDING" });
    loadPayments();
  };

  return (
    <div className="section">
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input name="payerName" placeholder="Payee Name" value={formData.payerName} onChange={handleChange} required />
        <input name="paymentMethod" placeholder="Payment Method" value={formData.paymentMethod} onChange={handleChange} required />
        <input name="amount" type="number" step="0.01" placeholder="Amount" value={formData.amount} onChange={handleChange} required />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="PENDING">PENDING</option>
          <option value="SUCCESS">SUCCESS</option>
          <option value="FAILED">FAILED</option>
        </select>
        <button type="submit">Create Payment</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Payment ID</th><th>Payee</th><th>Method</th><th>Amount</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.payerName}</td>
              <td>{p.paymentMethod}</td>
              <td>{p.amount}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
