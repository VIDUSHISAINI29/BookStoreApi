import {config} from "dotenv";
config();

import express from "express";
import pkg from "duckdb";
import CORS from "cors";
import routes from "./routes/index.js";
import exp from "constants";
import Stripe from "stripe";
const stripe = new Stripe("sk_test_51QI7KACIEPPiVuoMgriLucF39IZxZ7fQ4NZfmybPnyEkMABEOz4ORgUUX8yZcWRtUhTSQ6jwXoQtMhWXS7N1Xr6R00QgErIdVS");

const {Database} = pkg;

const app = express();
const allowedOrigin = process.env.FRONTEND_URL


console.log('allowed Origin : ', allowedOrigin);

app.use(
    CORS({
        origin: allowedOrigin,
        credentials:true,
    })
)
const PORT = 4023;


app.use(express.json());

app.use(routes);

app.use(CORS());
app.use(express.json()); // Parse JSON request bodies

// Create Checkout Session (POST request)

app.post("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;
  const lineItems = products.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.name,
      },
      unit_amount: product.price * 100,
    },
    quantity: product.qty,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/payement-success",
    cancel_url: "http://localhost:5173/payment-cancel",
  });

  res.json({ id: session.id });
});


app.listen(PORT ,() => {
    console.log('server is on port : ', `${PORT}`);
})


