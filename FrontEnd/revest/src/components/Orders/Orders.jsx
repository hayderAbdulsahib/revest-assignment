import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import OrderTable from "../OrderTable/OrderTable";
import Modal from "../Modal/Modal";
import OrderForm from "../OrderForm/OrderForm";
import Toast from "../Toast/Toast";
import Loader from "../Loader/Loader";
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  deleteOrderProducts,
} from "../../redux/slices/orderSlice";
import "./style.css";

const Orders = () => {
  // Redux state
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const loading = useSelector((state) => state.orders.loading);

  // Modal and toast state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToastVisible, setIsToastVisible] = useState(false);
  const [modalMode, setModalMode] = useState("create"); // 'create' or 'edit'
  const [editingOrder, setEditingOrder] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const handleCreateOrder = () => {
    setModalMode("create");
    setEditingOrder(null);
    setIsModalOpen(true);
  };

  const handleEditOrder = (order) => {
    setModalMode("edit");
    setEditingOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingOrder(null);
  };

  const handleSaveOrder = async (formData) => {
    console.log("Orders: handleSaveOrder called with data:", formData);

    try {
      if (modalMode === "create") {
        // eslint-disable-next-line no-unused-vars
        const { orderProducts, status, ...rest } = formData;
        const productIds = orderProducts.map((product) => product.productId);
        const result = await dispatch(createOrder({ ...rest, productIds }));

        // Check if the action was rejected
        if (createOrder.rejected.match(result)) {
          const errorMessage =
            result.payload?.message ||
            result.payload ||
            "Failed to create order";
          setToastMessage(`Error: ${errorMessage}`);
          setToastType("error");
          setIsToastVisible(true);
          return; // Don't close modal on error
        }

        setToastMessage("Order created successfully");
        setToastType("success");
      } else {
        const { orderProducts, ...rest } = formData;
        const productIds = orderProducts.map((product) => product.productId);

        // Get original product IDs from the editing order
        const originalProductIds =
          editingOrder.orderProducts?.map(
            (orderProduct) => orderProduct.productId
          ) || [];

        // Find products that were removed (in original but not in current)
        const removedProductIds = originalProductIds.filter(
          (productId) => !productIds.includes(productId)
        );

        // If there are removed products, call the delete API first
        if (removedProductIds.length > 0) {
          console.log("Removing products from order:", removedProductIds);
          const deleteResult = await dispatch(
            deleteOrderProducts({
              orderId: editingOrder.id,
              productIds: removedProductIds,
            })
          );

          // Check if the delete action was rejected
          if (deleteOrderProducts.rejected.match(deleteResult)) {
            const errorMessage =
              deleteResult.payload?.message ||
              deleteResult.payload ||
              "Failed to remove products from order";
            setToastMessage(`Error: ${errorMessage}`);
            setToastType("error");
            setIsToastVisible(true);
            return; // Don't close modal on error
          }
        }

        // Update the order with remaining products
        const result = await dispatch(
          updateOrder({ id: editingOrder.id, ...rest, productIds })
        );

        // Check if the action was rejected
        if (updateOrder.rejected.match(result)) {
          const errorMessage =
            result.payload?.message ||
            result.payload ||
            "Failed to update order";
          setToastMessage(`Error: ${errorMessage}`);
          setToastType("error");
          setIsToastVisible(true);
          return; // Don't close modal on error
        }

        setToastMessage("Order updated successfully");
        setToastType("success");
      }

      // Only close modal and reset editing order on successful API call
      setIsModalOpen(false);
      setEditingOrder(null);
      setIsToastVisible(true);
    } catch (error) {
      console.error("Error saving order:", error);
      setToastMessage("Error saving order");
      setToastType("error");
      setIsToastVisible(true);
      // Modal stays open on error - user can retry or cancel manually
    }
  };

  const handleCloseToast = () => {
    setIsToastVisible(false);
  };

  const handleEdit = (order) => {
    handleEditOrder(order);
  };

  const handleDelete = async (orderId) => {
    console.log("Orders: handleDelete called with orderId:", orderId);

    try {
      const result = await dispatch(deleteOrder(orderId));

      // Check if the action was rejected
      if (deleteOrder.rejected.match(result)) {
        const errorMessage =
          result.payload?.message || result.payload || "Failed to delete order";
        setToastMessage(`Error: ${errorMessage}`);
        setToastType("error");
        setIsToastVisible(true);
        return;
      }

      setToastMessage("Order deleted successfully");
      setToastType("success");
      setIsToastVisible(true);
    } catch (error) {
      console.error("Error deleting order:", error);
      setToastMessage("Error deleting order");
      setToastType("error");
      setIsToastVisible(true);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-container">
          <Loader message="Loading orders..." />
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <button className="create-order-btn" onClick={handleCreateOrder}>
          Create New Order
        </button>

        <OrderTable
          orders={orders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal for creating/editing order */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={modalMode === "create" ? "New Order Data" : "Edit Order Data"}
      >
        <OrderForm
          onSave={handleSaveOrder}
          editingOrder={editingOrder}
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

export default Orders;
