package com.fshoes.core.admin.khachhang.service.impl;

import com.fshoes.core.admin.khachhang.model.request.DiaChiRequest;
import com.fshoes.core.admin.khachhang.model.request.KhachHangRequest;
import com.fshoes.core.admin.khachhang.repository.DiaChiRepository;
import com.fshoes.core.admin.khachhang.service.DiaChiService;
import com.fshoes.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

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
    public Address add(DiaChiRequest diaChiRequest) {
        try {
            Address address = diaChiRequest.newAddress(new Address());
            return diaChiRepository.save(address);
        }catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Boolean update(Integer id, DiaChiRequest diaChiRequest) {
        Optional<Address> addressOptional = diaChiRepository.findById(id);
        if(addressOptional.isPresent()){
            Address address = diaChiRequest.newAddress(addressOptional.get());
            diaChiRepository.save(address);
            return true;
        }else {
            return false;
        }
    }

    @Override
    public void delete(int id) {
        Address address = diaChiRepository.findById(id).orElse(null);
        address.setCustomer(null);
        diaChiRepository.delete(address);
    }

}
