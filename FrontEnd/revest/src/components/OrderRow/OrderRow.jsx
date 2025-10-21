import { FiEdit3, FiTrash2 } from "react-icons/fi";
import "./style.css";

const OrderRow = ({ order, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case "delivered":
        return "status-completed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-processing";
    }
  };

  return (
    <tr>
      <td>{order.id}</td>
      <td>
        <span className={`status-badge ${getStatusClass(order.status)}`}>
          {order.status}
        </span>
      </td>
      <td>{order.customerName}</td>
      <td>{order.customerEmail}</td>
      <td>{order.customerPhone}</td>
      <td>{order.totalProducts}</td>
      <td>${order.totalPrice?.toFixed(2)}</td>
      <td>
        <button
          className="action-btn edit-btn"
          onClick={() => onEdit(order)}
          title="Edit order"
        >
          <FiEdit3 />
        </button>
      </td>
      <td>
        <button
          className="action-btn delete-btn"
          onClick={() => onDelete(order.id)}
          title="Delete order"
        >
          <FiTrash2 />
        </button>
      </td>
    </tr>
  );
};

export default OrderRow;
