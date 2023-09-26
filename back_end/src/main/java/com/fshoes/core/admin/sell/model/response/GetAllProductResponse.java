package com.fshoes.core.admin.sell.model.response;

import com.fshoes.entity.base.IsIdentified;

public interface GetAllProductResponse extends IsIdentified {

    String getName();

    Double getPrice();

    Integer getSize();

    String getUrl();

    Integer getAmount();
}
