package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.repository.AdBrandRepository;
import com.fshoes.core.admin.sanpham.service.BrandService;
import com.fshoes.entity.Brand;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private AdBrandRepository brandRepository;
  
    public List<Brand> findAll() {
        return brandRepository.findAll();
    }
}
