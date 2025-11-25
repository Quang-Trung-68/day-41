import { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "../services/product";

import ProductItem from "../components/ProductItem";
import ProductModal from "../components/ProductModal";
import Loading from "../components/Loading";

function Home() {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: products,
    isLoading,
    refetch,
  } = useGetProductsQuery({ page: currentPage });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const totalPages = products?.pagination.last_page || 1;

  const [modal, setModal] = useState({
    open: false,
    mode: "create",
    data: {},
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openEdit = (product) => {
    setModal({ open: true, mode: "edit", data: product });
  };

  const openDelete = (product) => {
    setModal({ open: true, mode: "delete", data: product });
  };

  const openCreate = () => {
    setModal({ open: true, mode: "create", data: {} });
  };

  const closeModal = () => {
    setModal({ ...modal, open: false });
  };

  const handleConfirm = async (formData) => {
    try {
      if (modal.mode === "create") {
        await createProduct({
          ...formData,
          tags: formData.tags.split(","),
        });
        toast.success("Tạo sản phẩm thành công!");
        closeModal();
        await refetch({ force: true });
      } else if (modal.mode === "edit") {
        await updateProduct({
          ...formData,
          tags:
            typeof formData.tags === "string"
              ? formData.tags.split(",")
              : formData.tags,
        });
        toast.success("Cập nhật sản phẩm thành công!");
        closeModal();
        await refetch({ force: true });
      } else {
        await deleteProduct(formData);
        toast.success("Xóa sản phẩm thành công!");
        closeModal();
        await refetch({ force: true });
      }
    } catch (error) {
      closeModal();
      toast.error("Đã xảy ra lỗi khi thực hiện, vui lòng thử lại sau!");
      console.log(error);
    }
  };

  if (isLoading || isCreating || isUpdating || isDeleting) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Quản lý sản phẩm
            </h1>
            <p className="text-gray-600">Quản lý danh sách sản phẩm của bạn</p>
          </div>
          <button
            onClick={openCreate}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <span className="text-xl">+</span>
            Thêm sản phẩm
          </button>
        </div>

        <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
          {products.items.map((product) => (
            <ProductItem
              key={product.id}
              product={{
                ...product,
                tags: !Array.isArray(product.tags)
                  ? JSON.parse(product.tags)
                  : product.tags,
              }}
              onEdit={openEdit}
              onDelete={openDelete}
            />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
            }`}
          >
            ← Trước
          </button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {/* First Page */}
            {currentPage > 3 && (
              <>
                <button
                  onClick={() => handlePageChange(1)}
                  className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium shadow-sm hover:shadow-md transition-all"
                >
                  1
                </button>
                {currentPage > 4 && (
                  <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                    ...
                  </span>
                )}
              </>
            )}

            {/* Page Range */}
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              const showPage =
                page === currentPage ||
                page === currentPage - 1 ||
                page === currentPage + 1 ||
                page === currentPage - 2 ||
                page === currentPage + 2;

              if (!showPage) return null;

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-110"
                      : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            {/* Last Page */}
            {currentPage < totalPages - 2 && (
              <>
                {currentPage < totalPages - 3 && (
                  <span className="w-10 h-10 flex items-center justify-center text-gray-400">
                    ...
                  </span>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="w-10 h-10 rounded-lg bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium shadow-sm hover:shadow-md transition-all"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-sm hover:shadow-md"
            }`}
          >
            Sau →
          </button>
        </div>
      </div>

      <ProductModal
        open={modal.open}
        mode={modal.mode}
        product={modal.data}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
      <ToastContainer />
    </div>
  );
}

export default Home;
