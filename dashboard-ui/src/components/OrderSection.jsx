import { useEffect, useState } from "react";
import { fetchOrders, createOrder } from "../services/orderService";

export default function OrderSection() {
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    quantity: "",
    price: "",
    orderDate: "PENDING",
  });

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => { loadOrders(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createOrder({
      ...formData,
      quantity: parseInt(formData.quantity, 10),
      price: parseFloat(formData.price),
    });
    setFormData({ customerName: "", product: "", quantity: "", price: "", orderDate: new Date() });
    loadOrders();
  };

  return (
    <div className="section">
      <h2>Orders</h2>
      <form onSubmit={handleSubmit}>
        <input name="customerName" placeholder="Customer name" value={formData.customerName} onChange={handleChange} required />
        <input name="product" placeholder="Product" value={formData.product} onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" value={formData.quantity} onChange={handleChange} required />
        <input name="price" type="number" step="0.01" placeholder="Total Amount" value={formData.price} onChange={handleChange} required />
        <button type="submit">Create Order</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Customer name</th><th>Product</th><th>Qty</th><th>Price</th><th>orderDate</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.orderId}>
              <td>{o.customerName}</td>
              <td>{o.product}</td>
              <td>{o.quantity}</td>
              <td>{o.price}</td>
              <td>{o.orderDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
