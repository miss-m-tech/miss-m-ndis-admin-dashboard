function ProgressBar({ value = 0 }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${Math.min(value, 100)}%` }} />
    </div>
  );
}

export default ProgressBar;