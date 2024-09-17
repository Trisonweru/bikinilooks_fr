import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "./components/navigation/NavigationBar";
import NewsletterSignup from "./components/signup_newsletter";
import AppProvider from "./context/AppContext";
import CartProvider from "./context/CartContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <CartProvider>
        <div className="bg-[#752A78]  min-h-screen w-full flex flex-col items-center">
          <Navbar />
          <div className="w-[80%] bg-white  h-auto mt-24">
            <Component {...pageProps} />
          </div>
          <div className="bg-[#752A78] w-[80%] ml-auto mr-auto">
            <NewsletterSignup />
          </div>
          <div className="bg-[#fff] w-[80%] ml-auto mr-auto">
            <Footer />
          </div>
        </div>
      </CartProvider>{" "}
    </AppProvider>
  );
}
