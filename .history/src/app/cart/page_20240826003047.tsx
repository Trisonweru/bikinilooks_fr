"use client";

import { useAppCtx } from "@/context/AppContext";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { useEffect } from "react";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import { useRouter } from 'next/router';


const Cart: React.FC = () => {
  const { items, removeItemFromCart, incrementItemQuantity, decrementItemQuantity } = useCart();
 
  const handleWhatsAppOrder = () => {
    const orderDetails = items.map(item => `${item.image} \n\n${item.title} (x${item.quantity}) - Ksh${item.totalPrice}`).join('\n');
    const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);
    const message = `${orderDetails}\n\nTotal: Ksh ${totalPrice}`;
    const whatsappLink = `https://wa.me/254768510515?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(amount);
  };

  const subtotal = items.reduce((total, item) => total + item.totalPrice, 0);
  const total = subtotal; // You can adjust this if there are additional charges

  const { addPathname } = useAppCtx();

  useEffect(() => {

    addPathname("/cart")
  }, []);


  const tkn =()=>{
   const tkn window.localStorage.getItem("token")
  }



  return (
    <div className="flex p-4 space-x-4 pt-28 bg-white min-h-screen">
      <div className="w-2/3 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p>No items in cart. <span className="text-[#752A78]"><Link href="/">Continue shopping</Link></span></p>
        ) : (
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="text-left">Product</th>
                <th className="text-left">Price (Ksh)</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items?.map(item => (
                <tr key={item.id} className="border-b p-4 space-y-4">
                  <td className="flex items-center space-x-4 mt-4 mb-2">
                    <button onClick={() => removeItemFromCart(item.id)}>
                      <FaTrash className="text-red-500" />
                    </button>
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                    <span>{item.title}</span>
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td className="flex items-center space-x-2">
                    <button onClick={() => decrementItemQuantity(item.id)}>
                      <FaMinus className="text-gray-500" />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementItemQuantity(item.id)}>
                      <FaPlus className="text-gray-500" />
                    </button>
                  </td>
                  <td>{formatCurrency(item.totalPrice)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-1/3 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        <div className="mb-4">
          <p className="text-lg font-light">Subtotal: <span className="font-semibold">{formatCurrency(subtotal)}</span> </p>
          <p className="text-lg font-light">Total: <span className="font-semibold">{formatCurrency(total)}</span></p>
        </div>
        <div className="flex flex-col space-y-4 mb-6">
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-2 text-white bg-green-500 rounded shadow-lg hover:bg-green-600"
          >
            Complete Order via WhatsApp
          </button>

          <Link href={"/auth/login"}>
          <button
            className="w-full py-2 mb-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600"
          >
            Checkout with M-pesa
          </button>
          </Link>
        </div>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Apply Coupon"
            className="flex-grow p-2 border rounded ring-1 ring-[#"
          />
          <button className="px-4 py-2 text-gray-400 bg-gray-100 rounded shadow-lg hover:bg-gray-200 border ">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// <Link href={"/checkout-form"}>
