export function exportJsonFile(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function validateBackupData(data) {
  if (!data || typeof data !== "object") {
    return { valid: false, message: "Backup file is not a valid object." };
  }

  const requiredKeys = ["participant", "categories", "contacts", "expenses", "tasks"];

  for (const key of requiredKeys) {
    if (!(key in data)) {
      return { valid: false, message: `Missing required field: ${key}` };
    }
  }

  if (!Array.isArray(data.categories)) {
    return { valid: false, message: "Categories must be an array." };
  }

  if (!Array.isArray(data.contacts)) {
    return { valid: false, message: "Contacts must be an array." };
  }

  if (!Array.isArray(data.expenses)) {
    return { valid: false, message: "Expenses must be an array." };
  }

  if (!Array.isArray(data.tasks)) {
    return { valid: false, message: "Tasks must be an array." };
  }

  return { valid: true, message: "Backup file looks valid." };
}