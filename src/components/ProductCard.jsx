import { useCart } from '../context/CartContext'
import './ProductCard.css'

function ProductCard({ product, onEdit, onDelete, isAdmin }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(product)
  }

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">₹{product.price}</span>
          {isAdmin ? (
            <div className="product-actions">
              <button className="btn-edit" onClick={() => onEdit(product)}>Edit</button>
              <button className="btn-delete" onClick={() => onDelete(product.id)}>Delete</button>
            </div>
          ) : (
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
