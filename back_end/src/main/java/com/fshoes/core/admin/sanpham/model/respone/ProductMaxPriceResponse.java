package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface ProductMaxPriceResponse extends IsIdentified {
    String getName();

    BigDecimal getPrice();
    String getNameProduct();
    String getNameBrand();
    String getNameCategory();
    String getIdCategory();
    String getIdBrand();
    String getDescription();
}
