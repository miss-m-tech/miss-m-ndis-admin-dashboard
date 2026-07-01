import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function AlertsPanel({ alerts }) {
  return (
    <section>
      <SectionTitle>Alerts</SectionTitle>
      <div className="stack">
        {alerts.map((alert) => (
          <Card key={alert.id} className={`alert-card ${alert.severity}`}>
            <strong>{alert.title}</strong>
            <p>{alert.message}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

export default AlertsPanel;