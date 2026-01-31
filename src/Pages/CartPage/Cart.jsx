import "./Cart.css";
import { useEffect, useState } from "react";

function CartPage() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCart(items);
  }, []);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum.toFixed(2));
  }, [cart]);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("storage"));
  };

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id) => {
    const updated = cart.filter(item => item.id !== id);
    updateCart(updated);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    const newOrder = {
      id: Date.now(),
      items: cart,
      total: total,
      date: new Date().toLocaleString()
    };

    orders.push(newOrder);

    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order placed successfully!");

    setCart([]);
    localStorage.removeItem("cartItems");

    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="d-flex p-3">

      {/* Cart Items */}
      
      <div className="w-75 d-flex flex-column gap-3">

        {cart.length === 0 && <h4>Your cart is empty 🛒</h4>}

        {cart.map(item => (
          <div key={item.id} className="productInCart d-flex gap-3">

            <img src={item.thumbnail} width="180" />

            <div>
              <h5>{item.title}</h5>
              <p>₹{item.price}</p>

              <div className="d-flex align-items-center gap-2">

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => decreaseQty(item.id)}
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={() => increaseQty(item.id)}
                >
                  +
                </button>

                <button
                  className="btn btn-danger btn-sm ms-3"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>

              </div>
            </div>
          </div>
        ))}

      </div>

      {/* Order Summary */}
      <div className="w-25 ps-3">

        <h4>Order Summary</h4>

        {cart.map(item => (
          <div key={item.id} className="d-flex gap-2 mb-2">

            <img src={item.thumbnail} width="70" />

            <div>
              <p className="mb-0">{item.title}</p>
              <small>
                ₹{item.price} × {item.quantity}
              </small>
            </div>

          </div>
        ))}

        <h5 className="mt-3">Total: ₹{total}</h5>

        {/* ⭐ NEW BUTTON */}
        <button
          className="btn btn-success w-100 mt-3"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default CartPage;
