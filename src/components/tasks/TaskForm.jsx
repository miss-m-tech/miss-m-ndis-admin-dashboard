import { useState } from "react";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function TaskForm({ contacts, categories, onAddTask }) {
  const [form, setForm] = useState({
    title: "",
    dueDate: "",
    linkedProviderId: "",
    linkedCategoryId: ""
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
    if (!form.title || !form.dueDate) return;

    onAddTask(form);

    setForm({
      title: "",
      dueDate: "",
      linkedProviderId: "",
      linkedCategoryId: ""
    });
  };

  return (
    <section>
      <SectionTitle>Add Task</SectionTitle>
      <Card>
        <form className="form-stack" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
          />

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
          />

          <select
            name="linkedProviderId"
            value={form.linkedProviderId}
            onChange={handleChange}
          >
            <option value="">Link provider (optional)</option>
            {contacts.map((contact) => (
              <option key={contact.id} value={contact.id}>
                {contact.name}
              </option>
            ))}
          </select>

          <select
            name="linkedCategoryId"
            value={form.linkedCategoryId}
            onChange={handleChange}
          >
            <option value="">Link category (optional)</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button type="submit">Save Task</button>
        </form>
      </Card>
    </section>
  );
}

export default TaskForm;