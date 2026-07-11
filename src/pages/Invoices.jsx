import { useState } from "react";

const emptyInvoice = {
  providerName: "",
  abn: "",
  invoiceNumber: "",
  serviceDate: "",
  categoryId: "",
  supportItemCode: "",
  quantity: "",
  rate: "",
  total: "",
  notes: ""
};

export default function Invoices({ categories = [] }) {
  const [invoice, setInvoice] = useState(emptyInvoice);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInvoice((currentInvoice) => ({
      ...currentInvoice,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setAnalysisResult({
      status: "ready",
      message:
        "Invoice captured successfully. Validation checks will be added next."
    });
  };

  return (
    <main className="page">
      <h1>Invoice Health Check</h1>

      <p>
        Enter an NDIS invoice to check its calculations, funding category,
        plan dates, duplicate risk, and other possible issues.
      </p>

      <form className="card" onSubmit={handleSubmit}>
        <h2>Invoice details</h2>

        <label>
          Provider name
          <input
            type="text"
            name="providerName"
            value={invoice.providerName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Provider ABN
          <input
            type="text"
            name="abn"
            value={invoice.abn}
            onChange={handleChange}
            placeholder="11 digits"
          />
        </label>

        <label>
          Invoice number
          <input
            type="text"
            name="invoiceNumber"
            value={invoice.invoiceNumber}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Service date
          <input
            type="date"
            name="serviceDate"
            value={invoice.serviceDate}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Funding category
          <select
            name="categoryId"
            value={invoice.categoryId}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Support item code
          <input
            type="text"
            name="supportItemCode"
            value={invoice.supportItemCode}
            onChange={handleChange}
            placeholder="Optional for now"
          />
        </label>

        <label>
          Quantity or hours
          <input
            type="number"
            name="quantity"
            value={invoice.quantity}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Rate
          <input
            type="number"
            name="rate"
            value={invoice.rate}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Invoice total
          <input
            type="number"
            name="total"
            value={invoice.total}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </label>

        <label>
          Notes
          <textarea
            name="notes"
            value={invoice.notes}
            onChange={handleChange}
            rows="4"
            placeholder="Optional notes about the invoice"
          />
        </label>

        <button type="submit">Analyse invoice</button>
      </form>

      {analysisResult && (
        <section className="card">
          <h2>Invoice analysis</h2>
          <p>{analysisResult.message}</p>
        </section>
      )}
    </main>
  );
}
