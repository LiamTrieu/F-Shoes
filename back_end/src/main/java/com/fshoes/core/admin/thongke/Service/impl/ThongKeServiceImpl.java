package com.fshoes.core.admin.thongke.Service.impl;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuCuRespone;
import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetDataDashBoardResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetDataDashBoardRequest;
import com.fshoes.core.admin.thongke.Modal.request.GetDataDashBoarhByDateRequest;
import com.fshoes.core.admin.thongke.Repository.adminThongKeRepository;
import com.fshoes.core.admin.thongke.Service.ThongKeService;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;

@Service
public class ThongKeServiceImpl implements ThongKeService {
    @Autowired
    private adminThongKeRepository thongKeRepository;

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductInDay(GetDataDashBoardRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInDay(request, pageable));
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductInWeek(GetDataDashBoardRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInWeek(request, pageable));
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductInMonth(GetDataDashBoardRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInMonth(request, pageable));
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductInYear(GetDataDashBoardRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInYear(request, pageable));
    }

    @Override
    public List<DoanhThuResponse> getDoanhThu() {
        return thongKeRepository.getDoanhThu();
    }

    @Override
    public List<DoanhThuCuRespone> getDoanhThuCu() {
        return thongKeRepository.getDoanhThuCu();
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHang() {
        return thongKeRepository.getThongKeDonhang();
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductTakeOut(GetDataDashBoardRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductTakeOut(request, pageable));
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductInCustom(GetDataDashBoarhByDateRequest request) throws ParseException {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        Long startDate = request.converDate(request.getStartDate());
        Long endDate = request.converDate(request.getEndDate());
        return new PageReponse<>(thongKeRepository.getProductInCustom(startDate, endDate, pageable));
    }
}
