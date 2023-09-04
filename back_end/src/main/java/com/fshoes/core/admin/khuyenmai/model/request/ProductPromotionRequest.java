package com.fshoes.core.admin.khuyenmai.model.request;

import com.fshoes.entity.ProductPromotion;


import java.math.BigDecimal;

public class ProductPromotionRequest {

    private String pricePromotion;


    private String idProductDetail;


    private String idPromotion;

    public ProductPromotion newProductProduct(ProductPromotion productPromotion){
        productPromotion.getPromotion().setId(Integer.valueOf(idPromotion));
        productPromotion.getProductDetail().setId(Long.valueOf(idProductDetail));

        productPromotion.setPricePromotion(BigDecimal.valueOf(Long.parseLong(pricePromotion)));
        return productPromotion;
    }
}