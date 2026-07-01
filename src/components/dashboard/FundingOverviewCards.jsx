import FundingCategoryCard from "../funding/FundingCategoryCard";
import SectionTitle from "../shared/SectionTitle";

function FundingOverviewCards({ categories, expenses }) {
  return (
    <section>
      <SectionTitle>Funding Overview</SectionTitle>
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
  );
}

export default FundingOverviewCards;