import OrderRow from "../OrderRow/OrderRow";
import "./style.css";

const OrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <div className="table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Customer Phone</th>
            <th>Total Products</th>
            <th>Total Price</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow
              key={order.id}
              order={order}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
