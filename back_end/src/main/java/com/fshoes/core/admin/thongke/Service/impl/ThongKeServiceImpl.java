package com.fshoes.core.admin.thongke.Service.impl;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetListProductInMonthResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetListProductMountRequest;
import com.fshoes.core.admin.thongke.Repository.adminThongKeRepository;
import com.fshoes.core.admin.thongke.Service.ThongKeService;
import com.fshoes.core.common.PageReponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThongKeServiceImpl implements ThongKeService {
    @Autowired
    private adminThongKeRepository thongKeRepository;

    @Override
    public PageReponse<GetListProductInMonthResponse> getProductInDay(GetListProductMountRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInDay(request, pageable));
    }

    @Override
    public PageReponse<GetListProductInMonthResponse> getProductInWeek(GetListProductMountRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInWeek(request, pageable));
    }

    @Override
    public PageReponse<GetListProductInMonthResponse> getProductInMonth(GetListProductMountRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInMonth(request, pageable));
    }

    @Override
    public PageReponse<GetListProductInMonthResponse> getProductInYear(GetListProductMountRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInYear(request, pageable));
    }

    @Override
    public List<DoanhThuResponse> getDoanhThu() {
        return thongKeRepository.getDoanhThu();
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHang() {
        return thongKeRepository.getThongKeDonhang();
    }
}
