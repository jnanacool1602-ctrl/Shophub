import { useState, useEffect } from 'react'
import ProductCard from './ProductCard'
import ProductForm from './ProductForm'
import { useAuth } from '../context/AuthContext'
import './ProductList.css'

const API_URL = 'http://localhost:3001/products'

function ProductList() {
  const [products, setProducts] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const { isAdmin } = useAuth()

  // Fetch products from API
  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  // CREATE or UPDATE
  const handleSave = async (productData) => {
    try {
      if (editingProduct) {
        // UPDATE
        const response = await fetch(`${API_URL}/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const updatedProduct = await response.json()
        setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p))
      } else {
        // CREATE
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productData)
        })
        const newProduct = await response.json()
        setProducts([...products, newProduct])
      }
      setShowForm(false)
      setEditingProduct(null)
    } catch (error) {
      console.error('Error saving product:', error)
    }
  }

  // DELETE
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`${API_URL}/${id}`, {
          method: 'DELETE'
        })
        setProducts(products.filter(p => p.id !== id))
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  // EDIT
  const handleEdit = (product) => {
    setEditingProduct(product)
    setShowForm(true)
  }

  // ADD NEW
  const handleAddNew = () => {
    setEditingProduct(null)
    setShowForm(true)
  }

  // CANCEL FORM
  const handleCancel = () => {
    setShowForm(false)
    setEditingProduct(null)
  }

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = ['All', ...new Set(products.map(p => p.category))]

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-filter"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {isAdmin() && (
          <button className="btn-add-product" onClick={handleAddNew}>
            + Add Product
          </button>
        )}
      </div>

      <div className="products-grid">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isAdmin={isAdmin()}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <p>No products found</p>
        </div>
      )}

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default ProductList
