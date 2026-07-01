import Card from "../shared/Card";

function PlanHealthCard({ planHealth }) {
  const { overallStatus, categories } = planHealth;

  const statusText = {
    good: "On Track",
    watch: "Review Soon",
    danger: "Needs Attention",
    none: "No Period Limit"
  };

  const categoryStatusText = {
    good: "On Track",
    watch: "Review Soon",
    danger: "Needs Attention",
    none: "No Period Limit"
  };

  return (
    <Card className={`health-card ${overallStatus}`}>
      <h2>Plan Health</h2>
      <h3>{statusText[overallStatus] || "On Track"}</h3>

      <div style={{ marginTop: "10px" }}>
        {categories.map((cat) => (
          <div key={cat.categoryId} style={{ marginBottom: "8px" }}>
            <strong>{cat.name}</strong> — {cat.usage ?? 0}% used
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              {categoryStatusText[cat.status] || "On Track"}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default PlanHealthCard;