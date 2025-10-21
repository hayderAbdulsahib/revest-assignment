import { useState, useEffect } from "react";
import "./style.css";

const ProductForm = ({ onSave, editingProduct, mode }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (mode === "edit" && editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
      });
    } else {
      setFormData({
        name: "",
        price: "",
      });
    }
  }, [mode, editingProduct]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name.trim() || !formData.price.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Check if price is a valid number
    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }

    // Call the onSave function with form data
    onSave(formData);

    // Reset form
    setFormData({
      name: "",
      price: "",
    });
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter product name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter product price"
          min="0"
          step="0.01"
          required
        />
      </div>

      <button type="submit" className="form-submit-btn">
        Save
      </button>
    </form>
  );
};

export default ProductForm;
