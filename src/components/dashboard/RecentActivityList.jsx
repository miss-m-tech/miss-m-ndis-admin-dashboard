import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";
import { getContactName } from "../../utils/lookups";
import { formatCurrency } from "../../utils/calculations";

function RecentActivityList({ expenses, contacts }) {
  const recent = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <section>
      <SectionTitle>Recent Activity</SectionTitle>
      <Card>
        {recent.map((expense) => (
          <div key={expense.id} className="list-row">
            <div>
              <strong>{expense.description}</strong>
              <p>{getContactName(contacts, expense.providerId)}</p>
            </div>

            <div className="list-right">
              <strong>{formatCurrency(expense.amount)}</strong>
              <p>{expense.date}</p>
            </div>
          </div>
        ))}
      </Card>
    </section>
  );
}

export default RecentActivityList;