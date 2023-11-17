package com.fshoes.core.client.model.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientBillDetailRequest {
    private String productDetailId;

    private String idBill;

    private Integer quantity;

    private BigDecimal price;

    private Integer status;

}
