package com.fshoes.core.admin.returns.model.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReturnRequest {
    private String idReturn;
    private String idBill;
    private String returnMoney;
    private String moneyPayment;
    private Integer type;
    private String codePayment;
    private String fee;
    List<ReturnDetailRequest> listDetail;
}
