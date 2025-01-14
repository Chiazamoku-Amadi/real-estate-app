import { Outfit } from "next/font/google";

export const outfit_init = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const outfit = outfit_init.variable;
