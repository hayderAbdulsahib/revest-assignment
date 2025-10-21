import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { IoChevronDown } from "react-icons/io5";
import ProductSelector from "../ProductSelector/ProductSelector";
import Dropdown from "../Dropdown/Dropdown";
import { fetchProducts } from "../../redux/slices/productSlice";
import "./style.css";

const OrderForm = ({ onSave, editingOrder, mode }) => {
  const dispatch = useDispatch();
  // Get products from Redux store
  const products = useSelector((state) => state.products.products);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef(null);

  // Fetch products from API on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Get available products from Redux store
  const getAvailableProducts = () => {
    return products || [];
  };

  // Order status options for dropdown
  const getStatusOptions = () => {
    return [
      { id: "confirmed", name: "Confirmed" },
      { id: "processing", name: "Processing" },
      { id: "shipped", name: "Shipped" },
      { id: "delivered", name: "Delivered" },
    ];
  };

  // Pre-fill form when editing
  useEffect(() => {
    if (mode === "edit" && editingOrder) {
      setFormData({
        customerName: editingOrder.customerName,
        customerEmail: editingOrder.customerEmail,
        customerPhone: editingOrder.customerPhone,
      });

      // Pre-populate selected products from order.orderProducts
      if (editingOrder.orderProducts && editingOrder.orderProducts.length > 0) {
        const products = editingOrder.orderProducts.map((orderProduct) => ({
          id: orderProduct.product.id,
          name: orderProduct.product.name,
          price: orderProduct.product.price,
        }));
        setSelectedProducts(products);
      } else {
        setSelectedProducts([]);
      }

      // Pre-populate selected status from order.status
      if (editingOrder.status) {
        const statusOption = getStatusOptions().find(
          (status) => status.id === editingOrder.status,
        );
        setSelectedStatus(statusOption || null);
      } else {
        setSelectedStatus(null);
      }
    } else {
      setFormData({
        customerName: "",
        customerEmail: "",
        customerPhone: "",
      });
      setSelectedProducts([]);
      setSelectedStatus(null);
      setIsStatusDropdownOpen(false);
    }
  }, [mode, editingOrder]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatusSelect = (status) => {
    setSelectedStatus(status);
    setIsStatusDropdownOpen(false);
  };

  const handleStatusDropdownToggle = () => {
    setIsStatusDropdownOpen(!isStatusDropdownOpen);
  };

  const handleStatusDropdownClose = () => {
    setIsStatusDropdownOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.customerName.trim() ||
      !formData.customerEmail.trim() ||
      !formData.customerPhone.trim()
    ) {
      alert("Please fill in all fields");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.customerEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    // Prepare order data
    const orderData = {
      customerName: formData.customerName,
      customerEmail: formData.customerEmail,
      customerPhone: formData.customerPhone,
      status: selectedStatus ? selectedStatus.id : "pending",
      orderProducts: selectedProducts.map((product) => ({
        productId: product.id,
        product: product,
      })),
    };

    onSave(orderData);

    // Reset form
    setFormData({
      customerName: "",
      customerEmail: "",
      customerPhone: "",
    });
    setSelectedProducts([]);
    setSelectedStatus(null);
    setIsStatusDropdownOpen(false);
  };

  return (
    <form className="order-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="customerName" className="form-label">
          Customer Name
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          value={formData.customerName}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter customer name"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerEmail" className="form-label">
          Customer Email
        </label>
        <input
          type="email"
          id="customerEmail"
          name="customerEmail"
          value={formData.customerEmail}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter customer email"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="customerPhone" className="form-label">
          Customer Phone
        </label>
        <input
          type="tel"
          id="customerPhone"
          name="customerPhone"
          value={formData.customerPhone}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter customer phone"
          required
        />
      </div>

      {/* Order Status field - only show in edit mode */}
      {mode === "edit" && (
        <div className="form-group">
          <label htmlFor="orderStatus" className="form-label">
            Order Status
          </label>
          <div className="status-selector" ref={statusDropdownRef}>
            <div
              className={`status-selector-field ${
                isStatusDropdownOpen ? "open" : ""
              }`}
              onClick={handleStatusDropdownToggle}
            >
              <span className="selected-status">
                {selectedStatus
                  ? selectedStatus.name
                  : "Select order status..."}
              </span>
              <div className="dropdown-trigger">
                <IoChevronDown
                  className={`dropdown-icon ${
                    isStatusDropdownOpen ? "rotated" : ""
                  }`}
                />
              </div>
            </div>

            <Dropdown
              items={getStatusOptions()}
              selectedItems={selectedStatus ? [selectedStatus] : []}
              onItemSelect={handleStatusSelect}
              placeholder="Select order status..."
              searchable={false}
              itemKey="id"
              itemLabel="name"
              isOpen={isStatusDropdownOpen}
              onClose={handleStatusDropdownClose}
            />
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="products" className="form-label">
          Products
        </label>
        <ProductSelector
          availableProducts={getAvailableProducts()}
          selectedProducts={selectedProducts}
          onChange={setSelectedProducts}
          placeholder="Select products for this order..."
        />
      </div>

      <button type="submit" className="form-submit-btn">
        Save
      </button>
    </form>
  );
};

export default OrderForm;
