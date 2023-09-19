package com.fshoes.core.admin.voucher.model.request;

import com.fshoes.entity.CustomerVoucher;
import com.fshoes.entity.Voucher;
import com.fshoes.util.DateUtil;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.text.ParseException;
import java.util.List;

@Getter
@Setter
public class AdVoucherRequest {
    private String code;

    private String name;

    private BigDecimal value;

    private BigDecimal maximumValue;

    private Integer type;

    private BigDecimal minimumAmount;

    private Integer quantity;

    private String startDate;

    private String endDate;

    private Integer status;

    private List<String> listIdCustomer;

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
        voucher.setStatus(this.getStatus());
        return voucher;
    }
}
