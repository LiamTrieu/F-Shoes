package com.fshoes.core.client.model.request;

import com.fshoes.entity.Bill;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
public class ClientCheckoutRequest {
    private String fullName;
    private String email;
    private String phone;
    private String tinh;
    private String huyen;
    private String xa;
    private String address;
    private String note;
    private String typePayment;
    private String shipMoney;
    private String idVoucher;
    private String moneyReduced;
    private String totalMoney;
    private Long duKien;
    private Integer status;
    private List<ClientBillDetaillRequest> billDetail;
}
