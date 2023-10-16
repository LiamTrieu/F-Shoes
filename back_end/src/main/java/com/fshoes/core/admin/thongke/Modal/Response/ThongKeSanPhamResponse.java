package com.fshoes.core.admin.thongke.Modal.Response;

import org.springframework.beans.factory.annotation.Value;

public interface ThongKeSanPhamResponse {
    @Value("#{target.ngay}")
    Long getNgay();

    @Value("#{target.giaTri}")
    Float getGiaTri();
}
