import {
  getSpentByCategory,
  getUsagePercent,
  getPlanProgressPercent
} from "./calculations";

export function calculatePlanHealth(categories, expenses, participant) {
  const planProgress = getPlanProgressPercent(
    participant.planStart,
    participant.planEnd
  );

  const results = categories.map((category) => {
    const spent = getSpentByCategory(expenses, category.id);
    const usage = getUsagePercent(category.allocated, spent);

    const difference = usage - planProgress;

    let status = "good";

    if (difference > 35) {
      status = "danger";
    } else if (difference > 15) {
      status = "watch";
    } else if (difference < -30) {
      status = "under";
    }

    return {
      categoryId: category.id,
      name: category.name,
      usage,
      planProgress,
      difference,
      status
    };
  });

  // overall health = worst category
  const priority = ["danger", "watch", "under", "good"];

  const overall = results.sort(
    (a, b) => priority.indexOf(a.status) - priority.indexOf(b.status)
  )[0];

  return {
    overallStatus: overall.status,
    categories: results
  };
}