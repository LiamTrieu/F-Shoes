package com.fshoes.core.admin.sell.model.response;

import com.fshoes.entity.base.IsIdentified;

public interface GetProductDetailBillSellResponse extends IsIdentified {

    String getIdBillDetail();

    String getNameProduct();

    String getPrice();

    String getSize();

    String getQuantity();

    String getImage();

    String getPromotion();

    String getValue();


}
