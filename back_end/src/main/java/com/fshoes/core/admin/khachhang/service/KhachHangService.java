package com.fshoes.core.admin.khachhang.service;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.entity.Customer;
import org.springframework.data.domain.Page;

import java.util.List;

public interface KhachHangService {

     List<Customer> getAll();

    Page<Customer> getPage(int p, int pagesize);

    void save(Customer cu);

    void delete(int id );

    Customer getOne(int id);

    public List<KhachHangRespone> seriolizeList(List<Customer> lst);
}
