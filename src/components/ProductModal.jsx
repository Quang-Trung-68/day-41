import { useEffect, useState } from "react";

import * as z from "zod";

const initFormData = {
  id: "",
  title: "",
  description: "",
  category: "",
  price: "0",
  discountPercentage: "0",
  rating: "0",
  stock: "0",
  tags: "",
  brand: "",
  sku: "",
  weight: "0",
  minimumOrderQuantity: "0",
  thumbnail: "",
};

// ProductModal Component
const ProductModal = ({ open, onClose, mode, product, onConfirm }) => {
  const isDelete = mode === "delete";

  const [formData, setFormData] = useState(initFormData);

  const ProductSchema = z.object({
    id: z.any(),

    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    category: z.string().min(1, "Category is required"),

    price: z
      .string()
      .min(1, "Price is required")
      .transform((val) => Number(val)),

    discountPercentage: z
      .string()
      .min(1, "Discount Percentage is required")
      .transform((val) => Number(val)),

    rating: z
      .string()
      .min(1, "Rating is required")
      .transform((val) => Number(val)),

    stock: z
      .string()
      .min(1, "Stock is required")
      .transform((val) => Number(val)),

    weight: z
      .string()
      .min(1, "Weight is required")
      .transform((val) => Number(val)),

    minimumOrderQuantity: z
      .string()
      .min(1, "Minimum Order Quantity is required")
      .transform((val) => Number(val)),

    tags: z.union([
      z.string().min(1, "Tags is required"),
      z.array(z.string()).min(1, "Tags array must have at least 1 item"),
    ]),

    brand: z.string().min(1, "Brand is required"),
    sku: z.string().min(1, "SKU is required"),
    thumbnail: z.string().min(1, "Thumbnail URL is required"),
  });

  useEffect(() => {
    if (product && mode === "edit") {
      setFormData({
        id: product.id || "",
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: String(product.price) || "",
        discountPercentage: String(product.discountPercentage) || "",
        rating: String(product.rating) || "",
        stock: String(product.stock) || "",
        tags: product.tags || "",
        brand: product.brand || "",
        sku: product.sku || "",
        weight: String(product.weight) || "",
        minimumOrderQuantity: String(product.minimumOrderQuantity) || "",
        thumbnail: product.thumbnail || "",
      });
    } else if (mode === "create") {
      setFormData(initFormData);
    }
  }, [product, mode]);

  const handleConfirm = () => {
    if (mode === "delete") {
      onConfirm(product.id);
    } else {
      const result = ProductSchema.safeParse(formData);
      console.log(result);
      if (!result.success) {
        result.error;
      } else {
        onConfirm(formData);
        result.data;
      }
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold">
            {mode === "delete"
              ? "Xóa sản phẩm"
              : mode === "edit"
              ? "Sửa sản phẩm"
              : "Thêm sản phẩm"}
          </h2>
        </div>

        <div className="p-6">
          {!isDelete ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tên sản phẩm
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.title}
                    placeholder="Nhập tên sản phẩm"
                    name="title"
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Danh mục
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.category}
                    placeholder="Nhập danh mục"
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Giá
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.price ?? ""}
                    placeholder="0.00"
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Giảm giá (%)
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.discountPercentage ?? ""}
                    placeholder="0"
                    type="number"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        discountPercentage: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Đánh giá
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.rating ?? ""}
                    placeholder="0.0"
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, rating: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Tồn kho
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.stock}
                    placeholder="0"
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Thương hiệu
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.brand}
                    placeholder="Nhập thương hiệu"
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    SKU
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.sku}
                    placeholder="Nhập SKU"
                    onChange={(e) =>
                      setFormData({ ...formData, sku: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Trọng lượng
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.weight ?? ""}
                    placeholder="0"
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Số lượng tối thiểu
                  </label>
                  <input
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                    value={formData.minimumOrderQuantity ?? ""}
                    placeholder="1"
                    type="number"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        minimumOrderQuantity: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Tags (phân cách bằng dấu phẩy)
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={formData.tags}
                  placeholder="tag1, tag2, tag3"
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  URL Hình ảnh
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  value={formData.thumbnail}
                  placeholder="https://example.com/image.jpg"
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.value })
                  }
                />
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  value={formData.description}
                  placeholder="Nhập mô tả sản phẩm"
                  rows="4"
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                ></textarea>
              </div>

              {formData.thumbnail && (
                <div className="mt-6">
                  <label className="text-sm font-medium text-gray-700 block mb-2">
                    Xem trước
                  </label>
                  <img
                    src={formData.thumbnail}
                    className="w-48 h-48 object-cover rounded-lg mx-auto border-4 border-gray-100 shadow-md"
                    alt="Preview"
                  />
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mb-4 text-gray-700 text-lg">
                Bạn có chắc chắn muốn xóa sản phẩm này?
              </div>
              <div className="font-bold text-2xl text-gray-900 mb-4">
                {product.title}
              </div>
              {product.thumbnail && (
                <img
                  src={product.thumbnail}
                  className="w-56 h-56 object-cover rounded-xl mx-auto shadow-lg border-4 border-gray-100"
                  alt={product.title}
                />
              )}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 p-6 bg-gray-50 rounded-b-2xl border-t border-gray-200">
          <button
            className="px-6 py-2.5 cursor-pointer bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Hủy bỏ
          </button>
          <button
            // onClick={() => {
            //   isDelete ? onConfirm(product.id) : onConfirm(formData);
            // }}
            onClick={handleConfirm}
            className="px-6 py-2.5 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all shadow-md hover:shadow-lg"
          >
            Đồng ý
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
