const navItems = [
  { key: "dashboard", label: "Dashboard", shortLabel: "Dash" },
  { key: "funding", label: "Funding", shortLabel: "Funds" },
  { key: "contacts", label: "Contacts", shortLabel: "Contacts" },
  { key: "tasks", label: "Tasks", shortLabel: "Tasks" },
  { key: "invoices", label: "Invoices", shortLabel: "Bills" },
  { key: "more", label: "More", shortLabel: "More" }
];

function BottomNav({ currentPage, onNavigate }) {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <button
          key={item.key}
          className={currentPage === item.key ? "nav-button active" : "nav-button"}
          onClick={() => onNavigate(item.key)}
          aria-label={item.label}
          title={item.label}
        >
          <span className="nav-label-full">{item.label}</span>
          <span className="nav-label-short">{item.shortLabel}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
