package com.fshoes.core.admin.hoadon.model.respone;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
public class HDBillResponse {
    private String code;
    private String fullName;
    private String phoneNumber;
    private String address;
    private BigDecimal totalMoney;
    private BigDecimal moneyReduced;
    private BigDecimal moneyAfter;
    private BigDecimal moneyShip;
    private Boolean type;
    private String note;
    private Long createdAt;
    private String createdBy;

    public HDBillResponse(String code, String fullName, String phoneNumber, String address, BigDecimal totalMoney, BigDecimal moneyReduced, BigDecimal moneyAfter, BigDecimal moneyShip, Boolean type, String note, Long createdAt, String createdBy) {
        this.code = code;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.totalMoney = totalMoney;
        this.moneyReduced = moneyReduced;
        this.moneyAfter = moneyAfter;
        this.moneyShip = moneyShip;
        this.type = type;
        this.note = note;
        this.createdAt = createdAt;
        this.createdBy = createdBy;
    }
}
