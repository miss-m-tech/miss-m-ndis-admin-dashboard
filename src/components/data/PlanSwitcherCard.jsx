import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function PlanSwitcherCard({
  plans,
  activePlanId,
  onSwitchPlan,
  onDeletePlan
}) {
  const activePlan = plans.find((plan) => plan.id === activePlanId);

  return (
    <section>
      <SectionTitle>Switch Plan</SectionTitle>

      <Card>
        <div className="form-stack">
          <label>Current saved plans</label>
          <select
            value={activePlanId}
            onChange={(e) => onSwitchPlan(e.target.value)}
          >
            {plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.participant?.name || "Unnamed Participant"}
              </option>
            ))}
          </select>

          {activePlan ? (
            <button
              type="button"
              onClick={() => onDeletePlan(activePlan.id)}
            >
              Delete Current Plan
            </button>
          ) : null}
        </div>
      </Card>
    </section>
  );
}

export default PlanSwitcherCard;