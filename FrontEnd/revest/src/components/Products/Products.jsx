import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import Modal from "../Modal/Modal";
import ProductForm from "../ProductForm/ProductForm";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../redux/slices/productSlice";
import "./style.css";

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  // Initialize products with API data on component mount
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [editingProduct, setEditingProduct] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleCreateProduct = () => {
    setModalMode("create");
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setModalMode("edit");
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (product) => {
    console.log("handleDeleteProduct", product);
    try {
      const result = await dispatch(deleteProduct(product.id));

      if (result.type === "products/deleteProduct/fulfilled") {
        setToastMessage("Product deleted successfully");
        setToastType("success");
        setIsToastVisible(true);
      } else {
        const errorMessage =
          result.payload || result.error?.message || "Unknown error occurred";
        console.error("Delete failed:", errorMessage);
        setToastMessage(`Failed to delete product: ${errorMessage}`);
        setToastType("error");
        setIsToastVisible(true);
      }
    } catch (error) {
      // Additional catch for any unexpected errors
      console.error("Unexpected error in handleDeleteProduct:", error);
      setToastMessage("Failed to delete product: Unexpected error");
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (formData) => {
    try {
      let result;
      let success = false;

      if (modalMode === "create") {
        result = await dispatch(
          createProduct({
            name: formData.name,
            price: parseFloat(formData.price),
          })
        );
      } else {
        // Dispatch update product action
        result = await dispatch(
          updateProduct({
            id: editingProduct.id,
            name: formData.name,
            price: parseFloat(formData.price),
          })
        );
      }

      if (
        result.type === "products/createProduct/fulfilled" ||
        result.type === "products/updateProduct/fulfilled"
      ) {
        success = true;
      } else if (result.type.includes("rejected")) {
        const errorMessage =
          result.payload?.message ||
          result.error?.message ||
          "Unknown error occurred";

        setToastMessage(
          modalMode === "create"
            ? `Failed to create product: ${errorMessage}`
            : `Failed to update product: ${errorMessage}`
        );
        setToastType("error");
        setIsToastVisible(true);
        return; // Exit early on error
      } else {
        // Fallback: check if result has error or payload indicating failure
        if (result.error || (result.payload && result.payload.error)) {
          const errorMessage =
            result.payload?.error ||
            result.error?.message ||
            "Unknown error occurred";
          setToastMessage(
            modalMode === "create"
              ? `Failed to create product: ${errorMessage}`
              : `Failed to update product: ${errorMessage}`
          );
          setToastType("error");
          setIsToastVisible(true);
          return; // Exit early on error
        } else {
          // If no clear error, assume success
          success = true;
        }
      }

      if (success) {
        setToastMessage(
          modalMode === "create"
            ? "Product created successfully"
            : "Product updated successfully"
        );
        setToastType("success");

        setIsModalOpen(false);
        setIsToastVisible(true);
        setEditingProduct(null);
      }
    } catch (error) {
      // Additional catch for any unexpected errors
      console.error("Unexpected error in handleSaveProduct:", error);
      setToastMessage(
        modalMode === "create"
          ? "Failed to create product: Unexpected error"
          : "Failed to update product: Unexpected error"
      );
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  const handleCloseToast = () => {
    setIsToastVisible(false);
  };

  // Loading state
  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <Loader message="Loading products..." />
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-container">
        <button
          className="create-product-btn"
          onClick={handleCreateProduct}
          disabled={loading}
        >
          Create New Product
        </button>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          ))}
        </div>
      </div>

      {/* Modal for creating/editing product */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={
          modalMode === "create" ? "New Product Data" : "Edit Product Data"
        }
      >
        <ProductForm
          onSave={handleSaveProduct}
          editingProduct={editingProduct}
          mode={modalMode}
        />
      </Modal>

      {/* Toast notification */}
      <Toast
        isVisible={isToastVisible}
        message={toastMessage}
        onClose={handleCloseToast}
        type={toastType}
      />
    </div>
  );
};

export default Products;
