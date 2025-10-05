export default function Dashboard({ activeTab, setActiveTab }) {
  return (
    <div className="dashboard">
      <button
        className={activeTab === "orders" ? "active" : ""}
        onClick={() => setActiveTab("orders")}
      >
        Orders
      </button>
      <button
        className={activeTab === "payments" ? "active" : ""}
        onClick={() => setActiveTab("payments")}
      >
        Payments
      </button>
    </div>
  );
}
