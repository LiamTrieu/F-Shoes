package com.fshoes.core.admin.voucher.model.request;

import com.fshoes.entity.CustomerVoucher;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdCustomerVoucherRequest {
    private String idCustomer;
    private String idVoucher;
    private String status = "1";

    public CustomerVoucher newCustomerVoucher(CustomerVoucher customerVoucher) {
        customerVoucher.getCustomer().setId(Integer.valueOf(idCustomer));
        customerVoucher.getVoucher().setId(Integer.valueOf(idVoucher));
        customerVoucher.setStatus(Integer.valueOf(status));
        return customerVoucher;
    }
}
