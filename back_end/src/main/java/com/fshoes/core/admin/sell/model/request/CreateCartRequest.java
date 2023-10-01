package com.fshoes.core.admin.sell.model.request;

import com.fshoes.infrastructure.constant.StatusBill;
import com.fshoes.infrastructure.constant.TypeBill;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;
@Getter
@Setter
public class CreateCartRequest {

   private String productDetailId;
   private String cartId;

   private Integer quantity;

}
