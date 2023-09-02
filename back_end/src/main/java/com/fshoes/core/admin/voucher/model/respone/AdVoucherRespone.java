package com.fshoes.core.admin.voucher.model.respone;

import java.math.BigDecimal;

public interface AdVoucherRespone {
    Integer getId();

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
