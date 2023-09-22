package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.repository.AdSoleRepository;
import com.fshoes.core.admin.sanpham.service.SoleService;
import com.fshoes.entity.Sole;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SoleServiceImpl implements SoleService {

    @Autowired
    private AdSoleRepository soleRepository;
  
    public List<Sole> findAll() {
        return soleRepository.findAll();
    }

    @Override
    public List<Sole> getListSole() {
        return soleRepository.findAllByDeleted(Status.HOAT_DONG);
    }
}
