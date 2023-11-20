package com.fshoes.core.client.model.response;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface ClientCartResponse extends IsIdentified {
    String getName();

    String getPromotion();

    BigDecimal getValue();

    Integer getStatusPromotion();

    BigDecimal getGia();

    String getWeight();

    String getImage();

    Integer getSoLuong();

    String getSize();


}
