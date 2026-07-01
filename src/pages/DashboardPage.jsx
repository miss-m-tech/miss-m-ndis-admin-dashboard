import SummaryHeader from "../components/dashboard/SummaryHeader";
import FundingOverviewCards from "../components/dashboard/FundingOverviewCards";
import AlertsPanel from "../components/dashboard/AlertsPanel";
import RecentActivityList from "../components/dashboard/RecentActivityList";
import QuickActions from "../components/dashboard/QuickActions";
import PlanHealthCard from "../components/dashboard/PlanHealthCard";
import ForecastCard from "../components/dashboard/ForecastCard";
import RecommendationsCard from "../components/dashboard/RecommendationsCard";
import CurrentPeriodCard from "../components/dashboard/CurrentPeriodCard";

function DashboardPage({
  participant,
  categories,
  expenses,
  contacts,
  alerts,
  periodStatus,
  periodHealth,
  periodForecast,
  recommendations,
  onNavigate
}) {
  return (
    <div className="page-stack">
      <SummaryHeader participant={participant} />
      <CurrentPeriodCard periodStatus={periodStatus} />
      <PlanHealthCard planHealth={periodHealth} />
      <ForecastCard forecast={periodForecast} />
      <RecommendationsCard recommendations={recommendations} />
      <FundingOverviewCards categories={categories} expenses={expenses} />
      <AlertsPanel alerts={alerts} />
      <RecentActivityList expenses={expenses} contacts={contacts} />
      <QuickActions onNavigate={onNavigate} />
    </div>
  );
}

export default DashboardPage;