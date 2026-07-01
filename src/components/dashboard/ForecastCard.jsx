import Card from "../shared/Card";

function ForecastCard({ forecast }) {
  const getColor = (status) => {
    if (status === "danger") return "#dc2626";
    if (status === "watch") return "#f59e0b";
    if (status === "info") return "#2563eb";
    return "#16a34a";
  };

  const getMessage = (item) => {
    if (item.type === "none") return item.message || "No period limit";
    if (item.message) return item.message;
    if (typeof item.daysRemaining === "number") {
      return `${item.daysRemaining.toFixed(1)} days remaining at current rate`;
    }
    return "Forecast unavailable";
  };

  return (
    <Card>
      <h2>Spending Forecast</h2>

      <div style={{ marginTop: "10px" }}>
        {forecast.map((item) => (
          <div
            key={item.categoryId}
            style={{
              marginBottom: "8px",
              borderLeft: `4px solid ${getColor(item.status)}`,
              paddingLeft: "8px"
            }}
          >
            <strong>{item.name}</strong>
            <p>{getMessage(item)}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default ForecastCard;