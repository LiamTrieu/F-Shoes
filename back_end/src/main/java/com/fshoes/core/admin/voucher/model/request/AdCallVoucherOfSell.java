package com.fshoes.core.admin.voucher.model.request;

import com.fshoes.core.common.PageableRequest;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdCallVoucherOfSell extends PageableRequest {
    private String idCustomer;
}
