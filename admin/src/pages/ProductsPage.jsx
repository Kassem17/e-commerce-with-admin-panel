import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { productApi } from "../lib/api";
import { getStockStatusBadge } from "../lib/utils";
import {
  PlusIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
  ImageIcon,
} from "lucide-react";
import Swal from "sweetalert2";

const ProductsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
  });
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  const queryClient = useQueryClient();

  // fetch data
  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: productApi.getAll,
  });

  // TODO: add a success popup or toast when adding/editing a product

  // we can use this or return res.data.products from the api
  // const products = data?.products ?? [];

  // use when we want to update , create, delete
  const createProductMutation = useMutation({
    mutationFn: productApi.create,
    // we call this to update the UI
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: productApi.update,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: productApi.delete,
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    // reset the state
    setFormData({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
    });
    setImages([]);
    setImagePreviews([]);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      stock: product.stock,
      category: product.category,
      description: product.description,
    });
    setImagePreviews(product.images);
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 3) return alert("Maximum 3 images allowed");

    // revoke previous blob URLs to free memory
    imagePreviews.forEach((url) => {
      if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    });

    setImages(files);
    setImagePreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // for new products require images
    if (!editingProduct && images.length === 0) {
      return alert("Please upload at least one image");
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("stock", formData.stock);

    // only append new images if they were selected

    if (images.length > 0) {
      images.forEach((image) => formDataToSend.append("images", image));
    }
    // images : according to the field we passed to the addProduct in the admin route

    if (editingProduct) {
      // calling the function
      updateProductMutation.mutate({
        id: editingProduct._id,
        formData: formDataToSend,
      });
    } else {
      createProductMutation.mutate(formDataToSend);
    }
  };

  const handleDelete = (product) => {
    Swal.fire({
      title: "Delete Product?",
      text: `"${product.name}" will be permanently removed.`,
      icon: "warning",
      background: "#1f1f1f", // dark popup background
      color: "#f5f5f5", // text color
      backdrop: `
      rgba(0,0,0,0.7)
      blur(6px)
    `,
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: "rounded-xl p-6 shadow-xl",
        confirmButton:
          "bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 shadow",
        cancelButton:
          "bg-gray-700 text-gray-300 px-5 py-2 rounded-lg hover:bg-gray-600 ml-3",
      },
      buttonsStyling: false,
      showClass: {
        popup: "animate__animated animate__fadeInDown animate__faster",
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp animate__faster",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductMutation.mutate(product._id);
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-base-content/70 mt-1">Manage your inventory</p>
        </div>
        <button
          className="btn btn-primary gap-2"
          onClick={() => setShowModal(true)}
        >
          <PlusIcon className="size-5" />
        </button>
      </div>

      {/* Products Grid */}

      {/* EMPTY STATE */}
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <div
            className="flex flex-col items-center bg-base-200/40 border border-base-300/50 
      rounded-2xl p-10 max-w-sm text-center shadow-sm"
          >
            {/* Icon */}
            <div className="bg-base-300/50 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-base-content/50"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-2-2h-4l-2-3-2 3H7a2 2 0 0 0-2 2v8" />
                <rect width="14" height="8" x="5" y="12" rx="2" />
              </svg>
            </div>

            <h2 className="text-xl font-bold text-base-content">
              No products added
            </h2>
            <p className="text-base-content/60 mt-1">
              Start adding products to manage your stock.
            </p>

            <button
              className="btn btn-primary mt-6 gap-2"
              onClick={() => setShowModal(true)}
            >
              <PlusIcon className="size-5" />
              Add Product
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        {products?.map((product) => {
          const status = getStockStatusBadge(product.stock);
          return (
            <div key={product._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="flex items-center gap-6">
                  <div className="avatar">
                    <div className="w-20 rounded-xl">
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="card-title">{product.name}</h3>
                        <p className="text-base-content/70 text-sm">
                          {product.category}
                        </p>
                      </div>
                      <div className={`badge ${status.class}`}>
                        {status.text}
                      </div>
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                      <div>
                        <p className="text-xs text-base-content/70">Price</p>
                        <p className="font-bold text-lg">${product.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-base-content/70">Stock</p>
                        <p className="font-bold text-lg">
                          {product.stock} units
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="card-actions">
                    <button
                      className="btn btn-square btn-ghost"
                      onClick={() => handleEdit(product)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="btn btn-square btn-ghost text-error"
                      onClick={() => handleDelete(product)}
                    >
                      {deleteProductMutation.isPending ? (
                        <span className="loading loading-spinner"></span>
                      ) : (
                        <Trash2Icon className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ADD/EDIT PRODUCT MODAL */}

      <input type="checkbox" className="modal-toggle" checked={showModal} />
      <div className="modal">
        <div className="modal-box max-w-2xl">
          <div className="flex items-center mb-4 justify-between">
            <h3 className="font-bold text-2xl">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h3>
            <button
              onClick={closeModal}
              className="btn btn-sm btn-circle btn-ghost "
            >
              <XIcon className="size-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label mb-2">
                  <span>Product Name</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter product name"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span>Category</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  required
                >
                  <option value="">Select category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label mb-2">
                  <span>Price ($)</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-control">
                <label className="label mb-2">
                  <span>Stock</span>
                </label>
                <input
                  type="number"
                  placeholder="0"
                  className="input input-bordered"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="form-control flex flex-col gap-2">
              <label className="label mb-2">
                <span>Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Enter product description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label mb-2">
                <span className="label-text font-semibold text-base flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Product Images
                </span>
                <span className="label-text-alt text-xs opacity-60">
                  Max 3 images
                </span>
              </label>

              <div className="bg-base-200 rounded-xl p-4 border-2 border-dashed border-base-300 hover:border-primary transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="file-input file-input-bordered file-input-primary w-full"
                  required={!editingProduct}
                />

                {editingProduct && (
                  <p className="text-xs text-base-content/60 mt-2 text-center">
                    Leave empty to keep current images
                  </p>
                )}
              </div>

              {imagePreviews.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="avatar">
                      <div className="w-20 rounded-lg">
                        <img src={preview} alt={`Preview ${index + 1}`} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="modal-action">
              <button
                type="button"
                onClick={closeModal}
                className="btn"
                disabled={
                  createProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={
                  createProductMutation.isPending ||
                  updateProductMutation.isPending
                }
              >
                {createProductMutation.isPending ||
                updateProductMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : editingProduct ? (
                  "Update Product"
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
