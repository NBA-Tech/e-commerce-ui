export default function PaymentList({ payments }) {
  return (
    <div className="list-container">
      <h2>Payments</h2>
      {payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Payment ID</th>
              <th>Order ID</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.paymentId}>
                <td>{payment.paymentId}</td>
                <td>{payment.orderId}</td>
                <td>{payment.paymentMethod}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
