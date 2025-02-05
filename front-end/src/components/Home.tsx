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
        preferenceId="166755154-1134119e-3478-4451-829e-0348c64119a9" // ✅ Debe ser un string válido generado por la API
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
