package com.fshoes.core.client.repository;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface ProductResponse extends IsIdentified {

    String getImage();

    BigDecimal getPrice();


}
