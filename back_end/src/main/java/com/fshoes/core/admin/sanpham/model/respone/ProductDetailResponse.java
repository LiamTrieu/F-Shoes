package com.fshoes.core.admin.sanpham.model.respone;

import java.math.BigDecimal;

public interface ProductDetailResponse {
    Integer getId();

    String getCode();

    String getProduct();

    String getColor();

    String getBrand();

    String getSole();

    String getMaterial();

    String getCategory();

    String getSize();

    String getImage();

    Integer getAmount();

    BigDecimal getPrice();

    Boolean getDeleted();
}
