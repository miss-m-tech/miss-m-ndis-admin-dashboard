export function getActiveSchedule(category, today = new Date()) {
  const schedule = category.fundingSchedule || [];

  return schedule.find((item) => {
    const start = new Date(item.start);
    const end = new Date(item.end);
    return today >= start && today <= end;
  }) || null;
}

export function getExpensesInRange(expenses, start, end, categoryId) {
  return expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expense.categoryId === categoryId &&
      expenseDate >= start &&
      expenseDate <= end
    );
  });
}

export function sumExpenses(expenses) {
  return expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
}

export function calculatePeriodStatus(categories, expenses, today = new Date()) {
  return categories.map((category) => {
    const activeSchedule = getActiveSchedule(category, today);

    if (!activeSchedule) {
      return {
        categoryId: category.id,
        name: category.name,
        type: "none",
        status: "none",
        usage: 0
      };
    }

    const start = new Date(activeSchedule.start);
    const end = new Date(activeSchedule.end);

    const inRange = getExpensesInRange(expenses, start, end, category.id);
    const spent = sumExpenses(inRange);
    const allocated = Number(activeSchedule.amount || 0);
    const usage = allocated > 0 ? Math.round((spent / allocated) * 100) : 0;

    let status = "good";
    if (usage > 110) status = "danger";
    else if (usage > 90) status = "watch";

    return {
      categoryId: category.id,
      name: category.name,
      type: activeSchedule.type,
      start,
      end,
      spent,
      allocated,
      usage,
      status,
      scheduleId: activeSchedule.id
    };
  });
}