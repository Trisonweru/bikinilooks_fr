"use client";

import { useCart } from "@/context/CartContext";


const Cart: React.FC = () => {
  const { items } = useCart();

  return (
    <div className="bg-black mih-h p-4 border rounded shadow-lg">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {items.length === 0 && <p>No items in cart.</p>}
      <ul>
        {items.map(item => (
          <li key={item.id} className="flex justify-between my-2">
            <div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p>Quantityeee: {item.quantity}</p>
              <p>Price: ${item.totalPrice.toFixed(2)}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
