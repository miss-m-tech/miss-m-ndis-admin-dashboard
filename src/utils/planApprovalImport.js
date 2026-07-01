function cleanMoney(value) {
  return Number(String(value).replace(/[$,]/g, "").trim());
}

function toIsoDate(dateStr) {
  const match = String(dateStr).match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return "";
  const [, dd, mm, yyyy] = match;
  return `${yyyy}-${mm}-${dd}`;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function extractPlanApprovalData(pdfText) {
  const text = pdfText.replace(/\r/g, "").replace(/\n+/g, " ");

  // --- PARTICIPANT ---
  const nameMatch = text.match(/([A-Z][a-z]+ [A-Z][a-z]+)\s+NDIS Plan/);
  const ndisMatch = text.match(/Participant NDIS number:\s*(\d+)/);

  const planDatesMatch = text.match(
    /Your plan starts on (\d{2}\/\d{2}\/\d{4}) and ends on (\d{2}\/\d{2}\/\d{4})/
  );

  const participant = {
    id: "p1",
    name: nameMatch?.[1] || "",
    ndisNumber: ndisMatch?.[1] || "",
    planStart: planDatesMatch ? toIsoDate(planDatesMatch[1]) : "",
    planEnd: planDatesMatch ? toIsoDate(planDatesMatch[2]) : "",
    managementType: "Plan-managed"
  };

  // --- COMPONENTS ---
  const componentNames = [
    "Core Flexible",
    "Choice and Control",
    "Improved Daily Living Skills",
    "Support Coordination and Psychosocial Recovery Coaches"
  ];

  const categories = [];

  componentNames.forEach((name) => {
    const sectionRegex = new RegExp(
      `${name}[\\s\\S]*?Funding amount:\\s*\\$([\\d,]+\\.\\d{2})([\\s\\S]*?)(?=Core Flexible|Choice and Control|Improved Daily Living Skills|Support Coordination and Psychosocial Recovery Coaches|$)`,
      "g"
    );

    const match = sectionRegex.exec(text);

    if (!match) return;

    const amount = cleanMoney(match[1]);
    const block = match[2];

    const scheduleRegex =
      /(\d{2}\/\d{2}\/\d{4})\s*to\s*(\d{2}\/\d{2}\/\d{4})\s*(\d+)\s*month[s]?\s*\$([\d,]+\.\d{2})/g;

    const fundingSchedule = [];
    let sched;
    let i = 1;

    while ((sched = scheduleRegex.exec(block)) !== null) {
      const [, start, end, months, amountStr] = sched;

      fundingSchedule.push({
        id: `${slugify(name)}-s${i++}`,
        start: toIsoDate(start),
        end: toIsoDate(end),
        type: Number(months) === 3 ? "quarterly" : "monthly",
        amount: cleanMoney(amountStr)
      });
    }

    categories.push({
      id: slugify(name),
      name,
      allocated: amount,
      fundingSchedule
    });
  });

  return { participant, categories };
}