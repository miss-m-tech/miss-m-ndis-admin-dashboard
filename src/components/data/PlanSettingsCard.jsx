import { useEffect, useState } from "react";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";

function createEmptySchedule(categoryId) {
  return {
    id: `${categoryId}-s-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    start: "",
    end: "",
    type: "monthly",
    amount: 0
  };
}

function PlanSettingsCard({
  participant,
  categories,
  onUpdateParticipant,
  onUpdateCategories
}) {
  const [participantForm, setParticipantForm] = useState(participant);
  const [categoryForm, setCategoryForm] = useState(categories);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setParticipantForm(participant);
  }, [participant]);

  useEffect(() => {
    setCategoryForm(categories);
  }, [categories]);

  const handleParticipantChange = (event) => {
    const { name, value } = event.target;
    setParticipantForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (index, field, value) => {
    const updated = [...categoryForm];
    updated[index] = {
      ...updated[index],
      [field]: field === "allocated" ? Number(value) : value
    };
    setCategoryForm(updated);
  };

  const handleScheduleChange = (categoryIndex, scheduleIndex, field, value) => {
    const updated = [...categoryForm];
    const currentSchedules = [...(updated[categoryIndex].fundingSchedule || [])];

    currentSchedules[scheduleIndex] = {
      ...currentSchedules[scheduleIndex],
      [field]: field === "amount" ? Number(value) : value
    };

    updated[categoryIndex] = {
      ...updated[categoryIndex],
      fundingSchedule: currentSchedules
    };

    setCategoryForm(updated);
  };

  const handleAddScheduleRow = (categoryIndex) => {
    const updated = [...categoryForm];
    const category = updated[categoryIndex];

    updated[categoryIndex] = {
      ...category,
      fundingSchedule: [
        ...(category.fundingSchedule || []),
        createEmptySchedule(category.id)
      ]
    };

    setCategoryForm(updated);
  };

  const handleRemoveScheduleRow = (categoryIndex, scheduleIndex) => {
    const updated = [...categoryForm];
    const currentSchedules = [...(updated[categoryIndex].fundingSchedule || [])];

    updated[categoryIndex] = {
      ...updated[categoryIndex],
      fundingSchedule: currentSchedules.filter((_, index) => index !== scheduleIndex)
    };

    setCategoryForm(updated);
  };

  const handleSave = () => {
    onUpdateParticipant(participantForm);
    onUpdateCategories(categoryForm);
    setMessage("Plan settings saved.");
  };

  return (
    <section>
      <SectionTitle>Plan Settings</SectionTitle>

      <Card>
        <div className="form-stack">
          <h3>Participant</h3>

          <label>Participant name</label>
          <input
            type="text"
            name="name"
            placeholder="Participant name"
            value={participantForm.name || ""}
            onChange={handleParticipantChange}
          />

          <label>NDIS Number</label>
          <input
            type="text"
            name="ndisNumber"
            placeholder="NDIS number"
            value={participantForm.ndisNumber || ""}
            onChange={handleParticipantChange}
          />

          <label>Management type</label>
          <select
            name="managementType"
            value={participantForm.managementType || ""}
            onChange={handleParticipantChange}
          >
            <option value="">Select management type</option>
            <option value="Self-managed">Self-managed</option>
            <option value="Plan-managed">Plan-managed</option>
            <option value="NDIA-managed">NDIA-managed</option>
          </select>

          <label>Plan start</label>
          <input
            type="date"
            name="planStart"
            value={participantForm.planStart || ""}
            onChange={handleParticipantChange}
          />

          <label>Plan end</label>
          <input
            type="date"
            name="planEnd"
            value={participantForm.planEnd || ""}
            onChange={handleParticipantChange}
          />
        </div>
      </Card>

      <div style={{ height: "16px" }} />

      <Card>
        <div className="form-stack">
          <h3>Funding Categories</h3>

          {categoryForm.map((category, categoryIndex) => (
            <div key={category.id} className="category-editor">
              <label>Category name</label>
              <input
                type="text"
                value={category.name || ""}
                onChange={(e) =>
                  handleCategoryChange(categoryIndex, "name", e.target.value)
                }
              />

              <label>Total allocated</label>
              <input
                type="number"
                value={category.allocated ?? 0}
                onChange={(e) =>
                  handleCategoryChange(categoryIndex, "allocated", e.target.value)
                }
              />

              <div className="schedule-block">
                <strong>Funding Schedule</strong>

                {(category.fundingSchedule || []).map((schedule, scheduleIndex) => (
                  <div key={schedule.id} className="schedule-row">
                    <label>Start</label>
                    <input
                      type="date"
                      value={schedule.start || ""}
                      onChange={(e) =>
                        handleScheduleChange(
                          categoryIndex,
                          scheduleIndex,
                          "start",
                          e.target.value
                        )
                      }
                    />

                    <label>End</label>
                    <input
                      type="date"
                      value={schedule.end || ""}
                      onChange={(e) =>
                        handleScheduleChange(
                          categoryIndex,
                          scheduleIndex,
                          "end",
                          e.target.value
                        )
                      }
                    />

                    <label>Type</label>
                    <select
                      value={schedule.type || "monthly"}
                      onChange={(e) =>
                        handleScheduleChange(
                          categoryIndex,
                          scheduleIndex,
                          "type",
                          e.target.value
                        )
                      }
                    >
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="quarterly">Quarterly</option>
                    </select>

                    <label>Amount</label>
                    <input
                      type="number"
                      value={schedule.amount ?? 0}
                      onChange={(e) =>
                        handleScheduleChange(
                          categoryIndex,
                          scheduleIndex,
                          "amount",
                          e.target.value
                        )
                      }
                    />

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveScheduleRow(categoryIndex, scheduleIndex)
                      }
                    >
                      Remove Schedule Row
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddScheduleRow(categoryIndex)}
                >
                  Add Schedule Row
                </button>
              </div>
            </div>
          ))}

          <button onClick={handleSave}>Save Plan Settings</button>

          {message ? (
            <p>
              <strong>{message}</strong>
            </p>
          ) : null}
        </div>
      </Card>
    </section>
  );
}

export default PlanSettingsCard;