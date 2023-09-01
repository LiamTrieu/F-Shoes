package com.fshoes.core.admin.khachhang.service;

import com.fshoes.entity.Customer;
import org.springframework.data.domain.Page;

import java.util.List;

public interface KhachHangService {

     List<Customer> getAll();

    Page<Customer> getPage(int p);

    void save(Customer cu);

    void delete(int id );

    Customer getOne(int id);
}
