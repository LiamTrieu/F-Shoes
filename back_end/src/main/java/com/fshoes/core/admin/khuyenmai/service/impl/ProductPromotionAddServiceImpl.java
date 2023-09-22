package com.fshoes.core.admin.khuyenmai.service.impl;

import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.respone.AddProductPromotionResponse;
import com.fshoes.core.admin.khuyenmai.repository.ProductPromotionAddRepository;
import com.fshoes.core.admin.khuyenmai.service.ProductPromotionAddService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductPromotionAddServiceImpl implements ProductPromotionAddService {

    @Autowired
    private ProductPromotionAddRepository promotionAddRepository;

    @Override
    public List<AddProductPromotionResponse> getAll( ) {
        return promotionAddRepository.getAllProduct();
    }
}
