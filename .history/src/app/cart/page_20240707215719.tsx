"use client";

import { useCart } from "@/context/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

const Cart: React.FC = () => {
  const { items, removeItemFromCart, incrementItemQuantity, decrementItemQuantity } = useCart();

  const handleWhatsAppOrder = () => {
    const orderDetails = items.map(item => `${item.title} (x${item.quantity}) - Ksh${item.totalPrice}`).join('\n');
    const totalPrice = items.reduce((total, item) => total + item.totalPrice, 0);
    const message = `Order Details:\n${orderDetails}\n\nTotal: Ksh${totalPrice}`;
    const whatsappLink = `https://wa.me/<YOUR_PHONE_NUMBER>?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="flex p-4 space-x-4 pt-16 bg-white min-h-screen">
      <div className="w-2/3 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        {items.length === 0 ? (
          <p>No items in cart.</p>
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
              {items.map(item => (
                <tr key={item.id} className="border-b">
                  <td className="flex items-center space-x-2">
                    <button onClick={() => removeItemFromCart(item.id)}>
                      <FaTrash className="text-red-500" />
                    </button>
                    <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                    <span>{item.title}</span>
                  </td>
                  <td>{item.price}</td>
                  <td className="flex items-center space-x-2">
                    <button onClick={() => decrementItemQuantity(item.id)}>
                      <FaMinus className="text-gray-500" />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementItemQuantity(item.id)}>
                      <FaPlus className="text-gray-500" />
                    </button>
                  </td>
                  <td>{item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="w-1/3 p-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
        <div className="mb-4">
          <p className="text-lg">Subtotal: Ksh{items.reduce((total, item) => total + item.totalPrice, 0)}</p>
          <p className="text-lg">Total: Ksh{items.reduce((total, item) => total + item.totalPrice, 0)}</p>
        </div>
        <button
          onClick={handleWhatsAppOrder}
          className="w-full py-2 mb-4 text-white bg-green-500 rounded shadow-lg hover:bg-green-600"
        >
          Complete Order via WhatsApp
        </button>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Apply Coupon"
            className="flex-grow p-2 border rounded"
          />
          <button className="px-4 py-2 text-white bg-blue-500 rounded shadow-lg hover:bg-blue-600">
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
