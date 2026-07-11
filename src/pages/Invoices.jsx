import InvoiceForm from "../components/invoices/InvoiceForm";
import InvoiceCard from "../components/invoices/InvoiceCard";
import SectionTitle from "../components/shared/SectionTitle";

function Invoices({
  categories = [],
  invoices = [],
  onAddInvoice
}) {
  return (
    <div className="page-stack">
      <InvoiceForm
        categories={categories}
        onAddInvoice={onAddInvoice}
      />

      <section>
        <SectionTitle>Invoices</SectionTitle>

        {invoices.length === 0 ? (
          <p>No invoices have been added yet.</p>
        ) : (
          <div className="stack">
            {invoices.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                categories={categories}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Invoices;
