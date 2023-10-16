package com.fshoes.core.admin.thongke.Service;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetListProductInMonthResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetListProductMountRequest;
import com.fshoes.core.admin.thongke.Modal.request.ThongKeRequest;
import com.fshoes.core.common.PageReponse;

import java.text.ParseException;
import java.util.List;

public interface ThongKeService {

    PageReponse<GetListProductInMonthResponse> getProduct(GetListProductMountRequest request);

    List<DoanhThuResponse> getDoanhThu();

    List<ThongKeSanPhamResponse> getThongKeDonHang(ThongKeRequest request);

    List<ThongKeSanPhamResponse> getThongTongTien(ThongKeRequest request) throws ParseException;
}


