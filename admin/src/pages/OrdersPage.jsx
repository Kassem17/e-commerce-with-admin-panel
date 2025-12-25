import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { orderApi } from "../lib/api";
import { formatDate } from "../lib/utils";

const OrdersPage = () => {
  const queryClient = useQueryClient();

  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: orderApi.getAll,
  });

  const updateStatusMutation = useMutation({
    mutationFn: orderApi.updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    },
  });

  const handleStatusChange = (orderId, status) => {
    updateStatusMutation.mutate({ orderId, status: status });
  };

  const orders = ordersData?.orders || [];

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Orders</h1>
        <p className="text-base-content/70">Manage Customer orders</p>
      </div>

      {/* ORDERS TABLE */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex flex-col items-center bg-base-100 border border-base-300/50 rounded-xl p-8 shadow-sm max-w-md">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-14 w-14 text-base-content/40 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15V6a2 2 0 0 0-2-2h-4l-2-2H7L5 4H3a2 2 0 0 0-2 2v9" />
                  <circle cx="9" cy="19" r="2" />
                  <circle cx="17" cy="19" r="2" />
                </svg>

                {/* Title */}
                <p className="text-xl font-semibold text-base-content/70">
                  No Orders yet
                </p>

                {/* Subtitle */}
                <p className="text-sm text-base-content/60 mt-1 text-center px-4">
                  Orders will appear here once customers make purchases.
                </p>
              </div>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="flex flex-col items-center rounded-xl p-6 shadow-sm max-w-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-500 mb-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12" y2="16" />
                </svg>

                <p className="text-xl font-semibold text-red-600">
                  Error in fetching Orders
                </p>

                <p className="text-sm text-red-500 mt-1">
                  {error?.message || "An error occurred"}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    const totalQuantity = order.orderItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    );
                    return (
                      <tr key={order._id}>
                        <td>
                          <span className="font-medium">
                            #{order._id.slice(-8).toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div className="font-medium">
                            {order.shippingAddress.fullName}
                          </div>
                          <div className="text-sm opacity-60">
                            {order.shippingAddress.city},{" "}
                            {order.shippingAddress.state}
                          </div>
                        </td>

                        <td>
                          <div className="font-medium">
                            {totalQuantity} items
                          </div>
                          <div className="text-sm opacity-60">
                            {order.orderItems[0]?.name}
                            {order.orderItems.length > 1 &&
                              `+${order.orderItems.length - 1} more`}
                          </div>
                        </td>

                        <td>
                          <div className="font-semibold">
                            {order.totalPrice.toFixed(2)}
                          </div>
                        </td>

                        <td>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order._id, e.target.value)
                            }
                            className="select select-sm"
                            disabled={updateStatusMutation.isPending}
                          >
                            <option value="pending">Pending</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>

                        <td>
                          <span className="text-sm opacity-60">
                            {formatDate(order.createdAt)}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
