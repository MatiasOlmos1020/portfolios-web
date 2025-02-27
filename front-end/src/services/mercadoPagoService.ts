import axios from "axios";

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

export const createPreference = async () => {
  const mp = initializeMercadoPago();
  if (!mp) return;

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_BASE_URL}/api/mp/create-preference`,
      //preferenceData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log("Preferencia de pago creada:", data.preferenceId);
    return data.preferenceId;
  } catch (error) {
    console.error(
      "Error al crear la preferencia de pago:",
      (error as any).response?.data || (error as any).message
    );
  }
}

export const createPaymentBrick = async (
  containerId: string,
  //preferenceId: string,
  amount: number,
  payer: object
) => {
  const mp = initializeMercadoPago();
  if (!mp) return;

  const bricksBuilder = mp.bricks();
  const preferenceId = await createPreference();
  console.log(preferenceId);
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
        onReady: () => {
            console.log("Payment Brick listo.")
        },
        onSubmit: async ({ formData }: { formData: any }) => {
          try {
            console.log(formData)
            const { data } = await axios.post(
              `${process.env.REACT_APP_API_BASE_URL}/api/mp/create-payment`,
              formData,
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log("Pago procesado:", data);
          } catch (error) {
            console.error(
              "Error en el pago:",
              (error as any).response?.data || (error as any).message
            );
          }
        },
        onError: (error: any) => console.error("Error en Payment Brick:", error),
      },
    });
  } catch (error) {
    console.error("Error al crear el Payment Brick:", error);
  }
};
