package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface ProductDetailResponse extends IsIdentified {

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
