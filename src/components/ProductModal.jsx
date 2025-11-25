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
  const [errors, setErrors] = useState({});

  const ProductSchema = z.object({
    id: z.any(),

    title: z.string().min(1, "Tên sản phẩm là bắt buộc"),
    description: z.string().min(1, "Mô tả sản phẩm là bắt buộc"),
    category: z.string().min(1, "Danh mục là bắt buộc"),

    price: z
      .string()
      .min(1, "Giá là bắt buộc")
      .transform((val) => Number(val))
      .refine((val) => val > 0, { message: "Giá phải lớn hơn 0" }),

    discountPercentage: z
      .string()
      .min(1, "Phần trăm giảm giá là bắt buộc")
      .transform((val) => Number(val))
      .refine((val) => val >= 0, { message: "Giảm giá không được âm" }),

    rating: z
      .string()
      .min(1, "Đánh giá là bắt buộc")
      .transform((val) => Number(val))
      .refine((val) => val >= 0, { message: "Đánh giá không được âm" }),

    stock: z
      .string()
      .min(1, "Tồn kho là bắt buộc")
      .transform((val) => Number(val))
      .refine((val) => val >= 0, { message: "Tồn kho không được âm" }),

    weight: z
      .string()
      .min(1, "Trọng lượng là bắt buộc")
      .transform((val) => Number(val))
      .refine((val) => val > 0, { message: "Trọng lượng phải lớn hơn 0" }),

    minimumOrderQuantity: z
      .string()
      .min(1, "Số lượng tối thiểu là bắt buộc")
      .transform((val) => Number(val))
      .refine((val) => val >= 1, {
        message: "Số lượng tối thiểu phải lớn hơn hoặc bằng 1",
      }),

    tags: z.union([
      z.string().min(1, "Tags là bắt buộc"),
      z.array(z.string()).min(1, "Mảng tags phải có ít nhất 1 phần tử"),
    ]),

    brand: z.string().min(1, "Thương hiệu là bắt buộc"),
    sku: z.string().min(1, "SKU là bắt buộc"),
    thumbnail: z
      .string()
      .min(1, "URL hình ảnh là bắt buộc")
      .url("URL hình ảnh không hợp lệ"),
  });

  useEffect(() => {
    setErrors({});
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: "" });
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
    if (mode === "delete") {
      onConfirm(product.id);
      return;
    } else {
      const result = ProductSchema.safeParse(formData);
      if (!result.success) {
        const formattedErrors = {};

        result.error.issues.forEach((issue) => {
          const field = issue.path[0];
          formattedErrors[field] = issue.message;
        });

        setErrors(formattedErrors);
        return;
      } else {
        onConfirm(formData);
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
                {[
                  {
                    label: "Tên sản phẩm",
                    name: "title",
                    type: "text",
                    placeholder: "Nhập tên sản phẩm",
                  },
                  {
                    label: "Danh mục",
                    name: "category",
                    type: "text",
                    placeholder: "Nhập danh mục",
                  },
                  {
                    label: "Giá",
                    name: "price",
                    type: "number",
                    placeholder: "0.00",
                  },
                  {
                    label: "Giảm giá (%)",
                    name: "discountPercentage",
                    type: "number",
                    placeholder: "0",
                  },
                  {
                    label: "Đánh giá",
                    name: "rating",
                    type: "number",
                    placeholder: "0.0",
                  },
                  {
                    label: "Tồn kho",
                    name: "stock",
                    type: "number",
                    placeholder: "0",
                  },
                  {
                    label: "Thương hiệu",
                    name: "brand",
                    type: "text",
                    placeholder: "Nhập thương hiệu",
                  },
                  {
                    label: "SKU",
                    name: "sku",
                    type: "text",
                    placeholder: "Nhập SKU",
                  },
                  {
                    label: "Trọng lượng",
                    name: "weight",
                    type: "number",
                    placeholder: "0",
                  },
                  {
                    label: "Số lượng tối thiểu",
                    name: "minimumOrderQuantity",
                    type: "number",
                    placeholder: "1",
                  },
                ].map((field) => (
                  <div className="space-y-2" key={field.name}>
                    <label className="text-xl pl-3 font-medium text-gray-700">
                      {field.label}
                    </label>
                    <input
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      name={field.name}
                      type={field.type}
                      value={formData[field.name] ?? ""}
                      placeholder={field.placeholder}
                      onChange={handleChange}
                    />
                    {errors[field.name] && (
                      <p className="text-red-500 text-sm">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xl pl-3 font-medium text-gray-700">
                  Tags (phân cách bằng dấu phẩy)
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  name="tags"
                  value={formData.tags}
                  placeholder="tag1, tag2, tag3"
                  onChange={handleChange}
                />
                {errors["tags"] && (
                  <p className="text-red-500 text-sm">{errors["tags"]}</p>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xl pl-3 font-medium text-gray-700">
                  URL Hình ảnh
                </label>
                <input
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  name="thumbnail"
                  value={formData.thumbnail}
                  placeholder="https://example.com/image.jpg"
                  onChange={handleChange}
                />
                {errors["thumbnail"] && (
                  <p className="text-red-500 text-sm">{errors["thumbnail"]}</p>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <label className="text-xl pl-3 font-medium text-gray-700">
                  Mô tả
                </label>
                <textarea
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                  name="description"
                  value={formData.description}
                  placeholder="Nhập mô tả sản phẩm"
                  rows="4"
                  onChange={handleChange}
                ></textarea>
                {errors["description"] && (
                  <p className="text-red-500 text-sm">
                    {errors["description"]}
                  </p>
                )}
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
