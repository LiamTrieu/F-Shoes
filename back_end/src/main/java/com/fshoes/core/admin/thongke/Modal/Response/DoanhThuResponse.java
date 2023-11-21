package com.fshoes.core.admin.thongke.Modal.Response;

import java.math.BigDecimal;

public interface DoanhThuResponse {
    String getNgayHienTai();

    BigDecimal getDoanhSoNgay();

    Integer getSoDonHangNgay();

    Integer getSoLuongSanPhamNgay();

    String getTuanNay();

    BigDecimal getDoanhSoTuanNay();

    Integer getSoDonHangTuanNay();

    Integer getSoLuongSanPhamTuanNay();

    String getThangNay();

    BigDecimal getDoanhSoThangNay();

    Integer getSoDonHangThangNay();

    Integer getSoLuongSanPhamThangNay();

    String getNamNay();

    BigDecimal getDoanhSoNamNay();

    Integer getSoDonHangNamNay();

    Integer getSoLuongSanPhamNamNay();
}
