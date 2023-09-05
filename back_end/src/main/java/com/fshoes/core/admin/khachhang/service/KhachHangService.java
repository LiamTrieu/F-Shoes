package com.fshoes.core.admin.khachhang.service;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.entity.Customer;
import org.springframework.data.domain.Page;

import java.util.List;

public interface KhachHangService {

     List<Customer> getAll();

    Page<KhachHangRespone> getPage(int p);

    Page<KhachHangRespone> findKhachHangByName(int p, String textSearch );

    Customer save(Customer cu);

    void delete(int id );

    Customer getOne(int id);

}
