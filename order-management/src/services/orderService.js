const BASE_URL = "http://localhost:8080/api/orders";

export async function fetchOrders() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function createOrder(order) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return await res.json();
}
