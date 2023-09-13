package com.fshoes.core.admin.hoadon.model.respone;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface HDBillResponse extends IsIdentified {

    String getCode();

    String getFullName();

    String getPhoneNumber();

    String getAddress();

    Long getTotalMoney();

    BigDecimal getMoneyReduced();

    BigDecimal getMoneyAfter();

    BigDecimal getMoneyShip();

    Integer getType();

    String getNote();

    Long getCreatedAt();

    String getCreatedBy();

    Long getTotalProduct();

    Integer getStatus();

}
