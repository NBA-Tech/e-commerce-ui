import { useState } from "react";
import Dashboard from "./components/Dashboard";
import OrderSection from "./components/OrderSection";
import PaymentSection from "./components/PaymentSection";
import "./index.css";

export default function App() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="container">
      <h1>E-Commerce Dashboard</h1>
      <Dashboard activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "orders" && <OrderSection />}
      {activeTab === "payments" && <PaymentSection />}
      {!activeTab && <p className="welcome-msg">Select "Orders" or "Payments" to begin.</p>}
    </div>
  );
}
