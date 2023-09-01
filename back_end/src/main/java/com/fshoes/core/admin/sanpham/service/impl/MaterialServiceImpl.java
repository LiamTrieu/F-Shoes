package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.MaterialRequest;
import com.fshoes.core.admin.sanpham.model.respone.MaterialResponse;
import com.fshoes.core.admin.sanpham.repository.SpMaterialRepository;
import com.fshoes.core.admin.sanpham.service.MaterialService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialServiceImpl implements MaterialService {

    @Autowired
    private SpMaterialRepository materialRepository;

    @Override
    public List<Material> getAll() {
        return materialRepository.findAll();
    }

    @Override
    public MaterialResponse getById(int id) {
        return materialRepository.getById(id).orElse(null);
    }

    @Override
    public Page<MaterialResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return materialRepository.getPageMaterial(pageable, textSearch);
    }


    @Override
    public Material addMaterial(MaterialRequest materialReq) {
        try {
            Material material = materialReq.tranMaterial(new Material());
            material.setDeleted(false);
            return materialRepository.save(material);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Material updateMaterial(MaterialRequest materialReq, int id) {
        try {
            Material material = materialRepository.findById(id).orElseThrow();
            return materialRepository.save(materialReq.tranMaterial(material));
        } catch (Exception e) {
            return null;
        }
    }
}
