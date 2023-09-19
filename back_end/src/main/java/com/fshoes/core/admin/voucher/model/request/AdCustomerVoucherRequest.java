package com.fshoes.core.admin.voucher.model.request;

import com.fshoes.entity.Customer;
import com.fshoes.entity.CustomerVoucher;
import com.fshoes.entity.Voucher;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdCustomerVoucherRequest {
    private Customer customer;
    private Voucher voucher;

    public CustomerVoucher newCustomerVoucher(CustomerVoucher customerVoucher) {
        customerVoucher.setCustomer(this.getCustomer());
        customerVoucher.setVoucher(this.getVoucher());
        return customerVoucher;
    }
}
