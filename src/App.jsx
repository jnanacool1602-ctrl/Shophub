import { useState } from 'react'
import amatLogo from './assets/Amatlogo.png'
import ProductList from './components/ProductList'
import LoginModal from './components/LoginModal'
import CartDrawer from './components/CartDrawer'
import InfoModal from './components/InfoModal'
import { useAuth } from './context/AuthContext'
import { useCart } from './context/CartContext'
import './App.css'

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [showContactModal, setShowContactModal] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const { getTotalItems, toggleCart } = useCart()

  const handleLoginClick = () => {
    setShowLoginModal(true)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <>
      <header className="header">
        <img src={amatLogo} className="amat-logo" alt="AMAT logo" />
        <div className="brand-section">
          <h1 className="header-title">ShopHub</h1>
          <p className="tagline">Your Shopping Hub</p>
        </div>

        <div className="auth-section">
          <div className="cart-icon" onClick={toggleCart}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 2L7 6H3a1 1 0 00-1 1v13a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1h-4l-2-4H9z"/>
              <circle cx="10" cy="14" r="2"/>
              <circle cx="16" cy="14" r="2"/>
            </svg>
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </div>

          {isAuthenticated ? (
            <>
              <span className="welcome-text">Welcome, {user?.username}</span>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <span className="login-text" onClick={handleLoginClick}>Login</span>
          )}
        </div>
      </header>

      <main className="main-content">
        <ProductList />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <p>&copy; {new Date().getFullYear()} Applied Materials. All rights reserved.</p>
          </div>
          <div className="footer-section">
            <a href="#privacy" onClick={(e) => { e.preventDefault(); setShowPrivacyModal(true); }}>Privacy Policy</a>
            <a href="#terms" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>Terms of Service</a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); setShowContactModal(true); }}>Contact Us</a>
          </div>
        </div>
      </footer>

      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
      <CartDrawer />

      <InfoModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} title="Privacy Policy">
        <h3>Information We Collect</h3>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>Name, email address, and contact information</li>
          <li>Payment and billing information</li>
          <li>Shipping and delivery addresses</li>
          <li>Purchase history and preferences</li>
        </ul>

        <h3>How We Use Your Information</h3>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Process and fulfill your orders</li>
          <li>Send order confirmations and updates</li>
          <li>Provide customer support</li>
          <li>Improve our products and services</li>
          <li>Send promotional emails (with your consent)</li>
        </ul>

        <h3>Data Security</h3>
        <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure. All payment transactions are processed through secure, encrypted connections.</p>

        <h3>Your Rights</h3>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal data</li>
          <li>Request corrections to your data</li>
          <li>Request deletion of your account</li>
          <li>Opt-out of marketing communications</li>
        </ul>

        <h3>Contact Us</h3>
        <p>If you have questions about this Privacy Policy, please contact us at privacy@amat.com</p>
      </InfoModal>

      <InfoModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} title="Terms of Service">
        <h3>1. Acceptance of Terms</h3>
        <p>By accessing and using this website, you accept and agree to be bound by the terms and conditions of this agreement.</p>

        <h3>2. Products and Services</h3>
        <p>All products and services are subject to availability. We reserve the right to discontinue any product at any time. Prices are subject to change without notice.</p>

        <h3>3. Orders and Payment</h3>
        <ul>
          <li>All orders are subject to acceptance and availability</li>
          <li>Payment must be received before order processing</li>
          <li>We accept major credit/debit cards and UPI payments</li>
          <li>Prices are listed in Indian Rupees (₹) and include applicable taxes</li>
        </ul>

        <h3>4. Shipping and Delivery</h3>
        <p>We aim to deliver products within 5-7 business days. Delivery times may vary based on location. Shipping charges, if any, will be displayed at checkout.</p>

        <h3>5. Returns and Refunds</h3>
        <ul>
          <li>Products can be returned within 7 days of delivery</li>
          <li>Items must be unused and in original packaging</li>
          <li>Refunds will be processed within 7-10 business days</li>
        </ul>

        <h3>6. User Conduct</h3>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for any unlawful purpose</li>
          <li>Attempt to gain unauthorized access</li>
          <li>Interfere with the proper working of the site</li>
          <li>Transmit any malicious code or viruses</li>
        </ul>

        <h3>7. Limitation of Liability</h3>
        <p>Applied Materials, Inc. shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or services.</p>

        <h3>8. Governing Law</h3>
        <p>These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Bangalore, India.</p>
      </InfoModal>

      <InfoModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} title="Contact Us">
        <h3>Get in Touch</h3>
        <p>We're here to help! Reach out to us through any of the following channels:</p>

        <div className="contact-section">
          <h4>📧 Email Support</h4>
          <p><strong>General Inquiries:</strong> support@amat.com</p>
          <p><strong>Sales:</strong> sales@amat.com</p>
          <p><strong>Technical Support:</strong> tech@amat.com</p>
        </div>

        <div className="contact-section">
          <h4>📞 Phone Support</h4>
          <p><strong>Customer Care:</strong> +91-80-1234-5678</p>
          <p><strong>Sales Hotline:</strong> +91-80-1234-5679</p>
          <p><strong>Hours:</strong> Monday - Saturday, 9:00 AM - 6:00 PM IST</p>
        </div>

        <div className="contact-section">
          <h4>🏢 Corporate Office</h4>
          <p>Applied Materials India Pvt. Ltd.</p>
          <p>123 MG Road, Koramangala</p>
          <p>Bangalore - 560095, Karnataka, India</p>
        </div>

        <div className="contact-section">
          <h4>💬 Live Chat</h4>
          <p>Chat with our support team during business hours by clicking the chat icon at the bottom right of the page.</p>
        </div>

        <div className="contact-section">
          <h4>🌐 Social Media</h4>
          <p>Follow us for updates and announcements:</p>
          <p>Twitter: @AMAT_India</p>
          <p>LinkedIn: Applied Materials India</p>
          <p>Instagram: @amat_india</p>
        </div>

        <div className="contact-section">
          <h4>⏰ Response Time</h4>
          <p>We aim to respond to all inquiries within 24 hours during business days.</p>
        </div>
      </InfoModal>
    </>
  )
}

export default App
