import React from "react";
import { useQuery } from "@tanstack/react-query";
import { customerApi } from "../lib/api";
import { formatDate } from "../lib/utils";

const CustomersPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["customer"],
    queryFn: customerApi.getAll,
  });

  const customers = data?.customers || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>
        <p className="text-base-content/70 mt-1">
          {customers.length} {customers.length === 1 ? "Customer" : "Customers"}{" "}
          registered
        </p>
      </div>

      {/* CUSTOMERS TABLE */}

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg" />
            </div>
          ) : customers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="flex flex-col items-center bg-base-100 border border-base-300/50 rounded-xl p-8 shadow-sm max-w-md">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="140"
                  width="140"
                  viewBox="0 0 24 24"
                  color="red"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-user-round-x-icon lucide-user-round-x"
                >
                  <path d="M2 21a8 8 0 0 1 11.873-7" />
                  <circle cx="10" cy="8" r="5" />
                  <path d="m17 17 5 5" />
                  <path d="m22 17-5 5" />
                </svg>

                {/* Title */}
                <p className="text-xl font-semibold text-base-content/70">
                  No Customers yet
                </p>

                {/* Subtitle */}
                <p className="text-sm text-base-content/60 mt-1 text-center px-4">
                  Customers will appear here once they sign up.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Email</th>
                    <th>Addresses</th>
                    <th>Wishlist</th>
                    <th>Joined Date</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer._id}>
                      <td className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="bg-primary text-primary-content rounded-full w-12">
                            <img
                              src={customer.imageUrl}
                              alt={customer.name}
                              className="w-12 h-12 rounded-full"
                            />
                          </div>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-white text-[15px]">
                            {customer.name}
                          </span>

                          <span className="text-xs px-2 py-1 bg-gray-500 text-white rounded-md w-fit mt-1">
                            {customer.email.split("@")[0]}
                          </span>
                        </div>
                      </td>

                      <td>{customer.email}</td>

                      <td>
                        <div className="badge badge-ghost">
                          {customer.addresses?.length || 0} address(es)
                        </div>
                      </td>

                      <td>
                        <div className="badge badge-ghost">
                          {customer.wishlist?.length || 0} item(s)
                        </div>
                      </td>

                      <td>
                        <span className="text-sm opacity-60">
                          {formatDate(customer.createdAt)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;

