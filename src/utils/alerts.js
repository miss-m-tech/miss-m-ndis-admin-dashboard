import {
  getSpentByCategory,
  getUsagePercent,
  getPlanProgressPercent
} from "./calculations";

export function generateAlerts(categories, expenses, participant) {
  const alerts = [];
  const planProgress = getPlanProgressPercent(
    participant.planStart,
    participant.planEnd
  );

  categories.forEach((category) => {
    const spent = getSpentByCategory(expenses, category.id);
    const usage = getUsagePercent(category.allocated, spent);

    if (usage > planProgress + 20) {
      alerts.push({
        id: `high-${category.id}`,
        severity: "high",
        title: `${category.name} spending is ahead of schedule`,
        message: `You have used ${usage}% of this budget while ${planProgress}% of the plan has passed.`
      });
    } else if (usage < planProgress - 30) {
      alerts.push({
        id: `low-${category.id}`,
        severity: "info",
        title: `${category.name} may be underused`,
        message: `Only ${usage}% of this budget has been used so far.`
      });
    }
  });

  if (!alerts.length) {
    alerts.push({
      id: "healthy-overview",
      severity: "good",
      title: "Plan looks stable",
      message: "No major funding warnings detected right now."
    });
  }

  return alerts;
}