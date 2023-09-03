package com.fshoes.core.admin.khuyenmai.service;

import com.fshoes.core.admin.khuyenmai.model.request.ProductPromotionRequest;
import com.fshoes.core.admin.khuyenmai.model.respone.PromotionRespone;
import com.fshoes.entity.Product;
import com.fshoes.entity.ProductPromotion;
import com.fshoes.entity.Promotion;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Optional;

public interface ProductPromotionService {

    List<ProductPromotion> getAll() ;


    Optional<ProductPromotion> getOne(Long id);

    ProductPromotion addProductPromotion(ProductPromotionRequest productPromotionRequest);
    ProductPromotion updateProductPromotion(ProductPromotionRequest productPromotionRequest, Long id);

    Page<ProductPromotion> ProductPromotionPage(Integer page, Integer pageSize);


}
