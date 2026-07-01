import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function QuickActions({ onNavigate }) {
  return (
    <section>
      <SectionTitle>Quick Actions</SectionTitle>
      <Card>
        <div className="quick-actions">
          <button onClick={() => onNavigate("funding")}>Add Expense</button>
          <button onClick={() => onNavigate("contacts")}>Add Contact</button>
          <button onClick={() => onNavigate("tasks")}>Add Task</button>
        </div>
      </Card>
    </section>
  );
}

export default QuickActions;