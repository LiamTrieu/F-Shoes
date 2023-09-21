package com.fshoes.core.admin.sanpham.service;

import com.fshoes.entity.Brand;
import com.fshoes.infrastructure.constant.Status;

import java.util.List;

public interface BrandService {
    List<Brand> findAll();

    List<Brand> getListBrand();
}
