package com.fshoes.core.admin.voucher.model.respone;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface AdVoucherRespone extends IsIdentified {

    String getCode();

    String getName();

    BigDecimal getValue();

    BigDecimal getMaximumValue();

    Boolean getType();

    BigDecimal getMinimumAmount();

    Integer getQuantity();

    Long getStartDate();

    Long getEndDate();

    Integer getStatus();

}
