export function generateRecommendations(planHealth, forecast) {
  const recommendations = [];

  planHealth.categories.forEach((category) => {
    const forecastItem = forecast.find(
      (f) => f.categoryId === category.categoryId
    );

    // HIGH RISK
    if (category.status === "danger") {
      recommendations.push({
        type: "danger",
        message: `${category.name} funding is being used much faster than expected. Review recent spending and consider reducing usage.`
      });
    }

    // WATCH
    if (category.status === "watch") {
      recommendations.push({
        type: "warning",
        message: `${category.name} spending is trending higher than plan timing. Monitor closely.`
      });
    }

    // UNDERUSED
    if (category.status === "under") {
      recommendations.push({
        type: "info",
        message: `${category.name} funding is underused. You may be missing supports you are entitled to use.`
      });
    }

    // FORECAST RISK
    if (forecastItem?.status === "danger") {
      recommendations.push({
        type: "danger",
        message: `${category.name} may run out within a few weeks at current spending. Action is recommended soon.`
      });
    }

    // NO SPEND
    if (forecastItem?.status === "no-spend") {
      recommendations.push({
        type: "info",
        message: `No spending recorded for ${category.name}. Check if services have started or invoices are missing.`
      });
    }
  });

  // Fallback (all good)
  if (recommendations.length === 0) {
    recommendations.push({
      type: "good",
      message: "Your plan is currently on track. Keep monitoring regularly."
    });
  }

  return recommendations;
}

export function generatePeriodRecommendations(periodStatus, forecast) {
  const recs = [];

  periodStatus.forEach((p) => {
    const f = forecast.find((x) => x.categoryId === p.categoryId);

    if (p.status === "danger") {
      recs.push({
        type: "danger",
        message: `${p.name}: You have exceeded this period’s allocation. Immediate adjustment needed.`
      });
    }

    if (p.status === "watch") {
      recs.push({
        type: "warning",
        message: `${p.name}: You are close to this period’s limit. Slow spending this week.`
      });
    }

    if (f?.status === "danger") {
      recs.push({
        type: "danger",
        message: `${p.name}: At current rate, you may run out within days.`
      });
    }

    if (p.usage === 0) {
      recs.push({
        type: "info",
        message: `${p.name}: No spending yet this period. Check services or invoices.`
      });
    }
  });

  if (!recs.length) {
    recs.push({
      type: "good",
      message: "All funding periods are on track."
    });
  }

  return recs.slice(0, 3); // keep it calm
}