package com.fshoes.core.admin.hoadon.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HDConfirmPaymentRequest {

    private String idStaff;

    private String note;

    private Integer type;

    private Integer status;

    private Integer paymentMethod;

}
