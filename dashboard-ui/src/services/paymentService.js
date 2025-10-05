const PAYMENT_API = "http://localhost:8081/api/payments";

export async function fetchPayments() {
  const res = await fetch(PAYMENT_API);
  return await res.json();
}

export async function createPayment(payment) {
  const res = await fetch(PAYMENT_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payment),
  });
  return await res.json();
}
