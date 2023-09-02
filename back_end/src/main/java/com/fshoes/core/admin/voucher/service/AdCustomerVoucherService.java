package com.fshoes.core.admin.voucher.service;

import com.fshoes.core.admin.voucher.model.request.AdCustomerVoucherRequest;
import com.fshoes.entity.CustomerVoucher;
import org.springframework.data.domain.Page;

import java.util.List;

public interface AdCustomerVoucherService {
    List<CustomerVoucher> getAllCustomerVoucher();

    CustomerVoucher getCustomerVoucherById(Integer id);

    Page<CustomerVoucher> getPageCustomerVoucher(Integer page);

    CustomerVoucher addCustomerVoucher(AdCustomerVoucherRequest adCustomerVoucherRequest);

    Boolean updateCustomerVoucher(Integer id, AdCustomerVoucherRequest adCustomerVoucherRequest);

    Boolean deleteCustomerVoucher(Integer id);
}
