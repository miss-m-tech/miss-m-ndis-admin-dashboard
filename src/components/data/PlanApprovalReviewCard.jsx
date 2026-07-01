import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";
import { formatCurrency } from "../../utils/calculations";

function PlanApprovalReviewCard({ extractedData, onConfirm, onCancel }) {
  const { participant, categories } = extractedData;

  return (
    <section>
      <SectionTitle>Review Plan Approval Import</SectionTitle>

      <Card>
        <h3>Participant</h3>
        <p><strong>Name:</strong> {participant.name || "Not found"}</p>
        <p><strong>NDIS Number:</strong> {participant.ndisNumber || "Not found"}</p>
        <p><strong>Plan Start:</strong> {participant.planStart || "Not found"}</p>
        <p><strong>Plan End:</strong> {participant.planEnd || "Not found"}</p>
        <p><strong>Management Type:</strong> {participant.managementType || "Not found"}</p>
      </Card>

      <div style={{ height: "16px" }} />

      <Card>
        <h3>Funding Components</h3>

        <div className="stack">
          {categories.map((category) => (
            <div key={category.id} className="category-editor">
              <p><strong>{category.name}</strong></p>
              <p>Total: {formatCurrency(category.allocated)}</p>

              <div className="schedule-block">
                {(category.fundingSchedule || []).map((schedule) => (
                  <div key={schedule.id} className="schedule-row">
                    <p><strong>{schedule.start}</strong> to <strong>{schedule.end}</strong></p>
                    <p>{schedule.type}</p>
                    <p>{formatCurrency(schedule.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button onClick={() => onConfirm(extractedData)}>Confirm Import</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </Card>
    </section>
  );
}

export default PlanApprovalReviewCard;