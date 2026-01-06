import { useState, useEffect } from 'react'
import './ProductForm.css'

function ProductForm({ product, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    imageUrl: ''
  })

  useEffect(() => {
    if (product) {
      setFormData(product)
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: parseFloat(formData.price)
    })
  }

  return (
    <div className="product-form-overlay">
      <div className="product-form-container">
        <h2>{product ? 'Edit Product' : 'Add New Product'}</h2>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Wireless Headphones, Running Shoes"
              required
            />
            <span className="helper-text">Enter the product name (minimum 3 characters)</span>
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 999.99"
              required
            />
            <span className="helper-text">Enter price in Indian Rupees (₹) (e.g., 999.99)</span>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="e.g., Premium quality product with advanced features and excellent durability"
              required
            />
            <span className="helper-text">Provide a detailed description of the product</span>
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Sports">Sports</option>
              <option value="Home">Home</option>
              <option value="Accessories">Accessories</option>
              <option value="Fashion">Fashion</option>
            </select>
            <span className="helper-text">Choose the product category</span>
          </div>

          <div className="form-group">
            <label>Image URL</label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://images.unsplash.com/photo-xxxxx?w=400"
              required
            />
            <span className="helper-text">
              Enter image URL from Unsplash, Pexels, or any direct image link
              <br />
              Example: https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400
            </span>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-save">Save</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProductForm
