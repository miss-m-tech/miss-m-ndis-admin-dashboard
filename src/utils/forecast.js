import {
  getSpentByCategory,
  getRemainingFunds
} from "./calculations";

export function calculateForecast(categories, expenses, participant) {
  const start = new Date(participant.planStart);
  const today = new Date();

  const weeksElapsed = Math.max(
    1,
    (today - start) / (1000 * 60 * 60 * 24 * 7)
  );

  return categories.map((category) => {
    const spent = getSpentByCategory(expenses, category.id);
    const remaining = getRemainingFunds(category.allocated, spent);

    const weeklySpend = spent / weeksElapsed;

    if (weeklySpend === 0) {
      return {
        categoryId: category.id,
        name: category.name,
        status: "no-spend",
        message: "No spending yet"
      };
    }

    const weeksRemaining = remaining / weeklySpend;

    let status = "safe";

    if (weeksRemaining < 4) {
      status = "danger";
    } else if (weeksRemaining < 8) {
      status = "watch";
    }

    return {
      categoryId: category.id,
      name: category.name,
      weeklySpend,
      weeksRemaining,
      status
    };
  });
}