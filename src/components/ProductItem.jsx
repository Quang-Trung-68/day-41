const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="border rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col gap-3 bg-white">
      <img
        src={product.thumbnail}
        className="w-full h-48 object-cover rounded-lg"
      />

      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold">{product.title}</div>
        <div className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </div>

        <div className="text-blue-600 font-semibold text-xl">
          ${product.price}
        </div>

        <div className="flex flex-wrap gap-1 mt-1">
          {product.tags?.map((t, index) => (
            <span
              key={index}
              className="bg-gray-200 px-2 py-0.5 rounded text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="text-sm text-gray-500">
          Brand: <span className="font-medium">{product.brand}</span>
        </div>
        <div className="text-sm text-gray-500">
          SKU: <span className="font-medium">{product.sku}</span>
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button
          onClick={() => onEdit(product)}
          className="flex-1 bg-blue-500 text-white py-1.5 rounded"
        >
          Sửa
        </button>
        <button
          onClick={() => onDelete(product)}
          className="flex-1 bg-red-500 text-white py-1.5 rounded"
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
