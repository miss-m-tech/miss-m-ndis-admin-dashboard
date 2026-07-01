import { useState } from "react";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";
import { exportJsonFile, validateBackupData } from "../../utils/importExport";

function BackupCard({
  participant,
  categories,
  contacts,
  expenses,
  tasks,
  onImportBackup
}) {
  const [message, setMessage] = useState("");

  const handleExport = () => {
    const backup = {
      version: 1,
      exportedAt: new Date().toISOString(),
      participant,
      categories,
      contacts,
      expenses,
      tasks
    };

    const safeName = participant?.name
      ? participant.name.toLowerCase().replace(/\s+/g, "-")
      : "ndis-dashboard";

    exportJsonFile(`${safeName}-backup.json`, backup);
    setMessage("Backup exported successfully.");
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);

      const validation = validateBackupData(parsed);

      if (!validation.valid) {
        setMessage(validation.message);
        return;
      }

      onImportBackup(parsed);
      setMessage("Backup imported successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Import failed. Please check the JSON file.");
    }
  };

  return (
    <section>
      <SectionTitle>Backup Current Plan</SectionTitle>

      <Card>
        <div className="form-stack">
          <button onClick={handleExport}>Export Full Backup</button>

          <div>
            <label htmlFor="backup-import">Import Backup</label>
            <input
              id="backup-import"
              type="file"
              accept=".json,application/json"
              onChange={handleImport}
            />
          </div>

          {message ? <p><strong>{message}</strong></p> : null}
        </div>
      </Card>
    </section>
  );
}

export default BackupCard;