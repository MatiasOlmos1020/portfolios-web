// src/services/mercadoPagoService.ts

declare global {
  interface Window {
    MercadoPago: any;
  }
}

export const initializeMercadoPago = () => {
  if (!window.MercadoPago) {
    console.error("MercadoPago SDK no cargado.");
    return null;
  }

  return new window.MercadoPago(
    process.env.REACT_APP_MERCADO_PAGO_PUBLIC_KEY!,
    {
      locale: "es-AR",
    }
  );
};

export const createPaymentBrick = async (
  containerId: string,
  preferenceId: string,
  amount: number,
  payer: object
) => {
  const mp = initializeMercadoPago();
  if (!mp) return;

  const bricksBuilder = mp.bricks();

  try {
    await bricksBuilder.create("payment", containerId, {
      initialization: {
        amount,
        preferenceId,
        payer,
      },
      customization: {
        visual: {
          style: {
            theme: "default",
          },
        },
        paymentMethods: {
          creditCard: "all",
          debitCard: "all",
          ticket: "all",
          bankTransfer: "all",
          atm: "all",
          onboarding_credits: "all",
          wallet_purchase: "all",
          maxInstallments: 1,
        },
      },
      callbacks: {
        onReady: () => console.log("Payment Brick listo."),
        onSubmit: async ({ formData }: { formData: any }) => {
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
        onError: (error: any) =>
          console.error("Error en Payment Brick:", error),
      },
    });
  } catch (error) {
    console.error("Error al crear el Payment Brick:", error);
  }
};
