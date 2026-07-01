import { useState } from "react";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function ExpenseForm({ categories, contacts, onAddExpense }) {
  const [form, setForm] = useState({
    date: "",
    providerId: contacts[0]?.id || "",
    categoryId: categories[0]?.id || "",
    amount: "",
    description: "",
    note: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.date || !form.providerId || !form.categoryId || !form.amount || !form.description) {
      return;
    }

    onAddExpense({
      ...form,
      amount: Number(form.amount)
    });

    setForm({
      date: "",
      providerId: contacts[0]?.id || "",
      categoryId: categories[0]?.id || "",
      amount: "",
      description: "",
      note: ""
    });
  };

  return (
    <section>
      <SectionTitle>Add Expense</SectionTitle>
      <Card>
        <form className="form-stack" onSubmit={handleSubmit}>
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <select name="providerId" value={form.providerId} onChange={handleChange}>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </select>
          <select name="categoryId" value={form.categoryId} onChange={handleChange}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            type="number"
            step="0.01"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <textarea
            name="note"
            placeholder="Optional note"
            value={form.note}
            onChange={handleChange}
          />
          <button type="submit">Save Expense</button>
        </form>
      </Card>
    </section>
  );
}

export default ExpenseForm;