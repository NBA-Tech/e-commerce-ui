const BASE_URL = "http://localhost:8081/api/payments";

export async function fetchPayments() {
  const res = await fetch(BASE_URL);
  return await res.json();
}

export async function createPayment(payment) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return await res.json();
}
