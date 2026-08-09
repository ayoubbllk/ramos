import localFont from "next/font/local";
import { Outfit } from "next/font/google";

/** Inter Variable — titres + header */
export const display = localFont({
  src: [
    {
      path: "./Inter-Variable.ttf",
      style: "normal",
    },
    {
      path: "./Inter-Italic-Variable.ttf",
      style: "italic",
    },
  ],
  variable: "--font-display",
  display: "swap",
  weight: "100 900",
});

/** Outfit — corps de texte */
export const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
