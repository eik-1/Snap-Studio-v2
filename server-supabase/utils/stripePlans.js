import dotenv from "dotenv";
dotenv.config();

export const plans = [
  {
    title: "BasicMonth",
    price: 15,
    originalPrice: 20,
    link: process.env.BASICMONTHLY_URL,
    priceId: process.env.BASICMONTHLY_ID,
  },
  {
    title: "ProMonth",
    price: 35,
    originalPrice: 40,
    link: process.env.PROMONTHLY_URL,
    priceId: process.env.PROMONTHLY_ID,
  },
  {
    title: "BasicYear",
    price: 12.5,
    originalPrice: 20,
    link: process.env.BASICYEARLY_URL,
    priceId: process.env.BASICYEARLY_ID,
  },
  {
    title: "ProYear",
    price: 29,
    originalPrice: 40,
    link: process.env.PROYEARLY_URL,
    priceId: process.env.PROYEARLY_ID,
  },
];
