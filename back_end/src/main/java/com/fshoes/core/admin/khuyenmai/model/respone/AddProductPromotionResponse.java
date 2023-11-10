package com.fshoes.core.admin.khuyenmai.model.respone;

import com.fshoes.entity.base.IsIdentified;

public interface AddProductPromotionResponse extends IsIdentified {

    String getProductDetail();

    String getName();

    String getCategory();

    String getBrand();

    String getMaterial();

    String getColor();

    String getSole();

    String getUrl();

    String getSize();
}
