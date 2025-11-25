// ProductItem Component
const ProductItem = ({ product, onEdit, onDelete }) => {
  return (
    <div className="group flex flex-col h-full border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
      {/* Image Section - Fixed Height */}
      <div className="relative overflow-hidden flex-shrink-0">
        <img
          src={product.thumbnail}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          alt={product.title}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
          ${product.price}
        </div>
      </div>

      {/* Content Section - Flexible */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title & Description - Fixed Height */}
        <div className="flex flex-col gap-2 mb-3">
          <h3 className="text-lg cursor-pointer font-bold text-gray-900 line-clamp-2 min-h-[3.5rem]">
            {product.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed min-h-[2.5rem]">
            {product.description}
          </p>
        </div>

        {/* Tags Section - Fixed Min Height */}
        <div className="min-h-[2rem] mb-3">
          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {product.tags.slice(0, 3).map((t, index) => (
                <span
                  key={index}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-medium"
                >
                  {t}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="text-xs text-gray-500 px-2 py-0.5">
                  +{product.tags.length - 3}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Push content to bottom */}
        <div className="mt-auto">
          {/* Brand & SKU Info */}
          <div className="flex flex-col gap-1.5 py-3 border-t border-gray-100 mb-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Brand:</span>
              <span className="font-semibold text-gray-900 truncate ml-2">
                {product.brand}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">SKU:</span>
              <span className="font-medium text-gray-700 truncate ml-2">
                {product.sku}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(product)}
              className="flex-1 cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Sửa
            </button>
            <button
              onClick={() => onDelete(product)}
              className="flex-1 cursor-pointer bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-2.5 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductItem;
