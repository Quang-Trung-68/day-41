import { useEffect, useState } from "react";

const ProductModal = ({ open, onClose, mode, product, onConfirm }) => {
  const isDelete = mode === "delete";

  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    minimumOrderQuantity: "",
    thumbnail: "",
  });
  useEffect(() => {
    if (product && !isDelete) {
      setFormData({
        id: product.id || "",
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        discountPercentage: product.discountPercentage || "",
        rating: product.rating || "",
        stock: product.stock || "",
        tags: product.tags || "",
        brand: product.brand || "",
        sku: product.sku || "",
        weight: product.weight || "",
        minimumOrderQuantity: product.minimumOrderQuantity || "",
        thumbnail: product.thumbnail || "",
      });
    }
  }, [isDelete, product]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-[600px] max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {mode === "delete"
            ? "Xóa sản phẩm"
            : mode === "edit"
            ? "Sửa sản phẩm"
            : "Thêm sản phẩm"}
        </h2>

        {!isDelete ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              <input
                className="input"
                value={formData.title}
                placeholder="Title"
                name="title"
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              <input
                className="input"
                value={formData.category}
                placeholder="Category"
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
              />

              <input
                className="input"
                value={formData.price}
                placeholder="Price"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
              <input
                className="input"
                value={formData.discountPercentage}
                placeholder="Discount %"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discountPercentage: e.target.value,
                  })
                }
              />

              <input
                className="input"
                value={formData.rating}
                placeholder="Rating"
                onChange={(e) =>
                  setFormData({ ...formData, rating: e.target.value })
                }
              />
              <input
                className="input"
                value={formData.stock}
                placeholder="Stock"
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
              />

              <input
                className="input"
                value={formData.brand}
                placeholder="Brand"
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
              />
              <input
                className="input"
                value={formData.sku}
                placeholder="SKU"
                onChange={(e) =>
                  setFormData({ ...formData, sku: e.target.value })
                }
              />

              <input
                className="input"
                value={formData.weight}
                placeholder="Weight"
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
              />
              <input
                className="input"
                value={formData.minimumOrderQuantity}
                placeholder="Min Order Qty"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    minimumOrderQuantity: e.target.value,
                  })
                }
              />

              <input
                className="input"
                value={formData.tags}
                placeholder="Tags (comma separated)"
                onChange={(e) =>
                  setFormData({ ...formData, tags: e.target.value })
                }
              />
              <input
                className="input"
                value={formData.thumbnail}
                placeholder="Thumbnail (url)"
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.value })
                }
              />
            </div>

            <textarea
              className="input mt-3 w-full h-20"
              value={formData.description}
              placeholder="Description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            ></textarea>

            {/* PREVIEW IMAGE */}
            {formData.thumbnail && (
              <img
                src={formData.thumbnail}
                className="w-40 h-40 object-cover rounded mx-auto mt-3"
              />
            )}
          </>
        ) : (
          <>
            <div className="mb-2 text-gray-700">
              Bạn có chắc chắn muốn xóa sản phẩm này?
            </div>
            <div className="font-bold text-lg">{product.title}</div>
            {product.thumbnail && (
              <img
                src={product.thumbnail}
                className="w-40 h-40 object-cover rounded mx-auto mt-4"
              />
            )}
          </>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 mt-5">
          <button className="px-4 py-1.5 bg-gray-300 rounded" onClick={onClose}>
            Hủy bỏ
          </button>
          <button
            onClick={() => {
              isDelete ? onConfirm(product.id) : onConfirm(formData);
            }}
            className="px-4 py-1.5 bg-blue-600 text-white rounded"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
