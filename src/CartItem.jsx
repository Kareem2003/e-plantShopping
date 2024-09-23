import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce(
        (total, item) => total + item.quantity * parseFloat(item.cost.slice(1)),
        0
      )
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
  };

  const handleIncrement = (item) => {
    // Increase the quantity of the item in the cart
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    // Decrease the quantity of the item in the cart, but not below 1
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({ name: item.name, quantity: item.quantity - 1 })
      );
    }
  };

  const handleRemove = (item) => {
    // Remove the item from the cart
    dispatch(removeItem({ name: item.name })); // Corrected this line
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.slice(1))).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>
      <div>
        {cart.map((item) => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button
                  className="cart-item-button cart-item-button-dec"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <span className="cart-item-quantity-value">
                  {item.quantity}
                </span>
                <button
                  className="cart-item-button cart-item-button-inc"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>
              </div>
              <div className="cart-item-total">
                Total: ${calculateTotalCost(item)}
              </div>
              <button
                className="cart-item-delete"
                onClick={() => handleRemove(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      ></div>
      <div className="continue_shopping_btn">
        <button
          className="get-started-button"
          onClick={(e) => handleContinueShopping(e)}
        >
          Continue Shopping
        </button>
        <br />
        <button
          className="get-started-button1"
          onClick={() => alert("thank you")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
