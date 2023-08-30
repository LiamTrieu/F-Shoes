import React, { useEffect } from "react";
import sanPhamApi from "../../../api/admin/sanpham/sanPhamApi";

export default function AdProductPage() {
  useEffect(() => {
    sanPhamApi
      .get()
      .then((respone) => {
        return respone.data;
      })
      .catch((err) => {
        console.error(err);
      });
  });
  return <div>Đây là page admin sản phẩm</div>;
}
