import Card from "../shared/Card";
import ProgressBar from "../shared/ProgressBar";
import {
  formatCurrency,
  getRemainingFunds,
  getSpentByCategory,
  getUsagePercent
} from "../../utils/calculations";
import {
  getActiveSchedule,
  getExpensesInRange,
  sumExpenses
} from "../../utils/fundingPeriods";

function formatDate(dateValue) {
  return new Date(dateValue).toLocaleDateString("en-AU");
}

function FundingCategoryCard({ category, expenses }) {
  const totalSpent = getSpentByCategory(expenses, category.id);
  const totalRemaining = getRemainingFunds(category.allocated, totalSpent);
  const totalUsage = getUsagePercent(category.allocated, totalSpent);

  const activeSchedule = getActiveSchedule(category);

  let scheduleSpent = 0;
  let scheduleRemaining = 0;
  let scheduleUsage = 0;

  if (activeSchedule) {
    const inRange = getExpensesInRange(
      expenses,
      new Date(activeSchedule.start),
      new Date(activeSchedule.end),
      category.id
    );

    scheduleSpent = sumExpenses(inRange);
    scheduleRemaining = getRemainingFunds(activeSchedule.amount, scheduleSpent);
    scheduleUsage = getUsagePercent(activeSchedule.amount, scheduleSpent);
  }

  return (
    <Card>
      <h3>{category.name}</h3>

      <p>Allocated: {formatCurrency(category.allocated)}</p>
      <p>Spent: {formatCurrency(totalSpent)}</p>
      <p>Remaining: {formatCurrency(totalRemaining)}</p>

      <ProgressBar value={totalUsage} />
      <small>{totalUsage}% of total plan allocation used</small>

      {activeSchedule ? (
        <div style={{ marginTop: "14px" }}>
          <strong>Active Schedule</strong>
          <p>
            {formatDate(activeSchedule.start)} – {formatDate(activeSchedule.end)}
          </p>
          <p>Release type: {activeSchedule.type}</p>
          <p>Schedule amount: {formatCurrency(activeSchedule.amount)}</p>
          <p>Spent this schedule: {formatCurrency(scheduleSpent)}</p>
          <p>Remaining this schedule: {formatCurrency(scheduleRemaining)}</p>

          <ProgressBar value={scheduleUsage} />
          <small>{scheduleUsage}% of current schedule used</small>
        </div>
      ) : (
        <div style={{ marginTop: "14px" }}>
          <strong>No active schedule</strong>
        </div>
      )}
    </Card>
  );
}

export default FundingCategoryCard;