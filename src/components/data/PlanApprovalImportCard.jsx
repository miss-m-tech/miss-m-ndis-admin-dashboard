import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import Card from "../shared/Card";
import SectionTitle from "../shared/SectionTitle";
import PlanApprovalReviewCard from "./PlanApprovalReviewCard";
import { extractPlanApprovalData } from "../../utils/planApprovalImport";

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.mjs",
  import.meta.url
).toString();

async function readPdfText(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += `\n${pageText}\n`;
  }

  return fullText;
}

function PlanApprovalImportCard({ onImportPlanApproval }) {
  const [message, setMessage] = useState("");
  const [extractedData, setExtractedData] = useState(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const pdfText = await readPdfText(file);
      const parsed = extractPlanApprovalData(pdfText);

      if (!parsed.participant.name && !parsed.categories.length) {
        setMessage("Could not extract enough plan data from this PDF.");
        return;
      }

      setExtractedData(parsed);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to read the PDF.");
    }
  };

  const handleConfirm = (data) => {
    const confirmed = window.confirm(
      "Importing this plan will replace the currently loaded participant, funding categories, contacts, expenses, and tasks on this device. Export a backup first if you want to keep the current plan. Continue?"
    );

    if (!confirmed) return;

    onImportPlanApproval(data);
    setExtractedData(null);
    setMessage("Plan approval imported successfully.");
  };

  const handleCancel = () => {
    setExtractedData(null);
    setMessage("Import cancelled.");
  };

  if (extractedData) {
    return (
      <PlanApprovalReviewCard
        extractedData={extractedData}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <section>
      <SectionTitle>Import Plan Approval PDF</SectionTitle>

      <Card>
        <div className="form-stack">
          <input
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
          />
          <p>
              Upload an NDIS plan approval PDF to extract participant and funding component details.
              Importing a new plan will replace the currently loaded plan data on this device.
            </p>
          {message ? <p><strong>{message}</strong></p> : null}
        </div>
      </Card>
    </section>
  );
}

export default PlanApprovalImportCard;