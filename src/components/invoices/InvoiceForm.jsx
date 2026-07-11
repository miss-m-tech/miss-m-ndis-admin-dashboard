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

function InvoiceForm({ categories = [], onAddInvoice }) {
  const [invoice, setInvoice] = useState(emptyInvoice);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setInvoice((currentInvoice) => ({
      ...currentInvoice,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    onAddInvoice(invoice);
    setInvoice(emptyInvoice);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>New invoice</h2>

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

      <button type="submit">Save invoice</button>
    </form>
  );
}

export default InvoiceForm;
