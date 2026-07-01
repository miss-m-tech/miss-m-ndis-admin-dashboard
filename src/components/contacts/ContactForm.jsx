import { useState } from "react";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function ContactForm({ onAddContact }) {
  const [form, setForm] = useState({
    name: "",
    role: "",
    organisation: "",
    phone: "",
    email: "",
    notes: ""
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

    if (!form.name || !form.role) return;

    onAddContact(form);

    setForm({
      name: "",
      role: "",
      organisation: "",
      phone: "",
      email: "",
      notes: ""
    });
  };

  return (
    <section>
      <SectionTitle>Add Contact</SectionTitle>
      <Card>
        <form className="form-stack" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
          />
          <input
            type="text"
            name="organisation"
            placeholder="Organisation"
            value={form.organisation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />
          <button type="submit">Save Contact</button>
        </form>
      </Card>
    </section>
  );
}

export default ContactForm;