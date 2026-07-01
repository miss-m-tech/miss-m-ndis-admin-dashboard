import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";
import { formatCurrency } from "../../utils/calculations";
import { getContactName, getCategoryName } from "../../utils/lookups";

function ExpenseList({ expenses, contacts, categories, onDelete }) {
  return (
    <section>
      <SectionTitle>All Expenses</SectionTitle>

      <div className="stack">
        {expenses.map((expense) => (
          <Card key={expense.id}>
            <strong>{expense.description}</strong>

            <p>
              {getContactName(contacts, expense.providerId)} •{" "}
              {getCategoryName(categories, expense.categoryId)}
            </p>

            <p>{expense.date}</p>
            <p>{formatCurrency(expense.amount)}</p>

            <button
              style={{ background: "#dc2626", marginTop: "10px" }}
              onClick={() => onDelete(expense.id)}
            >
              Delete
            </button>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default ExpenseList;