import Card from "../shared/Card";
import StatusPill from "../shared/StatusPill";
import { getDaysRemaining } from "../../utils/calculations";

function SummaryHeader({ participant }) {
  const daysRemaining = getDaysRemaining(participant.planEnd);

  return (
    <Card>
      <div className="summary-header">
        <div>
          <h2>{participant.name}</h2>
          {participant.ndisNumber ? <p>NDIS Number: {participant.ndisNumber}</p> : null}
          <p>
            {participant.planStart} to {participant.planEnd}
          </p>
          <p>{participant.managementType}</p>
        </div>
        <div className="summary-side">
          <StatusPill status="on-track" />
          <p>{daysRemaining} days remaining</p>
        </div>
      </div>
    </Card>
  );
}

export default SummaryHeader;