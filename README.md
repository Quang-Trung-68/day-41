# Product Management System

Ứng dụng quản lý sản phẩm với React, Redux Toolkit, và RTK Query.

## Tính năng

- ✨ CRUD sản phẩm (Thêm, Sửa, Xóa, Xem)
- 📄 Phân trang
- ✅ Validation với Zod
- 🎨 UI responsive với Tailwind CSS

## Công nghệ

- React 19, Redux Toolkit, RTK Query
- Tailwind CSS 4, Zod, Axios, React Toastify
- Vite

## Cài đặt

```bash
# Clone và cài đặt
git clone https://github.com/Quang-Trung-68/day-41.git
npm install

# Chạy development
npm run dev

# Build production
npm run build

```

## Deploy Vercel

[Xem demo](https://day-41-two.vercel.app/)

## API Endpoint

Base URL: `https://api01.f8team.dev/api`

- `GET /products?page={page}` - Danh sách sản phẩm
- `POST /products` - Tạo mới
- `PUT /products/{id}` - Cập nhật
- `DELETE /products/{id}` - Xóa

## Cấu trúc

```
src/
├── components/      # ProductItem, ProductModal, Loading
├── pages/          # Home
├── services/       # API (RTK Query)
├── features/       # Redux slices
└── utils/          # Axios config
```
