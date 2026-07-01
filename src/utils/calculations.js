export function getSpentByCategory(expenses, categoryId) {
  return expenses
    .filter((expense) => expense.categoryId === categoryId)
    .reduce((sum, expense) => sum + Number(expense.amount), 0);
}

export function getRemainingFunds(allocated, spent) {
  return allocated - spent;
}

export function getUsagePercent(allocated, spent) {
  if (!allocated) return 0;
  return Math.round((spent / allocated) * 100);
}

export function getDaysRemaining(planEnd) {
  const today = new Date();
  const end = new Date(planEnd);
  const diff = end - today;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function getPlanProgressPercent(planStart, planEnd) {
  const start = new Date(planStart);
  const end = new Date(planEnd);
  const today = new Date();

  const total = end - start;
  const elapsed = today - start;

  if (total <= 0) return 0;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD"
  }).format(value || 0);
}