export function calculatePeriodForecast(periodStatus) {
  const today = new Date();

  return periodStatus.map((period) => {
    if (period.type === "none") {
      return {
        ...period,
        message: "No active funding schedule"
      };
    }

    const start = new Date(period.start);
    const end = new Date(period.end);

    const daysElapsed = Math.max(
      1,
      (today - start) / (1000 * 60 * 60 * 24)
    );

    const dailySpend = period.spent / daysElapsed;

    if (dailySpend === 0) {
      return {
        ...period,
        status: "info",
        message: "No spending yet in this schedule period"
      };
    }

    const remainingFunds = period.allocated - period.spent;
    const daysRemainingByFunds = remainingFunds / dailySpend;
    const calendarDaysRemaining =
      (end - today) / (1000 * 60 * 60 * 24);

    let status = "safe";
    if (daysRemainingByFunds < 5) status = "danger";
    else if (daysRemainingByFunds < 10) status = "watch";

    return {
      ...period,
      daysRemaining: daysRemainingByFunds,
      calendarDaysRemaining,
      dailySpend,
      status
    };
  });
}