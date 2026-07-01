function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-AU");
}

function TopBar({ participant }) {
  return (
    <header className="top-bar">
      <div>
        <h1>NDIS Dashboard</h1>
        <p>Calm control for plans, providers, and admin</p>

        {participant ? (
          <div className="current-plan-banner">
            <strong>{participant.name || "Unnamed Participant"}</strong>

            {participant.ndisNumber && (
              <span>NDIS: {participant.ndisNumber}</span>
            )}

            {participant.managementType && (
              <span>{participant.managementType}</span>
            )}

            {participant.planStart && participant.planEnd && (
              <span>
                {formatDate(participant.planStart)} to{" "}
                {formatDate(participant.planEnd)}
              </span>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default TopBar;