import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    // GET: Get product lists
    getProducts: builder.query({
      query: ({ page = 1 }) => ({
        url: `/products?page=${page}`,
        method: "GET",
      }),
    }),

    // POST: Create new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        data: newProduct,
      }),
    }),

    // PUT: Update a product
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data: product,
      }),
    }),

    // DELETE: Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
