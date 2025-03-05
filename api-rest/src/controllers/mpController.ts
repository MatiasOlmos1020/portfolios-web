import { Request, Response } from "express";
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";

const createCardToken = async () => {
  const url = "https://api.mercadopago.com/v1/card_tokens";
  const headers = {
    "Authorization": `Bearer ${process.env.MERCADO_PAGO_ACCESS_TOKEN }`,
    "Content-Type": "application/json",
  };
  const body = JSON.stringify({
    card_number: "4517660175667491",
    expiration_month: 6,
    expiration_year: 2028,
    security_code: "",
    cardholder: {
      name: "Matias Olmos",
    },
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }

    const data = await response.json();
    console.log("✅ Card Token generado:", data);
    return data;
  } catch (error) {
    console.error("❌ Error al generar el token:", error);
  }
};

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
    const cardTokenResponse = await createCardToken(); // Genera el token
    req.body.token = cardTokenResponse.id;
    console.log("<--- request body --->", req.body);
    
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
          unit_price: 300,
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
