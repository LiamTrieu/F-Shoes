package com.fshoes.core.admin.thongke.Service;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetListProductInMonthResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetListProductMountRequest;
import com.fshoes.core.common.PageReponse;

import java.util.List;

public interface ThongKeService {

    PageReponse<GetListProductInMonthResponse> getProductInDay(GetListProductMountRequest request);

    PageReponse<GetListProductInMonthResponse> getProductInWeek(GetListProductMountRequest request);

    PageReponse<GetListProductInMonthResponse> getProductInMonth(GetListProductMountRequest request);

    PageReponse<GetListProductInMonthResponse> getProductInYear(GetListProductMountRequest request);

    List<DoanhThuResponse> getDoanhThu();

    List<ThongKeSanPhamResponse> getThongKeDonHang();
}


