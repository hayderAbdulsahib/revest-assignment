import { useState, useEffect, useRef } from "react";
import "./style.css";

const Dropdown = ({
  items = [],
  selectedItems = [],
  onItemSelect,
  searchPlaceholder = "Search...",
  searchable = true,
  renderItem = null,
  itemKey = "id",
  itemLabel = "name",
  itemValue = "value",
  className = "",
  isOpen = false,
  onClose = () => {},
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
        setSearchTerm("");
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Filter items based on search term and exclude already selected
  const filteredItems = items.filter((item) => {
    const matchesSearch = searchable
      ? item[itemLabel].toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const notSelected = !selectedItems.some(
      (selected) => selected[itemKey] === item[itemKey],
    );
    return matchesSearch && notSelected;
  });

  const handleItemSelect = (item) => {
    onItemSelect(item);
    setSearchTerm("");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultRenderItem = (item) => (
    <div className="dropdown-item-default">
      <span className="item-label">{item[itemLabel]}</span>
      {item[itemValue] && <span className="item-value">{item[itemValue]}</span>}
    </div>
  );

  if (!isOpen) return null;

  return (
    <div className={`dropdown-menu ${className}`} ref={dropdownRef}>
      <div className="dropdown-list">
        {filteredItems.length === 0 ? (
          <div className="no-items">
            {searchTerm ? "No items found" : "No items available"}
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item[itemKey]}
              className="dropdown-item"
              onClick={() => handleItemSelect(item)}
            >
              {renderItem ? renderItem(item) : defaultRenderItem(item)}
            </div>
          ))
        )}
      </div>
      {searchable && (
        <div className="dropdown-search">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
            autoFocus
          />
        </div>
      )}
    </div>
  );
};

export default Dropdown;
