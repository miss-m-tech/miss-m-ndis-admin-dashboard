import Card from "../shared/Card";

function RecommendationsCard({ recommendations }) {
  const getColor = (type) => {
    if (type === "danger") return "#dc2626";
    if (type === "warning") return "#f59e0b";
    if (type === "info") return "#2563eb";
    return "#16a34a";
  };

  return (
    <Card>
      <h2>What to Do</h2>

      <div style={{ marginTop: "10px" }}>
        {recommendations.map((rec, index) => (
          <div
            key={index}
            style={{
              borderLeft: `4px solid ${getColor(rec.type)}`,
              paddingLeft: "10px",
              marginBottom: "10px"
            }}
          >
            <p>{rec.message}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default RecommendationsCard;