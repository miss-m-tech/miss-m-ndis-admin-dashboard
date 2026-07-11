import { useMemo, useState } from "react";
import AppShell from "./components/layout/AppShell";
import DashboardPage from "./pages/DashboardPage";
import FundingPage from "./pages/FundingPage";
import ContactsPage from "./pages/ContactsPage";
import TasksPage from "./pages/TasksPage";
import MorePage from "./pages/MorePage";
import Invoices from "./pages/Invoices";

import {
  participant as initialParticipant,
  categories as initialCategories,
  contacts as initialContacts,
  expenses as initialExpenses,
  tasks as initialTasks
} from "./data/mockData";

import { generateAlerts } from "./utils/alerts";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculatePeriodStatus } from "./utils/fundingPeriods";
import { calculatePeriodHealth } from "./utils/periodHealth";
import { calculatePeriodForecast } from "./utils/periodForecast";
import { generatePeriodRecommendations } from "./utils/recommendations";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const initialPlan = {
    id: "plan-1",
    participant: initialParticipant,
    categories: initialCategories,
    contacts: initialContacts,
    expenses: initialExpenses,
    invoices: [],
    tasks: initialTasks
  };
  const [plans, setPlans] = useLocalStorage("ndis-plans", [initialPlan]);
  const [activePlanId, setActivePlanId] = useLocalStorage("ndis-active-plan-id", "plan-1");

  const activePlan =
    plans.find((plan) => plan.id === activePlanId) || plans[0];

  const participant = activePlan?.participant || initialParticipant;
  const categories = activePlan?.categories || [];
  const contacts = activePlan?.contacts || [];
  const expenses = activePlan?.expenses || [];
  const invoices = activePlan?.invoices || [];
  const tasks = activePlan?.tasks || [];

  const updateActivePlan = (updater) => {
  setPlans((prevPlans) =>
    prevPlans.map((plan) =>
      plan.id === activePlanId ? updater(plan) : plan
    )
  );
};

  const alerts = useMemo(() => {
    return generateAlerts(categories, expenses, participant);
  }, [categories, expenses, participant]);

  const periodStatus = useMemo(() => {
    return calculatePeriodStatus(categories, expenses);
  }, [categories, expenses]);

  const periodHealth = useMemo(() => {
    return calculatePeriodHealth(periodStatus);
  }, [periodStatus]);

  const periodForecast = useMemo(() => {
    return calculatePeriodForecast(periodStatus);
  }, [periodStatus]);

  const recommendations = useMemo(() => {
    return generatePeriodRecommendations(periodStatus, periodForecast);
  }, [periodStatus, periodForecast]);

  const handleAddExpense = (newExpense) => {
    updateActivePlan((plan) => ({
      ...plan,
      expenses: [
        {
          id: `e${Date.now()}`,
          ...newExpense
        },
        ...plan.expenses
      ]
    }));
  };

  const handleAddInvoice = (newInvoice) => {
      updateActivePlan((plan) => ({
        ...plan,
        invoices: [
          {
            id: `i${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...newInvoice
          },
          ...(plan.invoices || [])
        ]
      }));
    };
  
  const handleAddContact = (newContact) => {
    updateActivePlan((plan) => ({
      ...plan,
      contacts: [
        {
          id: `c${Date.now()}`,
          ...newContact
        },
        ...plan.contacts
      ]
    }));
  };

  const handleAddTask = (newTask) => {
    updateActivePlan((plan) => ({
      ...plan,
      tasks: [
        {
          id: `t${Date.now()}`,
          status: "open",
          ...newTask
        },
        ...plan.tasks
      ]
    }));
  };

  const handleDeleteTask = (taskId) => {
    updateActivePlan((plan) => ({
      ...plan,
      tasks: plan.tasks.filter((t) => t.id !== taskId)
    }));
  };

  const handleDeleteContact = (contactId) => {
    updateActivePlan((plan) => ({
      ...plan,
      contacts: plan.contacts.filter((c) => c.id !== contactId)
    }));
  };

  const handleDeleteExpense = (expenseId) => {
    updateActivePlan((plan) => ({
      ...plan,
      expenses: plan.expenses.filter((e) => e.id !== expenseId)
    }));
  };

  const handleDeletePlan = (planIdToDelete) => {
    if (plans.length <= 1) {
      window.alert("You must keep at least one plan in the app.");
      return;
    }

    const confirmed = window.confirm(
      "Delete this plan? This will remove its participant details, categories, contacts, expenses, and tasks from this device."
    );

    if (!confirmed) return;

    const remainingPlans = plans.filter((plan) => plan.id !== planIdToDelete);

    setPlans(remainingPlans);

    if (activePlanId === planIdToDelete) {
      setActivePlanId(remainingPlans[0]?.id || "");
    }
  };

  const handleToggleTask = (taskId) => {
    updateActivePlan((plan) => ({
      ...plan,
      tasks: plan.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: task.status === "open" ? "done" : "open" }
          : task
      )
    }));
  };

  const handleUpdateParticipant = (updatedParticipant) => {
    updateActivePlan((plan) => ({
      ...plan,
      participant: updatedParticipant
    }));
  };

  const handleUpdateCategories = (updatedCategories) => {
    updateActivePlan((plan) => ({
      ...plan,
      categories: updatedCategories
    }));
  };

  const handleImportBackup = (backupData) => {
    updateActivePlan((plan) => ({
      ...plan,
      participant: backupData.participant || initialParticipant,
      categories: backupData.categories || initialCategories,
      contacts: backupData.contacts || [],
      expenses: backupData.expenses || [],
      tasks: backupData.tasks || []
    }));
  };

  const handleImportPlanApproval = (importedData) => {
    const newPlanId = `plan-${Date.now()}`;

    const newPlan = {
      id: newPlanId,
      participant: importedData.participant || initialParticipant,
      categories: importedData.categories || [],
      contacts: [],
      expenses: [],
      tasks: []
    };

    setPlans((prevPlans) => [...prevPlans, newPlan]);
    setActivePlanId(newPlanId);
  };

  const pageProps = {
    participant,
    categories,
    contacts,
    expenses,
    invoices,
    tasks,
    alerts,
    periodStatus,
    periodHealth,
    periodForecast,
    recommendations,
    plans,
    activePlanId,
    onSwitchPlan: setActivePlanId,
    onDeletePlan: handleDeletePlan,
    onAddExpense: handleAddExpense,
    onAddInvoice: handleAddInvoice,
    onAddContact: handleAddContact,
    onAddTask: handleAddTask,
    onDeleteTask: handleDeleteTask,
    onDeleteContact: handleDeleteContact,
    onDeleteExpense: handleDeleteExpense,
    onToggleTask: handleToggleTask,
    onImportBackup: handleImportBackup,
    onUpdateParticipant: handleUpdateParticipant,
    onUpdateCategories: handleUpdateCategories,
    onImportPlanApproval: handleImportPlanApproval,
    onNavigate: setCurrentPage,
  };

    const renderPage = () => {
    switch (currentPage) {
      case "funding":
        return <FundingPage {...pageProps} />;
      case "contacts":
        return <ContactsPage {...pageProps} />;
      case "tasks":
        return <TasksPage {...pageProps} />;
      case "invoices":
        return <Invoices {...pageProps} />;
      case "more":
        return <MorePage {...pageProps} />;
      case "dashboard":
      default:
        return <DashboardPage {...pageProps} />;
    }
  };

  return (
    <AppShell
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        participant={participant}
      >
      {renderPage()}
    </AppShell>
  );
}

export default App;
