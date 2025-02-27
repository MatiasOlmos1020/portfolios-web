import { Request, Response } from "express";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

// Función para generar el cliente de Mercado Pago
const getMercadoPagoClient = () => {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN || "",
  });

  return {
    client,
    payment: new Payment(client),
    preference: new Preference(client),
  };
};


// Crear un pago
export const createPayment = async (req: Request, res: Response) => {
  try {
    const { payment, preference } = await getMercadoPagoClient();
    const response = await payment.create({ body: req.body });
    console.log("<--- Response from MercadoPago --->", response);
    res.status(200).json({ paymentId: response.id });
  } catch (error) {
    console.error("<--- Error from MercadoPago --->", error);
    res.status(500).json({ error: "Error creating payment" });
  }
};

// Crear una preferencia de pago
export const createPreference = async (req: Request, res: Response) => {
  try {
    const preferenceData = {
      items: [
        {
          id: "1234",
          title: "Producto de prueba",
          quantity: 1,
          currency_id: "ARS",
          unit_price: 10000,
        },
      ],
    };
    
    const { payment, preference } = await getMercadoPagoClient();
    const response = await preference.create({ body: preferenceData });
    console.log(preferenceData);
    console.log("Preference ID:", response.id);
    res.status(200).json({ preferenceId: response.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ error: "Error creating preference" });
  }
};

export const status = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.error("Error al obtener el estado del pago:", error);
    res.status(500).json({ error: "Error getting payment status" });
  }
}
