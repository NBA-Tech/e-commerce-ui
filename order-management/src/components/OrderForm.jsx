import { useState } from "react";
import { createOrder } from "../services/orderService";

export default function OrderForm({ onOrderCreated }) {
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: "",
    totalAmount: "",
    status: "PENDING", // optional default
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert string inputs to correct types
    const payload = {
      customerName: formData.customerName,
      product: formData.product,
      quantity: parseInt(formData.quantity, 10),
      totalAmount: parseFloat(formData.totalAmount),
      orderDate: new Date().toISOString().slice(0, 10),
    };

    try {
      await createOrder(payload);
      setFormData({
        customerName: "",
        product: "",
        quantity: "",
        totalAmount: "",
        orderDate: "",
      });
      onOrderCreated();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please check the backend.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="customerName"
          placeholder="Customer name"
          value={formData.customerName}
          onChange={handleChange}
          required
        />
        <input
          name="product"
          placeholder="Product"
          value={formData.product}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          min="1"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="totalAmount"
          type="number"
          step="0.01"
          placeholder="Total Amount"
          value={formData.totalAmount}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
}
