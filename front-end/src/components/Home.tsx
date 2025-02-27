import React from "react";
import PortfolioGrid from "./PortfolioGrid";
import MainBanner from "./MainBanner";
import MercadoPago from "./MercadoPago";

const Home: React.FC = () => {
  return (
    <main>
      <MainBanner />
      <PortfolioGrid />
      <MercadoPago
        amount={10000}
        payer={{
          firstName: "Juan",
          lastName: "Pérez",
          email: "juan@example.com",
        }}
      />
    </main>
  );
};

export default Home;
