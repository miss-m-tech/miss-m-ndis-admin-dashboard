export const participant = {
  id: "p1",
  name: "Sample Citizen",
  ndisNumber: "",
  planStart: "2026-01-01",
  planEnd: "2026-12-31",
  managementType: "Plan-managed",
  goals: [
    "Improve daily living stability",
    "Maintain support coordination",
    "Strengthen community participation"
  ]
};

export const categories = [
  {
    id: "core",
    name: "Core",
    allocated: 24000,
    fundingSchedule: [
      {
        id: "core-s1",
        start: "2026-01-01",
        end: "2026-03-31",
        releaseTypeype: "quarterly",
        amount: 7000
      },
      {
        id: "core-s2",
        start: "2026-04-01",
        end: "2026-06-30",
        releaseType: "quarterly",
        amount: 6000
      },
      {
        id: "core-s3",
        start: "2026-07-01",
        end: "2026-09-30",
        releaseType: "quarterly",
        amount: 5500
      },
      {
        id: "core-s4",
        start: "2026-10-01",
        end: "2026-12-31",
        releaseType: "quarterly",
        amount: 5500
      }
    ]
  },
  {
    id: "capacity",
    name: "Capacity Building",
    allocated: 12000,
    fundingSchedule: [
      {
        id: "capacity-s1",
        start: "2026-01-01",
        end: "2026-12-31",
        releaseType: "monthly",
        amount: 1000
      }
    ]
  },
    {
      id: "plan-management",
      name: "Plan Management",
      allocated: 1200,
      fundingSchedule: [
        { id: "pm-s1", start: "2026-01-01", end: "2026-01-31", type: "monthly", amount: 100 },
        { id: "pm-s2", start: "2026-02-01", end: "2026-02-28", type: "monthly", amount: 100 },
        { id: "pm-s3", start: "2026-03-01", end: "2026-03-31", type: "monthly", amount: 100 },
        { id: "pm-s4", start: "2026-04-01", end: "2026-04-30", type: "monthly", amount: 100 },
        { id: "pm-s5", start: "2026-05-01", end: "2026-05-31", type: "monthly", amount: 100 },
        { id: "pm-s6", start: "2026-06-01", end: "2026-06-30", type: "monthly", amount: 100 },
        { id: "pm-s7", start: "2026-07-01", end: "2026-07-31", type: "monthly", amount: 100 },
        { id: "pm-s8", start: "2026-08-01", end: "2026-08-31", type: "monthly", amount: 100 },
        { id: "pm-s9", start: "2026-09-01", end: "2026-09-30", type: "monthly", amount: 100 },
        { id: "pm-s10", start: "2026-10-01", end: "2026-10-31", type: "monthly", amount: 100 },
        { id: "pm-s11", start: "2026-11-01", end: "2026-11-30", type: "monthly", amount: 100 },
        { id: "pm-s12", start: "2026-12-01", end: "2026-12-31", type: "monthly", amount: 100 }
      ]
    }
];

export const contacts = [
  {
    id: "c1",
    name: "Jane Smith",
    role: "Plan Manager",
    organisation: "ABC Plan Management",
    phone: "0400 000 000",
    email: "jane@example.com",
    notes: "Main billing contact"
  },
  {
    id: "c2",
    name: "Tom Lee",
    role: "Support Coordinator",
    organisation: "Support Connect",
    phone: "0411 111 111",
    email: "tom@example.com",
    notes: "Best by email in the morning"
  }
];

export const expenses = [
  {
    id: "e1",
    date: "2026-04-20",
    providerId: "c1",
    categoryId: "core",
    amount: 320,
    description: "Support worker hours",
    note: ""
  },
  {
    id: "e2",
    date: "2026-04-15",
    providerId: "c2",
    categoryId: "capacity",
    amount: 180,
    description: "Coordination meeting",
    note: ""
  },
  {
    id: "e3",
    date: "2026-04-12",
    providerId: "c1",
    categoryId: "core",
    amount: 250,
    description: "Community access support",
    note: ""
  }
];

export const tasks = [
  {
    id: "t1",
    title: "Check recent statement",
    dueDate: "2026-04-24",
    status: "open",
    linkedProviderId: "c1",
    linkedCategoryId: "core"
  },
  {
    id: "t2",
    title: "Follow up overdue invoice",
    dueDate: "2026-04-26",
    status: "open",
    linkedProviderId: "c2",
    linkedCategoryId: "capacity"
  }
];