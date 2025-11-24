import { useState } from "react";
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
  const { data: products, isLoading, refetch } = useGetProductsQuery();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const [modal, setModal] = useState({
    open: false,
    mode: "create",
    data: {},
  });

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
        console.log(formData);
        await createProduct({
          ...formData,
          tags: formData.tags.split(","),
        });
        await refetch({ force: true });
      } else if (modal.mode === "edit") {
        console.log("Updating...");
        console.log(formData);
        await updateProduct({
          ...formData,
          tags:
            typeof formData.tags === "string"
              ? formData.tags.split(",")
              : formData.tags,
        });
        await refetch({ force: true });
      } else {
        console.log(formData);
        await deleteProduct(formData);
        await refetch({ force: true });
      }
    } catch (error) {
      console.log(error);
    }

    closeModal();
  };

  if (isLoading || isCreating || isUpdating) return <Loading />;

  return (
    <>
      <button onClick={openCreate}>Thêm sản phẩm</button>
      <div className="grid grid-cols-3 gap-4 p-4">
        {products.items.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onEdit={openEdit}
            onDelete={openDelete}
          />
        ))}
      </div>

      <ProductModal
        open={modal.open}
        mode={modal.mode}
        product={modal.data}
        onClose={closeModal}
        onConfirm={handleConfirm}
      />
    </>
  );
}

export default Home;
