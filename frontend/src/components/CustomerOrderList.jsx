import Message from "./Message";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMyOrdersQuery } from "../redux/api/orderApiSlice";

const CustomerOrderList = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <>
      <h1 className="text-center text-2xl font-bold my-4">My Orders</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : orders.length === 0 ? (
        <Message variant="info">No orders found</Message>
      ) : (
        <table className="container mx-auto border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="text-left p-2 border">Order ID</th>
              <th className="text-left p-2 border">Date</th>
              <th className="text-left p-2 border">Total</th>
              <th className="text-left p-2 border">Paid</th>
              <th className="text-left p-2 border">Delivered</th>
              <th className="p-2 border"></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>
                <td className="p-2 border">₹ {order.totalPrice}</td>
                <td className="p-2 border">
                  {order.isPaid ? (
                    <span className="bg-green-400 text-white px-2 py-1 rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="bg-red-400 text-white px-2 py-1 rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="p-2 border">
                  {order.isDelivered ? (
                    <span className="bg-green-400 text-white px-2 py-1 rounded-full">
                      Yes
                    </span>
                  ) : (
                    <span className="bg-red-400 text-white px-2 py-1 rounded-full">
                      No
                    </span>
                  )}
                </td>
                <td className="p-2 border">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">
                      Details
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default CustomerOrderList;
