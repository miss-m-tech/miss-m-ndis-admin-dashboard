import Card from "../components/shared/Card";
import SectionTitle from "../components/shared/SectionTitle";
import BackupCard from "../components/data/BackupCard";
import PlanSettingsCard from "../components/data/PlanSettingsCard";
import PlanApprovalImportCard from "../components/data/PlanApprovalImportCard";
import PlanSwitcherCard from "../components/data/PlanSwitcherCard";

  function MorePage({
    participant,
    categories,
    contacts,
    expenses,
    tasks,
    plans,
    activePlanId,
    onSwitchPlan,
    onDeletePlan,
    onImportBackup,
    onUpdateParticipant,
    onUpdateCategories,
    onImportPlanApproval
  }) {
  return (
    <div className="page-stack">
      <PlanSwitcherCard
        plans={plans}
        activePlanId={activePlanId}
        onSwitchPlan={onSwitchPlan}
        onDeletePlan={onDeletePlan}
      />
      <PlanApprovalImportCard
        onImportPlanApproval={onImportPlanApproval}
      />
      <PlanSettingsCard
        participant={participant}
        categories={categories}
        onUpdateParticipant={onUpdateParticipant}
        onUpdateCategories={onUpdateCategories}
      />

      <BackupCard
        participant={participant}
        categories={categories}
        contacts={contacts}
        expenses={expenses}
        tasks={tasks}
        onImportBackup={onImportBackup}
      />

      <section>
        <SectionTitle>More</SectionTitle>
        <Card>
          <p>Later this page can also include CSV export, notes, and settings.</p>
        </Card>
      </section>
    </div>
  );
}

export default MorePage;