package com.fshoes.core.admin.khachhang.service.impl;

import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.khachhang.service.KhachHangService;
import com.fshoes.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    KhachHangRepository khachHangRepository;


    @Override
    public List<Customer> getAll() {
        return khachHangRepository.findAll();
    }

    @Override
    public Page<Customer> getPage(int p, int pagesize) {
        Pageable pageable = PageRequest.of(p, pagesize);
        return khachHangRepository.findAll(pageable);
    }

    @Override
    public void save(Customer cu) {
        khachHangRepository.save(cu);
    }

    @Override
    public void delete(int id) {
        Customer cu = khachHangRepository.findById(id).orElse(null);
        cu.setStatus(0);
        khachHangRepository.save(cu);
    }

    @Override
    public Customer getOne(int id) {
        return khachHangRepository.findById(id).orElse(null);
    }

    @Override
    public List<KhachHangRespone> seriolizeList(List<Customer> lst) {
        List iteams = new ArrayList();
        for (Customer cu : lst) iteams.add(new KhachHangRespone(cu));
        return iteams;
    }


}
