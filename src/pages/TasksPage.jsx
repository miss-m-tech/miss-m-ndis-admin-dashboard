import TaskCard from "../components/tasks/TaskCard";
import TaskForm from "../components/tasks/TaskForm";
import SectionTitle from "../components/shared/SectionTitle";

function TasksPage({
  tasks,
  contacts,
  categories,
  onAddTask,
  onDeleteTask,
  onToggleTask
}) {
  return (
    <div className="page-stack">
      <TaskForm
        contacts={contacts}
        categories={categories}
        onAddTask={onAddTask}
      />

      <section>
        <SectionTitle>Tasks</SectionTitle>
        <div className="stack">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              contacts={contacts}
              categories={categories}
              onDelete={onDeleteTask}
              onToggle={onToggleTask}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default TasksPage;