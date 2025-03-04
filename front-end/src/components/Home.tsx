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
        amount={300}
        payer={{
          firstName: "Matias",
          lastName: "Olmos",
          email: "matiasolmosrivero@gmail.com",
        }}
      />
    </main>
  );
};

export default Home;
