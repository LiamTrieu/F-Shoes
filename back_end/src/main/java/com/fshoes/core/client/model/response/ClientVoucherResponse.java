package com.fshoes.core.client.model.response;

import com.fshoes.entity.base.IsIdentified;

import java.math.BigDecimal;

public interface ClientVoucherResponse extends IsIdentified {
    Integer getStt();

    String getCode();

    String getName();

    BigDecimal getValue();

    BigDecimal getMaximumValue();

    Integer getType();

    BigDecimal getMinimumAmount();

    Integer getQuantity();

    Long getStartDate();

    Long getEndDate();

    Integer getStatus();
}
