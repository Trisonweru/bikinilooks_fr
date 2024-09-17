import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppProvider from "./context/AppContext";
import CartProvider from "./context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>{" "}
    </AppProvider>
  );
}
