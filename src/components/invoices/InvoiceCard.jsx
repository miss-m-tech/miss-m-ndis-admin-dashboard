function InvoiceCard({ invoice, categories = [] }) {
  const category = categories.find(
    (item) => item.id === invoice.categoryId
  );

  return (
    <article className="card">
      <h3>{invoice.providerName}</h3>

      <p>
        <strong>Invoice:</strong> {invoice.invoiceNumber}
      </p>

      <p>
        <strong>Service date:</strong> {invoice.serviceDate}
      </p>

      <p>
        <strong>Category:</strong>{" "}
        {category?.name || "Unknown category"}
      </p>

      <p>
        <strong>Total:</strong> $
        {Number(invoice.total || 0).toFixed(2)}
      </p>
    </article>
  );
}

export default InvoiceCard;
