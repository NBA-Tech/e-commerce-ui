import { useEffect, useState } from "react";
import { fetchOrders } from "./services/orderService";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";
import "./index.css";

export default function App() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    const data = await fetchOrders();
    setOrders(data);
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="container">
      <h1>Order Management</h1>
      <OrderForm onOrderCreated={loadOrders} />
      <OrderList orders={orders} />
    </div>
  );
}
