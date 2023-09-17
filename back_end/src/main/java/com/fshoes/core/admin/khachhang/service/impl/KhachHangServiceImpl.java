package com.fshoes.core.admin.khachhang.service.impl;

import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.model.respone.KhachHangRespone;
import com.fshoes.core.admin.khachhang.repository.KhachHangRepository;
import com.fshoes.core.admin.khachhang.service.KhachHangService;
import com.fshoes.entity.Customer;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.List;
import java.util.Optional;

@Service
public class KhachHangServiceImpl implements KhachHangService {
    @Autowired
    KhachHangRepository khachHangRepository;


    @Override
    public List<Customer> getAll() {
        return khachHangRepository.findAll();
    }

    @Override
    public Page<KhachHangRespone> getPage(int p) {
        Pageable pageable = PageRequest.of(p, 5);
        return khachHangRepository.getAllKhachHang(pageable);
    }

    @Override
    public Page<KhachHangRespone> findKhachHangByName(int p, String textSearch) {
        Pageable pageable = PageRequest.of(p, 5);
        return khachHangRepository.FindKhachHangByName(pageable,textSearch);
    }

    @Override
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
    public Boolean update(String id, KhachHangRequest khachHangRequest) throws ParseException {
        Optional<Customer> optionalCustomer = khachHangRepository.findById(id);
        if (optionalCustomer.isPresent()){
            Customer customer = khachHangRequest.newCustomer(optionalCustomer.get());
            khachHangRepository.save(customer);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public void delete(String id) {
        Customer cu = khachHangRepository.findById(id).orElse(null);
        cu.setStatus(cu.getStatus());
        khachHangRepository.save(cu);
    }

    @Override
    public Customer getOne(String id) {
        return khachHangRepository.findById(id).orElse(null);
    }

}
