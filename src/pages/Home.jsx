import { DisplayCard } from "../components/DisplayCard";
import { HeaderText } from "../components/HeaderText";
import { dataInfo } from "../data/dataInfo";

const HomePage = () => {
  return (
    <div>
      <HeaderText text="Welcome" />
      <div className="grid grid-row-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8">
        {dataInfo.map(({ name, qty, totalAmount }, i) => (
          <DisplayCard
            name={name}
            qty={qty}
            totalAmount={totalAmount}
            key={i}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
