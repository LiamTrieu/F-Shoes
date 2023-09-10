package com.fshoes.core.admin.sanpham.service.impl;

import com.fshoes.core.admin.sanpham.model.request.BrandRequest;
import com.fshoes.core.admin.sanpham.model.respone.BrandResponse;
import com.fshoes.core.admin.sanpham.repository.SpBrandRepository;
import com.fshoes.core.admin.sanpham.service.BrandService;
import com.fshoes.core.common.PageableRequest;
import com.fshoes.entity.Brand;
import com.fshoes.infrastructure.cloudinary.CloudinaryImage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BrandServiceImpl implements BrandService {

    @Autowired
    private SpBrandRepository brandRepository;

    @Autowired
    CloudinaryImage cloudinaryImage;

    @Override
    public List<BrandResponse> getAll() {
        return brandRepository.getAll();
    }

    @Override
    public BrandResponse getById(int id) {
        return brandRepository.getById(id).orElse(null);
    }

    @Override
    public Page<BrandResponse> getPage(PageableRequest pageReq, String textSearch) {
        Sort sort = Sort.by("id");
        Pageable pageable = PageRequest.of(pageReq.getPage() - 1, pageReq.getSize(), sort);
        return brandRepository.getPageBrand(pageable, textSearch);
    }


    @Override
    public Brand addBrand(BrandRequest brandReq) {
        try {
            Brand brand = brandReq.tranBrand(new Brand());
            return brandRepository.save(brand);
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Brand updateBrand(BrandRequest brandReq, int id) {
        try {
            Brand brand = brandRepository.findById(id).orElseThrow();
            return brandRepository.save(brandReq.tranBrand(brand));
        } catch (Exception e) {
            return null;
        }
    }

    @Override
    public Brand chageDeleted(int id, boolean isDeleted) {
        try {
            Brand brand = brandRepository.findById(id).orElseThrow();
            brand.setDeleted(isDeleted);
            return brandRepository.save(brand);
        } catch (Exception e) {
            return null;
        }
    }
}
