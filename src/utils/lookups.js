export function getContactName(contacts, contactId) {
  return contacts.find((c) => c.id === contactId)?.name || "Unknown";
}

export function getCategoryName(categories, categoryId) {
  return categories.find((c) => c.id === categoryId)?.name || "Unknown";
}