package com.fshoes.core.admin.khachhang.service.impl;

import com.fshoes.core.admin.khachhang.model.request.AdKhachHangSearch;
import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.khachhang.service.KhachHangService;
import com.fshoes.entity.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    KhachHangRepository khachHangRepository;


    @Override
    public Page<KhachHangRespone> findKhachHang(AdKhachHangSearch adKhachHangSearch) {
        Pageable pageable = PageRequest.of(adKhachHangSearch.getPage() - 1, adKhachHangSearch.getSize());
        return khachHangRepository.FindKhachHang(pageable, adKhachHangSearch);
    }


    @Override
    @Transactional
    public Customer add(KhachHangRequest khachHangRequest) {
        try {
            Customer customer = khachHangRequest.newCustomer(new Customer());
            return khachHangRepository.save(customer);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    @Transactional
    public Boolean update(String id, KhachHangRequest khachHangRequest) throws ParseException {
        Optional<Customer> optionalCustomer = khachHangRepository.findById(id);
        if (optionalCustomer.isPresent()) {
            Customer customer = khachHangRequest.newCustomer(optionalCustomer.get());
            khachHangRepository.save(customer);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public void delete(String id) {
        Customer customer = khachHangRepository.findById(id).orElse(null);
        assert customer != null;
        if (customer.getStatus() == 0) {
            customer.setStatus(1);
        } else {
            customer.setStatus(0);
        }
        khachHangRepository.save(customer);
    }

    @Override
    public Customer getOne(String id) {
        return khachHangRepository.findById(id).orElse(null);
    }


}
