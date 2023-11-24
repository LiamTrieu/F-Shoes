package com.fshoes.core.admin.thongke.Service;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuCuRespone;
import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetDataDashBoardResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetDataDashBoardRequest;
import com.fshoes.core.admin.thongke.Modal.request.GetDataDashBoarhByDateRequest;
import com.fshoes.core.common.PageReponse;

import java.text.ParseException;
import java.util.List;

public interface ThongKeService {

    PageReponse<GetDataDashBoardResponse> getProductInDay(GetDataDashBoardRequest request);

    PageReponse<GetDataDashBoardResponse> getProductInWeek(GetDataDashBoardRequest request);

    PageReponse<GetDataDashBoardResponse> getProductInMonth(GetDataDashBoardRequest request);

    PageReponse<GetDataDashBoardResponse> getProductInYear(GetDataDashBoardRequest request);

    List<DoanhThuResponse> getDoanhThu();

    List<DoanhThuCuRespone> getDoanhThuCu();

    List<ThongKeSanPhamResponse> getThongKeDonHang(GetDataDashBoarhByDateRequest request) throws ParseException;

    PageReponse<GetDataDashBoardResponse> getProductTakeOut(GetDataDashBoardRequest request);

    PageReponse<GetDataDashBoardResponse> getProductInCustom(GetDataDashBoarhByDateRequest request) throws ParseException;
}


