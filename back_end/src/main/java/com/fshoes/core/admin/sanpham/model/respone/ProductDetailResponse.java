package com.fshoes.core.admin.sanpham.model.respone;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;
import java.util.List;

public interface ProductDetailResponse extends IsIdentified {

    String getStt();

    String getCode();

    String getColorName();

    String getSole();

    String getMaterial();

    String getSize();

    String getColorCode();

    Integer getAmount();

    Integer getWeight();

    BigDecimal getPrice();

    Integer getDeleted();
}
