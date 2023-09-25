package com.fshoes.core.admin.khachhang.service;

import com.fshoes.core.admin.khachhang.model.request.AdKhachHangSearch;
import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import java.text.ParseException;
import java.util.List;

public interface KhachHangService {


    Page<KhachHangRespone> findKhachHang(AdKhachHangSearch adKhachHangSearch);

    Customer add(KhachHangRequest khachHangRequest);

    Boolean update(String id, KhachHangRequest khachHangRequest) throws ParseException;

    void delete(String id);

    Customer getOne(String id);


}
