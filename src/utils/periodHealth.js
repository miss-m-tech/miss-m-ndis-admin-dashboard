export function calculatePeriodHealth(periodStatus) {
  const priority = ["danger", "watch", "good", "none"];

  const sorted = [...periodStatus].sort(
    (a, b) => priority.indexOf(a.status) - priority.indexOf(b.status)
  );

  const overall = sorted[0];

  return {
    overallStatus: overall?.status || "good",
    categories: periodStatus
  };
}