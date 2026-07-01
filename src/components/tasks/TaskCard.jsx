import Card from "../shared/Card";
import { getContactName, getCategoryName } from "../../utils/lookups";


function TaskCard({ task, contacts, categories, onDelete, onToggle }) {
  return (
    <Card>
      <h3
        style={{
          textDecoration: task.status === "done" ? "line-through" : "none"
        }}
      >
        {task.title}
      </h3>

      <p>Due: {task.dueDate}</p>

      {task.linkedProviderId && (
        <p>
          Provider: {getContactName(contacts, task.linkedProviderId)}
        </p>
      )}

      {task.linkedCategoryId && (
        <p>
          Category: {getCategoryName(categories, task.linkedCategoryId)}
        </p>
      )}

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={() => onToggle(task.id)}>
          {task.status === "done" ? "Mark Open" : "Mark Done"}
        </button>

        <button
          style={{ background: "#dc2626" }}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </Card>
  );
}

export default TaskCard;