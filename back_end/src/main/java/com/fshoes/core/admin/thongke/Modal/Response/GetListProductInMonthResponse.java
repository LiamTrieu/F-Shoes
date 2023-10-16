package com.fshoes.core.admin.thongke.Modal.Response;

import com.fshoes.entity.base.IsIdentified;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;


public interface GetListProductInMonthResponse extends IsIdentified {

    BigDecimal getPrice();

    String getNameProduct();

    Integer getQuantity();

    String getImage();

    String getSize();

}
