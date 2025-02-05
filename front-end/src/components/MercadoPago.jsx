import React, { useEffect, useRef } from "react";

function MercadoPago({ preferenceId, amount, payer }) {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (!window.MercadoPago) {
      console.error("MercadoPago SDK no cargado.");
      return;
    }

    const mp = new window.MercadoPago(process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY, {
      locale: "es-AR",
    });

    const bricksBuilder = mp.bricks();

    const renderPaymentBrick = async () => {
      if (!containerRef.current) {
        console.error("El contenedor del Payment Brick no está disponible.");
        return;
      }
      try {
        await bricksBuilder.create("payment", `${containerRef.current.id}`, {
          initialization: {
            amount: amount,
            preferenceId: preferenceId,
            payer: payer,
          },
          customization: {
            visual: { style: { theme: "default" } },
            paymentMethods: {
              creditCard: "all",
                      debitCard: "all",
                      ticket: "all",
                      bankTransfer: "all",
                      atm: "all",
                      onboarding_credits: "all",
                      wallet_purchase: "all",
              maxInstallments: 1
            },
          },
          callbacks: {
            onReady: () => console.log("Payment Brick listo."),
            onSubmit: async ({ formData }) => {
              try {
                const response = await fetch("/process_payment", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(formData),
                });
                const result = await response.json();
                console.log("Pago procesado:", result);
              } catch (error) {
                console.error("Error en el pago:", error);
              }
            },
            onError: (error) => console.error("Error en Payment Brick:", error),
          },
        });
      } catch (error) {
        console.error("Error al crear el Payment Brick:", error);
      }
    };

    renderPaymentBrick();
  }, [preferenceId, amount, payer]);

  return <div ref={containerRef} id="mercado-pago-container" />;
}

export default MercadoPago;
