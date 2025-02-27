// src/components/MercadoPago.tsx
import React, { useEffect, useRef } from "react";
import { createPaymentBrick } from "../services/mercadoPagoService";

interface MercadoPagoProps {
  //preferenceId: string;
  amount: number;
  payer: object;
}

const MercadoPago: React.FC<MercadoPagoProps> = ({  amount, payer }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = ""; // Limpia el contenedor antes de renderizar
      createPaymentBrick(containerRef.current.id, amount, payer);
    }
  }, [ amount, payer]);

  return <div ref={containerRef} id="mercado-pago-container" />;
};

export default MercadoPago;
