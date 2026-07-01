import Card from "../shared/Card";

function formatDate(d) {
  return new Date(d).toLocaleDateString();
}

function CurrentPeriodCard({ periodStatus }) {
  return (
    <Card>
      <h2>Current Period</h2>

      {periodStatus.map((p) => {
        if (p.type === "none") return null;

        return (
          <div key={p.categoryId} style={{ marginBottom: "10px" }}>
            <strong>{p.name}</strong>
            <p>
              {formatDate(p.start)} – {formatDate(p.end)}
            </p>
            <p>
              ${p.spent} / ${p.allocated} ({p.usage}%)
            </p>
          </div>
        );
      })}
    </Card>
  );
}

export default CurrentPeriodCard;