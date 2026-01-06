import { useCart } from '../context/CartContext'
import './CartDrawer.css'

function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart
  } = useCart()

  const handleCheckout = () => {
    if (cartItems.length === 0) return

    const confirmMessage = `Order Total: ₹${getTotalPrice().toFixed(2)}\n\nProceed with checkout?`

    if (window.confirm(confirmMessage)) {
      alert('Order placed successfully! 🎉\n\nThank you for your purchase!')
      clearCart()
      closeCart()
    }
  }

  if (!isCartOpen) return null

  return (
    <>
      <div className="cart-overlay" onClick={closeCart}></div>
      <div className="cart-drawer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-cart" onClick={closeCart}>&times;</button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
              </svg>
              <p>Your cart is empty</p>
              <button className="btn-continue-shopping" onClick={closeCart}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map(item => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">₹{item.price}</p>
                      <div className="quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="cart-item-actions">
                      <p className="item-total">₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button
                        className="btn-remove"
                        onClick={() => removeFromCart(item.id)}
                        title="Remove from cart"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total</span>
                    <span>₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                </div>
                <button className="btn-checkout" onClick={handleCheckout}>
                  Proceed to Checkout
                </button>
                <button className="btn-clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default CartDrawer
