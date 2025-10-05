const ORDER_API = "http://localhost:8080/api/orders";

export async function fetchOrders() {
  const res = await fetch(ORDER_API);
  return await res.json();
}

export async function createOrder(order) {
  const res = await fetch(ORDER_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return await res.json();
}
