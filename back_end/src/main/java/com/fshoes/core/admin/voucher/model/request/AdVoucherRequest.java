package com.fshoes.core.admin.voucher.model.request;

import com.fshoes.entity.Voucher;
import com.fshoes.infrastructure.constant.EntityProperties;
import com.fshoes.util.DateUtil;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.text.ParseException;

@Getter
@Setter
public class AdVoucherRequest {
    @Column(length = EntityProperties.LENGTH_CODE)
    private String code;

    @Column(length = EntityProperties.LENGTH_NAME)
    private String name;

    private BigDecimal value;

    private BigDecimal maximumValue;

    private Boolean type;

    private BigDecimal minimumAmount;

    private Integer quantity;

    private String startDate;

    private String endDate;

    public Voucher newVoucher(Voucher voucher) throws ParseException {
        voucher.setCode(this.getCode());
        voucher.setName(this.getName());
        voucher.setValue(this.getValue());
        voucher.setMaximumValue(this.getMaximumValue());
        voucher.setType(this.getType());
        voucher.setMinimumAmount(this.getMinimumAmount());
        voucher.setQuantity(this.getQuantity());
        voucher.setStartDate(DateUtil.parseDateTimeLong(this.getStartDate()));
        voucher.setEndDate(DateUtil.parseDateTimeLong(this.getEndDate()));
        return voucher;
    }
}
