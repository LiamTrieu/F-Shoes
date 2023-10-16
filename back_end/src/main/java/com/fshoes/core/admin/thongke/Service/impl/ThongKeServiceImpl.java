package com.fshoes.core.admin.thongke.Service.impl;

import com.fshoes.core.admin.thongke.Modal.Response.DoanhThuResponse;
import com.fshoes.core.admin.thongke.Modal.Response.GetListProductInMonthResponse;
import com.fshoes.core.admin.thongke.Modal.Response.ThongKeSanPhamResponse;
import com.fshoes.core.admin.thongke.Modal.request.GetListProductMountRequest;
import com.fshoes.core.admin.thongke.Modal.request.ThongKeRequest;
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
    public PageReponse<GetListProductInMonthResponse> getProduct(GetListProductMountRequest request) {
        Pageable pageable = PageRequest.of(request.getPage() - 1, request.getSize());
        return new PageReponse<>(thongKeRepository.getProductInMounth(request, pageable));
    }

    @Override
    public List<DoanhThuResponse> getDoanhThu() {
        return thongKeRepository.getDoanhThu();
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongKeDonHang(ThongKeRequest request) {
        try {
            Long startDateTime = 0L;
            Long endDateTime = 0L;
            if (request.getStartDate().trim().equals("")) {
                startDateTime = null;
            } else {
                startDateTime = request.converDateThongke(request.getStartDate());
            }
            if (request.getEndDate().trim().equals("")) {
                endDateTime = null;
            } else {
                endDateTime = request.converDateThongke(request.getEndDate());
            }
            return thongKeRepository.getThongKeDonhang(startDateTime, endDateTime);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ThongKeSanPhamResponse> getThongTongTien(ThongKeRequest request) throws ParseException {
        try {
            Long startDateTime = 0L;
            Long endDateTime = 0L;
            if (request.getStartDate().trim().equals("")) {
                startDateTime = null;
            } else {
                startDateTime = request.converDateThongke(request.getStartDate());
            }
            if (request.getEndDate().trim().equals("")) {
                endDateTime = null;
            } else {
                endDateTime = request.converDateThongke(request.getEndDate());
            }
            return thongKeRepository.getThongKeTongTien(startDateTime, endDateTime);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
