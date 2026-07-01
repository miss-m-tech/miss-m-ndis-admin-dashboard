import TopBar from "./TopBar";
import BottomNav from "./BottomNav";

function AppShell({ currentPage, onNavigate, children, participant }) {
  return (
    <div className="app-shell">
      <TopBar participant={participant} />
      <main className="page-content">{children}</main>
      <BottomNav currentPage={currentPage} onNavigate={onNavigate} />
    </div>
  );
}

export default AppShell;