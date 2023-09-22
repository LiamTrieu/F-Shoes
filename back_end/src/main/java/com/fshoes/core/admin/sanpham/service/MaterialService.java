package com.fshoes.core.admin.sanpham.service;

import com.fshoes.entity.Material;

import java.util.List;

public interface MaterialService {
    List<Material> findAll();

    List<Material> getListMaterial();
}
