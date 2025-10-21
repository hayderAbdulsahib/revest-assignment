import React, { useState, useEffect, useRef } from "react";
import { IoChevronDown, IoClose } from "react-icons/io5";
import Dropdown from "../Dropdown/Dropdown";
import "./style.css";

const ProductSelector = ({
  availableProducts = [],
  selectedProducts = [],
  onChange,
  placeholder = "Select products...",
  disabled = false,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products based on search term and exclude already selected
  const filteredProducts = availableProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const notSelected = !selectedProducts.some(
      (selected) => selected.id === product.id,
    );
    return matchesSearch && notSelected;
  });

  const handleProductSelect = (product) => {
    const newSelectedProducts = [...selectedProducts, product];
    onChange(newSelectedProducts);
    setSearchTerm("");
  };

  const handleProductRemove = (productId) => {
    const newSelectedProducts = selectedProducts.filter(
      (product) => product.id !== productId,
    );
    onChange(newSelectedProducts);
  };

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsDropdownOpen(!isDropdownOpen);
      setSearchTerm("");
    }
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const renderProductItem = (product) => (
    <div className="product-dropdown-item">
      <span className="product-name">{product.name}</span>
      <span className="product-price">${product.price}</span>
    </div>
  );

  return (
    <div className="product-selector" ref={containerRef}>
      <div
        className={`product-selector-field ${isDropdownOpen ? "open" : ""} ${disabled ? "disabled" : ""}`}
        onClick={handleToggleDropdown}
      >
        <div className="selected-products">
          {selectedProducts.length === 0 ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            selectedProducts.map((product) => (
              <div key={product.id} className="product-tag">
                <span className="product-tag-name">{product.name}</span>
                <button
                  type="button"
                  className="product-tag-remove"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductRemove(product.id);
                  }}
                >
                  <IoClose />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="dropdown-trigger">
          <IoChevronDown
            className={`dropdown-icon ${isDropdownOpen ? "rotated" : ""}`}
          />
        </div>
      </div>

      <Dropdown
        items={filteredProducts}
        selectedItems={selectedProducts}
        onItemSelect={handleProductSelect}
        placeholder={placeholder}
        searchPlaceholder="Search products..."
        disabled={disabled}
        searchable={true}
        renderItem={renderProductItem}
        itemKey="id"
        itemLabel="name"
        itemValue="price"
        isOpen={isDropdownOpen}
        onClose={handleCloseDropdown}
      />
    </div>
  );
};

export default ProductSelector;
