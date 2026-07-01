import FundingCategoryCard from "../components/funding/FundingCategoryCard";
import ExpenseForm from "../components/funding/ExpenseForm";
import SectionTitle from "../components/shared/SectionTitle";
import ExpenseList from "../components/funding/ExpenseList";

function FundingPage({
  categories,
  expenses,
  contacts,
  onAddExpense,
  onDeleteExpense
}) {
  return (
    <div className="page-stack">
      <section>
        <SectionTitle>Funding</SectionTitle>
        <div className="card-grid">
          {categories.map((category) => (
            <FundingCategoryCard
              key={category.id}
              category={category}
              expenses={expenses}
            />
          ))}
        </div>
      </section>

      <ExpenseForm
        categories={categories}
        contacts={contacts}
        onAddExpense={onAddExpense}
      />

      <ExpenseList
          expenses={expenses}
          contacts={contacts}
          categories={categories}
          onDelete={onDeleteExpense}
        />
    </div>
  );
}

export default FundingPage;