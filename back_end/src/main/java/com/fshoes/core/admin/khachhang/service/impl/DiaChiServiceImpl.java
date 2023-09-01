package com.fshoes.core.admin.khachhang.service.impl;

import com.fshoes.core.admin.khachhang.repository.DiaChiRepository;
import com.fshoes.core.admin.khachhang.service.DiaChiService;
import com.fshoes.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DiaChiServiceImpl implements DiaChiService {
    @Autowired
    DiaChiRepository diaChiRepository;


    @Override
    public List<Address> getAll() {
        return diaChiRepository.findAll();
    }

    @Override
    public Address getOne(int id) {
        return diaChiRepository.findById(id).orElse(null);
    }

    @Override
    public Page<Address> getPage(int p) {
        Pageable pageable = PageRequest.of(p,5);
        return diaChiRepository.findAll(pageable);
    }

    @Override
    public void save(Address address) {
        diaChiRepository.save(address);
    }

    @Override
    public void delete(int id) {
        Address address = diaChiRepository.findById(id).orElse(null);
        address.setCustomer(null);
        diaChiRepository.delete(address);
    }
}
