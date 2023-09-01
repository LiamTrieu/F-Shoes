package com.fshoes.core.admin.voucher.model.request;

import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.EntityProperties;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class VoucherRequest {
    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private BigDecimal value;

    private BigDecimal maximumValue;

    private Boolean type;

    private BigDecimal minimumAmount;

    private Integer quantity;

    private Long startDate;

    private Long endDate;

    private Integer status;

    public Voucher newVoucher(Voucher voucher) {
        voucher.setCode(this.getCode());
        voucher.setName(this.getName());
        voucher.setValue(this.getValue());
        voucher.setMaximumValue(this.getMaximumValue());
        voucher.setType(this.getType());
        voucher.setMinimumAmount(this.getMinimumAmount());
        voucher.setQuantity(this.getQuantity());
        voucher.setStartDate(this.getStartDate());
        voucher.setEndDate(this.getEndDate());
        voucher.setStatus(this.getStatus());
        return voucher;
    }
}
