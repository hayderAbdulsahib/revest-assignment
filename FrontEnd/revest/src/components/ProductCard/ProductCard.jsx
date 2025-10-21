import { FiEdit3, FiTrash2 } from "react-icons/fi";
import "./style.css";

const ProductCard = ({ product, onEdit, onDelete }) => {
  const handleEdit = (e) => {
    e.stopPropagation();
    if (onEdit) {
      onEdit(product);
    }
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-content">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">${product.price}</p>
      </div>
      <div className="product-actions">
        <button
          className="action-btn edit-btn"
          onClick={handleEdit}
          title="Edit product"
        >
          <FiEdit3 />
        </button>
        <button
          className="action-btn delete-btn"
          onClick={handleDelete}
          title="Delete product"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
