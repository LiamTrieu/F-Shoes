package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.repository.AdMaterialRepository;
import com.fshoes.core.admin.sanpham.service.MaterialService;
import com.fshoes.entity.Material;
import com.fshoes.infrastructure.constant.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private AdMaterialRepository materialRepository;
  
    public List<Material> findAll() {
        return materialRepository.findAll();
    }

    @Override
    public List<Material> getListMaterial() {
        return materialRepository.findAllByDeleted(Status.HOAT_DONG);
    }
}
