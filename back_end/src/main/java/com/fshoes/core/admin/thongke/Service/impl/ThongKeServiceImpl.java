package com.fshoes.core.admin.thongke.Service.impl;

import com.fshoes.core.admin.thongke.Modal.Response.*;
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
    public List<DoanhThuCustomRespone> getDoanhThuCustom(GetDataDashBoarhByDateRequest request) throws ParseException {
        Long startDate = request.getStartDate() != null ? request.converDate(request.getStartDate()) : null;
        Long endDate = request.getEndDate() != null ? request.converDate(request.getEndDate()) : null;
        return thongKeRepository.getDoanhThuCustom(startDate, endDate);
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHang(GetDataDashBoarhByDateRequest request) throws ParseException {
        Long startDate = request.getStartDate() != null ? request.converDate(request.getStartDate()) : null;
        Long endDate = request.getEndDate() != null ? request.converDate(request.getEndDate()) : null;
        return thongKeRepository.getThongKeDonhang(startDate, endDate);
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHangTrongNgay() {
        return thongKeRepository.getThongKeDonhangTrongNgay();
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHangTrongTuan() {
        return thongKeRepository.getThongKeDonhangTrongTuan();
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHangTrongThang() {
        return thongKeRepository.getThongKeDonhangTrongThang();
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHangTrongNam() {
        return thongKeRepository.getThongKeDonhangTrongNam();
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductTakeOut(GetDataDashBoardRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductTakeOut(request, pageable));
    }

    @Override
    public PageReponse<GetDataDashBoardResponse> getProductInCustom(GetDataDashBoarhByDateRequest request) throws ParseException {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        Long startDate = request.getStartDate() != null ? request.converDate(request.getStartDate()) : null;
        Long endDate = request.getEndDate() != null ? request.converDate(request.getEndDate()) : null;
        return new PageReponse<>(thongKeRepository.getProductInCustom(startDate, endDate, pageable));
    }
}
