import './InfoModal.css'

function InfoModal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null

  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-header">
          <h2>{title}</h2>
          <button className="info-close-btn" onClick={onClose}>&times;</button>
        </div>
        <div className="info-modal-content">
          {children}
        </div>
        <div className="info-modal-footer">
          <button className="btn-close-modal" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default InfoModal
